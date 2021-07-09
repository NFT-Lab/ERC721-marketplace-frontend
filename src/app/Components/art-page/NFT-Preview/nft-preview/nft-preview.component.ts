import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nft-preview',
  templateUrl: './nft-preview.component.html',
  styleUrls: ['./nft-preview.component.css'],
})
export class NFTPreviewComponent implements OnInit {
  @Input('title') title!: string;
  @Input('author') author!: string;
  @Input('description') description!: string;
  @Input('propetary') propetary!: string;
  @Input('img-src') img!: string;

  constructor() {}

  ngOnInit(): void {}
}
