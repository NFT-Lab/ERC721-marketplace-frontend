import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { WalletProviderService } from '../../Services/WalletProviderService/wallet-provider.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
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
export class HeaderComponent {
  accountOptions: boolean = false;
  constructor() {}

  public isActive(path: string) {
    return location.pathname.match(path) ? 'active' : '';
  }

  public toggleOptions() {
    this.accountOptions = !this.accountOptions;
  }
}
