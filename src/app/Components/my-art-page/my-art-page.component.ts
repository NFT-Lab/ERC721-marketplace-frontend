import { Component, OnInit } from '@angular/core';
import { NFTLabStoreMarketplaceVariant } from 'erc721nftlab/typechain/NFTLabStoreMarketplaceVariant';
import { MarketplaceService } from '../../Services/MarketplaceService/marketplace.service';
import { range } from 'rxjs';
import { WalletService } from '../../Services/WalletService/wallet.service';
import { WalletProviderService } from '../../Services/WalletProviderService/wallet-provider.service';

@Component({
  selector: 'app-my-art-page',
  templateUrl: './my-art-page.component.html',
  styleUrls: ['./my-art-page.component.css'],
})
export class MyArtPageComponent implements OnInit {
  total: number = 0;
  private marketStore: NFTLabStoreMarketplaceVariant | undefined;
  arts: { cid: string; metadataCid: string }[] = [];
  constructor(
    private market: MarketplaceService,
    private wallet: WalletService,
    private walletProvider: WalletProviderService
  ) {
    walletProvider.wallet.on('accountsChanged', this.ngOnInit);
  }

  async ngOnInit(): Promise<void> {
    this.arts = [];
    this.market.getMarketplaceStore().then((store) => {
      this.marketStore = store;
      this.wallet.requestAccounts().then((accounts) => {
        if (accounts)
          if (accounts.length >= 0) {
            store.balanceOf(accounts[0]).then((supply) => {
              this.total = supply.toNumber();
              range(0, supply.toNumber()).forEach((next) => {
                store.tokenOfOwnerByIndex(accounts[0], next).then((token) => {
                  store
                    .getNFTById(token)
                    .then((nft) => {
                      this.arts.push(nft);
                    })
                    .catch((error) => {
                      console.error(error);
                    });
                });
              });
            });
          }
      });
    });
  }
}
