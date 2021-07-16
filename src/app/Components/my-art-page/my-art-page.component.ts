import { Component, NgZone, OnInit } from '@angular/core';
import { NFTLabStoreMarketplaceVariant } from 'erc721nftlab/typechain/NFTLabStoreMarketplaceVariant';
import { MarketplaceService } from '../../Services/MarketplaceService/marketplace.service';
import { range } from 'rxjs';
import { WalletService } from '../../Services/WalletService/wallet.service';
import { WalletProviderService } from '../../Services/WalletProviderService/wallet-provider.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-art-page',
  templateUrl: './my-art-page.component.html',
  styleUrls: ['./my-art-page.component.css'],
})
export class MyArtPageComponent implements OnInit {
  total: number = 0;
  private marketStore: NFTLabStoreMarketplaceVariant | undefined;
  arts: { cid: string; metadataCid: string }[] = [];
  state: string = 'Loading';
  loading: boolean = true;
  constructor(
    private market: MarketplaceService,
    private wallet: WalletService,
    private providerService: WalletProviderService,
    private router: Router,
    private ngZone: NgZone
  ) {
    providerService.wallet.on('accountsChanged', () => {
      const url = router.url;
      router
        .navigate(['/home'], { skipLocationChange: true })
        .then(() => ngZone.run(() => router.navigate([url])));
    });
  }

  async ngOnInit() {
    this.arts = [];
    this.total = 0;
    const store = await this.market.getMarketplaceStore();
    this.marketStore = store;
    const accounts = await this.wallet.requestAccounts();
    if (accounts && accounts.length >= 0) {
      const supply = await store.balanceOf(accounts[0]);
      this.total = supply.toNumber();
      range(0, supply.toNumber()).forEach((next) => {
        store.tokenOfOwnerByIndex(accounts[0], next).then((token) => {
          store
            .getNFTById(token)
            .then((nft) => {
              this.arts.push(nft);
              this.loading = false;
            })
            .catch((error) => {
              console.error(error);
            });
        });
      });
      if (this.total == 0) {
        this.loading = false;
        this.state = 'You currently have no art pieces on this contract';
      }
    }
  }

  hasPieces() {
    return this.arts.length > 0;
  }
}
