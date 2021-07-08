import { Injectable } from '@angular/core';
import { WalletProviderService } from '../WalletProviderService/wallet-provider.service';
import ETHM_INTERFACE from 'erc721nftlab/artifacts/contracts/ETHMarketplace.sol/ETHMarketplace.json';
import NFTLS_INTERFACE from 'erc721nftlab/artifacts/contracts/NFTLabStoreMarketplaceVariant.sol/NFTLabStoreMarketplaceVariant.json';
import { environment } from '../../../environments/environment';
import { ETHMarketplace } from 'erc721nftlab/typechain/ETHMarketplace';
import { NFTLabStoreMarketplaceVariant } from 'erc721nftlab/typechain/NFTLabStoreMarketplaceVariant';

@Injectable({
  providedIn: 'root',
})
export class MarketplaceService {
  private _ETHMarketplace: ETHMarketplace | undefined;
  private _marketplaceStore: NFTLabStoreMarketplaceVariant | undefined;

  constructor(private walletProvider: WalletProviderService) {}

  async getEthMarketplace() {
    if (!this._ETHMarketplace) {
      this._ETHMarketplace = new ETHMarketplace(
        environment.contractAddress,
        ETHM_INTERFACE['abi'],
        this.walletProvider.signer
      );
    }
    return this._ETHMarketplace;
  }

  async getMarketplaceStore() {
    if (!this._marketplaceStore) {
      const addr = await (await this.getEthMarketplace()).getStorage();
      this._marketplaceStore = new NFTLabStoreMarketplaceVariant(
        addr,
        NFTLS_INTERFACE['abi'],
        this.walletProvider.signer
      );
    }
    return this._marketplaceStore;
  }
}
