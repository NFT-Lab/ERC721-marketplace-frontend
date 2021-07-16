import { Injectable, NgZone } from '@angular/core';
import { ethers } from 'ethers';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class WalletProviderService {
  private _wallet: any | undefined;
  private _signer: ethers.Signer | undefined;
  private _provider: ethers.providers.Web3Provider | undefined;

  constructor() {
    this._wallet = (window as any).ethereum;
  }

  get wallet() {
    if (!this._wallet) {
      if ((window as any).ethereum != undefined) {
        this._wallet = (window as any).ethereum;
      } else {
        throw new Error('Provider not available because of no signers');
      }
    }
    return this._wallet;
  }

  get signer() {
    if (this._signer) {
      return this._signer;
    } else {
      return this.provider?.getSigner();
    }
  }

  get provider() {
    if (!this._provider && this._wallet) {
      this._provider = new ethers.providers.Web3Provider(this._wallet);
    }
    return this._provider;
  }
}
