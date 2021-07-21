import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header.component';
import { Router } from '@angular/router';
import { WalletProviderService } from '../../../Services/WalletProviderService/wallet-provider.service';

@Component({
  selector: 'app-wallet-button',
  templateUrl: './wallet-button.component.html',
  styleUrls: ['./wallet-button.component.css'],
})
export class WalletButtonComponent implements OnInit {
  public message: string = '';
  connected: boolean = false;

  constructor(
    private header: HeaderComponent,
    private router: Router,
    private providerService: WalletProviderService
  ) {}

  async ngOnInit(): Promise<void> {
    if ((window as any).ethereum) {
      this.message = 'Connect wallet';
      this.providerService
        .provider()
        .then((provider) =>
          provider
            .listAccounts()
            .then(
              (accounts: string[]) => (this.connected = accounts.length > 0)
            )
        );
    } else {
      this.message = 'Install metamask';
    }
  }

  async requestAccounts() {
    if (!(window as any).ethereum)
      window.open('https://metamask.io/download.html', '_blank');
    else {
      this.providerService
        .requestAccounts()
        .then(() => (this.connected = true));
    }
  }

  openAccountsOptions() {
    this.header.toggleOptions();
  }
}
