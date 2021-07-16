import { Component, OnInit } from '@angular/core';
import { WalletService } from '../../../Services/WalletService/wallet.service';
import { HeaderComponent } from '../header.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wallet-button',
  templateUrl: './wallet-button.component.html',
  styleUrls: ['./wallet-button.component.css'],
})
export class WalletButtonComponent implements OnInit {
  public message: string = '';
  account: String | undefined;

  constructor(
    private walletService: WalletService,
    private header: HeaderComponent,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    if (await this.walletService.isConnected()) {
      this.message = 'Connect wallet';
    } else {
      this.message = 'Install metamask';
    }
  }

  accountsAvailable(): boolean {
    return this.account != null;
  }

  async requestAccounts() {
    if (!(await this.walletService.isConnected()))
      window.open('https://metamask.io/download.html', '_blank');
    else
      this.walletService
        .requestAccounts()
        .then((accounts: string[] | undefined) => {
          this.account = accounts ? accounts[0] : undefined;
          if (this.account) this.router.navigate([this.router.url]);
        });
  }

  openAccountsOptions() {
    this.header.toggleOptions();
  }
}
