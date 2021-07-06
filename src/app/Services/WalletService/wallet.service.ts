import { Injectable } from '@angular/core';
import { WalletProviderService } from '../WalletProviderService/wallet-provider.service';
import methods from './wallet.methods.map';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  constructor(private walletProvider: WalletProviderService) {}

  public isConnected() {
    return !!this.walletProvider.wallet;
  }

  public requestAccounts(): Promise<string[]> | null {
    if (this.walletProvider.wallet)
      return this.walletProvider.wallet.request(methods['requestAccounts']);
    return null;
  }
}
