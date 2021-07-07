import { Component, OnInit } from '@angular/core';
import { WalletService } from '../../Services/WalletService/wallet.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private walletService: WalletService) {}

  ngOnInit(): void {}

  public isActive(path: string) {
    return location.pathname.match(path) ? 'active' : '';
  }

  public canForge() {
    return this.walletService.hasAccounts();
  }
}
