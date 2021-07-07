import { Injectable } from '@angular/core';
import { WalletProviderService } from '../WalletProviderService/wallet-provider.service';
import methods from './wallet.methods.map';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  private accounts: string[] | null = null;
  constructor(private walletProvider: WalletProviderService) {}

  public async isConnected() {
    try {
      const wallet = await this.walletProvider.wallet;
      return !!wallet;
    } catch (e) {
      return false;
    }
  }

  public async requestAccounts(): Promise<string[] | null> {
    if (await this.isConnected()) {
      this.accounts = await this.walletProvider.wallet.request(
        methods['requestAccounts']
      );
      return this.accounts;
    }
    return null;
  }

  public async getAccounts() {
    if (this.accounts) return this.accounts;
    else return await this.requestAccounts();
  }

  public hasAccounts() {
    return this.accounts != null;
  }
}
