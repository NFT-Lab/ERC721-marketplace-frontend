import { Injectable } from '@angular/core';
import {Observer, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EthProviderServiceService {
  private _provider: any | null;

  constructor() {
    this._provider = (window as any).ethereum ?? null;
    if(this._provider.isMetaMask) {
      this._provider.on('accountsChanged', )
    }
  }

  get provider() {
    return this._provider;
  }
}
