import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarketplaceService } from '../../../Services/MarketplaceService/marketplace.service';
import {
  IpfsService,
  Metadata,
} from '../../../Services/IpfsService/ipfs.service';

@Component({
  selector: 'app-art-detail-page',
  templateUrl: './art-detail-page.component.html',
  styleUrls: ['./art-detail-page.component.css'],
})
export class ArtDetailPageComponent implements OnInit {
  cid: string | undefined;
  metadata: Metadata | undefined;
  owner: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private market: MarketplaceService,
    private ipfs: IpfsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.cid = params['cid'];
      this.market.getMarketplaceStore().then((store) => {
        store
          .getNFTByHash(params['cid'])
          .then((nft) => {
            this.ipfs.getMetadata(nft.metadataCid).subscribe((metadata) => {
              this.metadata = metadata;
            });
            store
              .getTokenId(params['cid'])
              .then((tokenId) =>
                store.ownerOf(tokenId).then((owner) => (this.owner = owner))
              );
          })
          .catch((error) => console.error(error));
      });
    });
  }

  openInNewWindow() {
    window.open('https://cloudflare-ipfs.com/ipfs/' + this.cid, '_blank');
  }
}
