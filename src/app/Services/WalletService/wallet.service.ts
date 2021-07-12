import { Injectable } from '@angular/core';
import { WalletProviderService } from '../WalletProviderService/wallet-provider.service';
import methods from './wallet.methods.map';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WalletService implements CanActivate {
  private accounts: string[] | undefined;

  constructor(
    private walletProvider: WalletProviderService,
    private router: Router
  ) {
    walletProvider.wallet.on('accountsChanged', this.requestAccounts);
  }

  public async isConnected() {
    try {
      const wallet = await this.walletProvider.wallet;
      return !!wallet;
    } catch (e) {
      return false;
    }
  }

  public async requestAccounts(): Promise<string[] | undefined> {
    if (this.walletProvider.wallet) {
      this.accounts = await this.walletProvider.wallet.request(
        methods['requestAccounts']
      );
      return this.accounts;
    }
    return undefined;
  }

  public hasAccounts() {
    return this.accounts != null;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.hasAccounts()) this.router.navigate(['home']);
    return this.hasAccounts();
  }
}
