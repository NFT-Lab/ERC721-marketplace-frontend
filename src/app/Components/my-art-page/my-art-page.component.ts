import { Component, NgZone, OnInit } from '@angular/core';
import { NFTLabStoreMarketplaceVariant } from 'erc721nftlab/typechain/NFTLabStoreMarketplaceVariant';
import { MarketplaceService } from '../../Services/MarketplaceService/marketplace.service';
import { range } from 'rxjs';
import { WalletProviderService } from '../../Services/WalletProviderService/wallet-provider.service';
import { Router } from '@angular/router';
import { BigNumber, ethers } from 'ethers';

@Component({
  selector: 'app-my-art-page',
  templateUrl: './my-art-page.component.html',
  styleUrls: ['./my-art-page.component.css'],
})
export class MyArtPageComponent implements OnInit {
  total: number = 0;
  private marketStore: NFTLabStoreMarketplaceVariant | undefined;
  arts: {
    cid: string;
    metadataCid: string;
    image: boolean;
    music: boolean;
    video: boolean;
  }[] = [];
  state: string = 'Loading';
  loading: boolean = true;
  constructor(
    private market: MarketplaceService,
    private providerService: WalletProviderService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  async ngOnInit() {
    this.arts = [];
    this.total = 0;
    const store = await this.market.getMarketplaceStore();
    this.marketStore = store;
    const account = await (await this.providerService.signer()).getAddress();
    if (account) {
      const supply = await store.balanceOf(account);
      this.total = supply.toNumber();
      range(0, supply.toNumber()).forEach((next) => {
        store.tokenOfOwnerByIndex(account, next).then((token) => {
          store.getNFTById(token).then((nft) => {
            this.arts.push(nft);
            this.loading = false;
          });
        });
      });
      if (this.total == 0) {
        this.loading = false;
        this.state = 'You currently have no art pieces on this contract';
      }
    }
    const market = await this.market.getEthMarketplace();
    const trades = await market.getTradesOfAddress(account);
    trades.forEach((tradeId: BigNumber) => {
      market.getTrade(tradeId).then((trade) => {
        const status = trade[3];
        if (status == ethers.utils.formatBytes32String('Open')) {
          store.getNFTById(trade[1]).then((nft) => {
            this.arts.push(nft);
            this.loading = false;
          });
        }
      });
    });
  }

  hasPieces() {
    return this.arts.length > 0;
  }
}
