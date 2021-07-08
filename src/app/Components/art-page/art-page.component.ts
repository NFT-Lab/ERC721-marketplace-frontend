import { Component, OnInit } from '@angular/core';
import { MarketplaceService } from '../../Services/MarketplaceService/marketplace.service';
import { NFTLabStoreMarketplaceVariant } from 'erc721nftlab/typechain/NFTLabStoreMarketplaceVariant';

@Component({
  selector: 'app-art-page',
  templateUrl: './art-page.component.html',
  styleUrls: ['./art-page.component.css'],
})
export class ArtPageComponent implements OnInit {
  total: number = 0;
  art: string[] = [];
  private marketStore: NFTLabStoreMarketplaceVariant | undefined;
  constructor(private market: MarketplaceService) {}

  async ngOnInit(): Promise<void> {
    this.marketStore = await this.market.getMarketplaceStore();
    setInterval(async () => {
      this.total = (await this.marketStore?.totalSupply())?.toNumber() ?? 0;
    }, 1000);
  }
}
