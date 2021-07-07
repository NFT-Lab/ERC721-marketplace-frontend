import { Component, OnInit } from '@angular/core';
import { WalletService } from '../../../Services/WalletService/wallet.service';

@Component({
  selector: 'app-wallet-button',
  templateUrl: './wallet-button.component.html',
  styleUrls: ['./wallet-button.component.css'],
})
export class WalletButtonComponent implements OnInit {
  public message: string = '';
  account: String | undefined;

  constructor(private walletService: WalletService) {}

  async ngOnInit(): Promise<void> {
      if(await this.walletService.isConnected()) {
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
      window.open("https://metamask.io/download.html", "_blank")
    else
      this.walletService.requestAccounts().then((accounts: string[] | null) => {
        this.account = accounts ? accounts[0] : undefined;
      })
  }

  openAccountsModal() {}
}
