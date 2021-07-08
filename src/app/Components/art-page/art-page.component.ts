import { Component, OnInit } from '@angular/core';
import { MarketplaceService } from '../../Services/MarketplaceService/marketplace.service';

@Component({
  selector: 'app-art-page',
  templateUrl: './art-page.component.html',
  styleUrls: ['./art-page.component.css'],
})
export class ArtPageComponent implements OnInit {
  total: number = 0;
  constructor(private market: MarketplaceService) {}

  async ngOnInit(): Promise<void> {
    const marketStore = await this.market.getEthMarketplace();
    if (marketStore) {
      console.log(await marketStore.deployed());
    }
  }
}
