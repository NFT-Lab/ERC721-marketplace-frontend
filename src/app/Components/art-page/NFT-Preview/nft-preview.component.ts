import { Component, Input, OnInit } from '@angular/core';
import { IpfsService } from '../../../Services/IpfsService/ipfs.service';
import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-nft-preview',
  templateUrl: './nft-preview.component.html',
  styleUrls: ['./nft-preview.component.css'],
  animations: [
    trigger('entering', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('.3s', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('.3s', style({ opacity: 0 }))]),
    ]),
  ],
})
export class NFTPreviewComponent implements OnInit {
  title: string = '';
  author: string = '';
  description: string = '';
  wallet: string = '';
  wallCompressed: string = '';

  @Input('cid') cid!: string;
  @Input('metadataCid') metadataCid!: string;
  @Input('orientation') orientation!: string;

  constructor(private ipfs: IpfsService, private router: Router) {}

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
    this.router.navigate([s]);
  }

  reverse(orientation: string) {
    return orientation == 'right' ? 'left' : 'right';
  }
}
