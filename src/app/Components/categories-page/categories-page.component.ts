import { Component, OnInit } from '@angular/core';
import { MarketplaceService } from '../../Services/MarketplaceService/marketplace.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css'],
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
export class CategoriesPageComponent implements OnInit {
  img: {
    cid: string;
    metadataCid: string;
    image: boolean;
    music: boolean;
    video: boolean;
  } = { cid: '', metadataCid: '', image: false, music: false, video: false };
  music: {
    cid: string;
    metadataCid: string;
    image: boolean;
    music: boolean;
    video: boolean;
  } = { cid: '', metadataCid: '', image: false, music: false, video: false };
  video: {
    cid: string;
    metadataCid: string;
    image: boolean;
    music: boolean;
    video: boolean;
  } = { cid: '', metadataCid: '', image: false, music: false, video: false };

  current = {
    img: 0,
    music: 0,
    video: 0,
  };

  no_element = {
    img: true,
    music: true,
    video: true,
  };

  total = {
    img: 0,
    music: 0,
    video: 0,
  };
  constructor(private market: MarketplaceService) {}

  async ngOnInit() {
    const store = await this.market.getMarketplaceStore();
    this.total = {
      img: (await store.image_totalSupply()).toNumber(),
      music: (await store.music_totalSupply()).toNumber(),
      video: (await store.video_totalSupply()).toNumber(),
    };

    if (this.total.img == 0) this.no_element.img = true;
    if (this.total.music == 0) this.no_element.music = true;
    if (this.total.video == 0) this.no_element.video = true;

    this.imgAt(0);
    this.musicAt(0);
    this.videoAt(0);
  }

  imgAt(index: number) {
    if (index < this.total.img)
      this.market.getMarketplaceStore().then((store) => {
        store.getImageAt(index).then((imageId) => {
          store.getNFTById(imageId).then((nft) => {
            this.img = nft;
            this.no_element.img = false;
          });
        });
      });
  }

  musicAt(index: number) {
    if (index < this.total.music)
      this.market.getMarketplaceStore().then((store) => {
        store.getMusicAt(index).then((musicId) => {
          store.getNFTById(musicId).then((nft) => {
            this.music = nft;
            this.no_element.music = false;
          });
        });
      });
  }

  videoAt(index: number) {
    if (index < this.total.video)
      this.market.getMarketplaceStore().then((store) => {
        store.getVideoAt(index).then((videoId) => {
          store.getNFTById(videoId).then((nft) => {
            this.video = nft;
            this.no_element.video = false;
          });
        });
      });
  }

  iterImage(move: number) {
    this.current.img += move;
    if (!(this.current.img < this.total.img)) this.current.img = 0;
    if (this.current.img < 0) this.current.img = this.total.img - 1;
    this.imgAt(this.current.img);
  }

  iterMusic(move: number) {
    this.current.music += move;
    if (!(this.current.music < this.total.music)) this.current.music = 0;
    if (this.current.music < 0) this.current.music = this.total.music - 1;
    this.musicAt(this.current.music);
  }

  iterVideo(move: number) {
    this.current.video += move;
    if (!(this.current.video < this.total.video)) this.current.video = 0;
    if (this.current.video < 0) this.current.video = this.total.video - 1;
    this.imgAt(this.current.video);
  }
}
