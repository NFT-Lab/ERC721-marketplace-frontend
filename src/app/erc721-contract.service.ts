import { Injectable } from '@angular/core';
import { WalletService } from "./wallet.service";
import { EthProviderService } from "./eth-provider.service";

@Injectable({
  providedIn: 'root'
})
export class Erc721ContractService {

  constructor(private wallet: WalletService, private provider: EthProviderService) {

  }
}
