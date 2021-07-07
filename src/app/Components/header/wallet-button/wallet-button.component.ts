import { Component, OnInit } from '@angular/core';
import { WalletService } from '../../../Services/WalletService/wallet.service';

@Component({
  selector: 'app-wallet-button',
  templateUrl: './wallet-button.component.html',
  styleUrls: ['./wallet-button.component.css'],
})
export class WalletButtonComponent implements OnInit {
  public message: string = '';
  account: String | null;

  constructor(private walletService: WalletService) {
    this.account = null;
  }

  async ngOnInit(): Promise<void> {
    try {
      this.walletService.isConnected()
        ? (this.message = 'Connect wallet')
        : (this.message = 'Install metamask');
    } catch (e) {}
  }

  private static shrink(account: String | null) {
    if (!account) return '';
    return account.substr(0, 5) + '...' + account.substr(-3, 3);
  }

  accountsAvailable(): boolean {
    return this.account != null;
  }

  requestAccounts() {
    this.walletService.requestAccounts().then((accounts: string[] | null) => {
      this.account = accounts ? accounts[0] : null;
    });
  }

  openAccountsModal() {}
}
