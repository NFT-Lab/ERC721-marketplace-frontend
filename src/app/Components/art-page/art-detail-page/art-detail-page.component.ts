import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-art-detail-page',
  templateUrl: './art-detail-page.component.html',
  styleUrls: ['./art-detail-page.component.css'],
})
export class ArtDetailPageComponent implements OnInit {
  cid: string | undefined;

  constructor(private router: Router) {}

  ngOnInit(): void {}
}
