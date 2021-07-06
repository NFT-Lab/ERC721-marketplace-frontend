import { Injectable } from '@angular/core';
import { WalletProviderService } from '../WalletProviderService/wallet-provider.service';

@Injectable({
  providedIn: 'root',
})
export class MarketplaceService {
  constructor(private walletProvider: WalletProviderService) {}
}
