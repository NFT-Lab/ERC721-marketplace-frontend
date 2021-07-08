import { Injectable } from '@angular/core';
import { WalletProviderService } from '../WalletProviderService/wallet-provider.service';
import { ethers } from 'ethers';

@Injectable({
  providedIn: 'root',
})
export class Web3ProviderService {
  private readonly _provider: ethers.providers.Web3Provider | undefined;

  constructor(private walletProvider: WalletProviderService) {
    try {
      this._provider = new ethers.providers.Web3Provider(walletProvider.wallet);
    } catch (e) {}
  }

  get provider() {
    return this._provider;
  }
}
