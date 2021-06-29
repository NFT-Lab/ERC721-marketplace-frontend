import {Injectable, Provider} from '@angular/core';
import {ethers} from "ethers";

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  private _wallet: any | null;

  constructor() {
    this._wallet = (window as any).ethereum ?? null;
  }

  get wallet() {
    if(this._wallet) {
      return this._wallet
    } else throw new Error("Provider not available because of no signers");
  }
}
