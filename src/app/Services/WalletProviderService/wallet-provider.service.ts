import { Injectable, NgZone } from '@angular/core';
import { ethers } from 'ethers';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class WalletProviderService implements CanActivate {
  private active: boolean = false;

  private _signer: ethers.Signer | undefined;
  private _provider: ethers.providers.Web3Provider | undefined;

  constructor(private router: Router, private ngZone: NgZone) {
    this.provider().then((provider) =>
      provider.listAccounts().then((accounts: string[]) => {
        this.active = accounts.length > 0;
      })
    );

    if ((window as any).ethereum)
      (window as any).ethereum.on('accountsChanged', () => {
        const url = router.url;
        if (!url.match('/art$'))
          router
            .navigate(['/home'], { skipLocationChange: true })
            .then(() => ngZone.run(() => router.navigate([url])));
      });
  }

  async signer() {
    if (this._signer) {
      return this._signer;
    } else {
      return (await this.provider()).getSigner();
    }
  }

  async provider(): Promise<ethers.providers.Web3Provider> {
    if (!this._provider) {
      this._provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
    }
    return this._provider;
  }

  requestAccounts() {
    return this.provider()
      .then((provider) => provider.send('eth_requestAccounts', []))
      .then((accounts) => {
        this.active = true;
        return accounts;
      });
  }

  async canActivate() {
    if (this.active) return true;
    const provider = await this.provider();
    const accounts = await provider.listAccounts();
    return accounts.length > 0;
  }
}
