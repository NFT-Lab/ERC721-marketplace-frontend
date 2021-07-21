import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  animations: [
    trigger('entering', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('.3s', style({ opacity: 0, left: '-100%' })),
      ]),
    ]),
  ],
})
export class LandingPageComponent {
  title_all: string = 'NFTLab marketplace';
  title: string = '';
  display_functionalities: boolean = false;
  functionalities: string[] = [];
  desc: string[] = [
    'Connect your wallet to mint an nft, registering the art piece on IPFS and registering ownership with the ethereum blockchain',
    'Once connected with metamask you can preview all your art pieces and sell them for a fixed price trough this marketplace',
    'You can even buy other people NFTs if open for trade, or simply view all of them in the Art page',
  ];
  icon: string[] = ['bolt', 'ticket', 'tag'];
  constructor() {
    this.self_calling(this);
  }

  self_calling(that: LandingPageComponent) {
    const total_len = that.title_all.length;
    const current_len = that.title.length;
    if (current_len < total_len) {
      that.title += that.title_all[current_len];
      setTimeout(that.self_calling, 100, that);
    } else {
      that.display_functionalities = true;
      setTimeout(
        () => {
          that.functionalities.push('Mint NFT');
          setTimeout(
            () => {
              that.functionalities.push('Sell your NFTS');
              setTimeout(
                () => {
                  that.functionalities.push('Buy minted NFTS');
                },
                800,
                that
              );
            },
            600,
            that
          );
        },
        200,
        that
      );
    }
  }
}
