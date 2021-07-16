import { Injectable } from '@angular/core';
import { WalletProviderService } from '../WalletProviderService/wallet-provider.service';
import methods from './wallet.methods.map';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable()
export class WalletService implements CanActivate {
  private accounts: string[] | undefined;
  private connected: boolean = false;

  constructor(
    private walletProvider: WalletProviderService,
    private router: Router
  ) {
    try {
      this.walletProvider.wallet
        .request({ method: 'wallet_getPermissions' })
        .then((permissions: any[]) => {
          permissions.forEach((permission) => {
            if (permission['parentCapability'] == 'eth_accounts')
              this.connected = true;
          });
        });
    } catch (e) {}
  }

  public isConnected() {
    try {
      const wallet = this.walletProvider.wallet;
      return !!wallet || this.connected;
    } catch (e) {
      return false;
    }
  }

  public async requestAccounts(): Promise<string[] | undefined> {
    if (this.walletProvider.wallet) {
      try {
        this.accounts = await this.walletProvider.wallet.request(
          methods['requestAccounts']
        );
        return this.accounts;
      } catch (e) {}
    }
    return undefined;
  }

  public hasAccounts() {
    return this.accounts != null;
  }

  public getCurrentAccount() {
    if (this.isConnected() && this.accounts && this.accounts.length > 0) {
      return this.accounts[0];
    }
    throw new Error('No accounts, verify before call with .hasAccounts()');
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.hasAccounts()) this.router.navigate(['home']);
    return this.hasAccounts();
  }
}
