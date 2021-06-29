import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wallet-button',
  templateUrl: './wallet-button.component.html',
  styleUrls: ['./wallet-button.component.css'],
})
export class WalletButtonComponent implements OnInit {
  public message: string;
  private provider: any;
  private account: String | null;

  constructor() {
    this.message = 'Install metamask';
    this.provider = (window as any).ethereum ?? undefined;
    if(this.provider) {
      this.message = "Connect to your wallet"
    }
    this.account = null;
  }

  async ngOnInit(): Promise<void> {}

  async onPush() {
    if (this.provider) {
      this.message = "Waiting for metamask"
      try {
        const accounts = await this.provider.request({
          method: 'eth_requestAccounts'
        })
        this.account = accounts[0];
        this.message = WalletButtonComponent.shrink(this.account);
      } catch (e) {
        this.message = "Connection reverted, try again"
      }
    }
    else {
      location.href = "https://metamask.io"
    }
  }

  private static shrink(account: String | null) {
    if(!account) return "";
    return account.substr(0,5) + '...' + account.substr(-3,3);
  }

  accountsAvailable(): boolean {
    return this.account != null;
  }
}
