import { Injectable } from '@angular/core';
import {WalletService} from "./wallet.service";
import {ethers} from "ethers";

@Injectable({
  providedIn: 'root'
})
export class EthProviderService {
  private _provider: any | null;

  constructor(private walletService: WalletService) {
    try {
      this._provider = new ethers.providers.Web3Provider(walletService.wallet);
    } catch (e: any) {
      this._provider = null
    }
  }

  get provider() {
    if(this._provider) {
      return this._provider
    } else throw new Error("Provider not available because of no signers");
  }
}
