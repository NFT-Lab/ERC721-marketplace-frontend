import { Injectable } from '@angular/core';
import { ethers } from 'ethers';

@Injectable({
  providedIn: 'root',
})
export class WalletProviderService {
  private readonly _wallet: any | undefined;
  private _signer: ethers.Signer | undefined;
  private _provider: ethers.providers.Web3Provider | undefined;

  constructor() {
    this._wallet = (window as any).ethereum ?? null;
  }

  get wallet() {
    if (this._wallet) {
      return this._wallet;
    } else throw new Error('Provider not available because of no signers');
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
