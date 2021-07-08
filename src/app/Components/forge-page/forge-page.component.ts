import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-forge-page',
  templateUrl: './forge-page.component.html',
  styleUrls: ['./forge-page.component.css'],
})
export class ForgePageComponent implements OnInit {
  titleControl = new FormControl('auto');
  constructor() {}

  ngOnInit(): void {}
}
