import { Injectable } from '@angular/core';
import { WalletProviderService } from '../WalletProviderService/wallet-provider.service';
import methods from './wallet.methods.map';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  private accounts: string[] | undefined;
  constructor(private walletProvider: WalletProviderService) {}

  public async isConnected() {
    try {
      const wallet = await this.walletProvider.wallet;
      return !!wallet;
    } catch (e) {
      return false;
    }
  }

  public async requestAccounts(): Promise<string[] | undefined> {
    if (await this.isConnected()) {
      this.accounts = await this.walletProvider.wallet.request(
        methods['requestAccounts']
      );
      return this.accounts;
    }
    return undefined;
  }

  public async getAccounts() {
    if (this.accounts) return this.accounts;
    else return await this.requestAccounts();
  }

  public hasAccounts() {
    return this.accounts != null;
  }
}
