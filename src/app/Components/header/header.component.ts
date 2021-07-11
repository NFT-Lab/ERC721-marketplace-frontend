import { Component, OnInit } from '@angular/core';
import { WalletService } from '../../Services/WalletService/wallet.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

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
export class HeaderComponent implements OnInit {
  accountOptions: boolean = false;
  constructor(private walletService: WalletService) {}

  ngOnInit(): void {}

  public isActive(path: string) {
    return location.pathname.match(path) ? 'active' : '';
  }

  public canForge() {
    return this.walletService.hasAccounts();
  }

  public toggleOptions() {
    this.accountOptions = !this.accountOptions;
  }
}
