import { Component, Input, OnInit } from '@angular/core';
import { IpfsService } from '../../../../Services/IpfsService/ipfs.service';

@Component({
  selector: 'app-nft-preview',
  templateUrl: './nft-preview.component.html',
  styleUrls: ['./nft-preview.component.css'],
})
export class NFTPreviewComponent implements OnInit {
  title: string = '';
  author: string = '';
  description: string = '';
  wallet: string = '';
  wallCompressed: string = '';

  @Input('cid') cid!: string;
  @Input('metadataCid') metadataCid!: string;

  constructor(private ipfs: IpfsService) {}

  ngOnInit(): void {
    this.ipfs.getMetadata(this.metadataCid).subscribe((data) => {
      this.title = data.title;
      this.author = data.author;
      this.wallet = data.wallet;
      this.wallCompressed =
        data.wallet.substr(0, 5) + '...' + data.wallet.substr(-3, 3);
      this.description = data.description;
    });
  }

  open(s: string) {
    window.open(s);
  }
}
