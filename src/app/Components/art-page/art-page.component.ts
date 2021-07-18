import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MarketplaceService } from '../../Services/MarketplaceService/marketplace.service';
import { NFTLabStoreMarketplaceVariant } from 'erc721nftlab/typechain/NFTLabStoreMarketplaceVariant';
import { range } from 'rxjs';
import { WalletProviderService } from '../../Services/WalletProviderService/wallet-provider.service';

@Component({
  selector: 'app-art-page',
  templateUrl: './art-page.component.html',
  styleUrls: ['./art-page.component.css'],
})
export class ArtPageComponent implements OnInit {
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

  constructor(private market: MarketplaceService) {}

  async ngOnInit(): Promise<void> {
    this.market.getMarketplaceStore().then((store) => {
      this.marketStore = store;
      store.totalSupply().then((supply) => {
        this.total = supply.toNumber();
        if (this.total == 0) {
          this.loading = false;
          this.state = 'There are currently no art pieces on this contract';
        }
        range(0, supply.toNumber()).forEach((next) => {
          store.tokenByIndex(next).then((token) => {
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
      });
    });
  }
}
