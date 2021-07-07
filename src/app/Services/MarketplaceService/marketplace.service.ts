import { Injectable } from '@angular/core';
import { WalletProviderService } from '../WalletProviderService/wallet-provider.service';
import { ETHMarketplace } from 'erc721nftlab/typechain/ETHMarketplace';
import '@nomiclabs/hardhat-ethers';
import { environment } from '../../../environments/environment';
import { getContractFactory } from '@nomiclabs/hardhat-ethers/types';
import { NFTLabStoreMarketplaceVariant } from 'erc721nftlab/typechain/NFTLabStoreMarketplaceVariant';

@Injectable({
  providedIn: 'root',
})
export class MarketplaceService {
  private _ethMarketplace: ETHMarketplace | undefined;
  private _markeplaceStore: NFTLabStoreMarketplaceVariant | undefined;
  constructor(private walletProvider: WalletProviderService) {}

  async getEthMarketplace() {
    if (this._ethMarketplace) return this._ethMarketplace;
    const factory = await getContractFactory('ETHMarketplace');
    this._ethMarketplace = factory.attach(
      environment.contractAddress
    ) as ETHMarketplace;
    return this._ethMarketplace;
  }

  async getMarketplaceStore() {
    if (!this._markeplaceStore) {
      const factory = await getContractFactory('NFTLabStoreMarketplaceVariant');
      const storeAddr = await this._ethMarketplace?.getStorage();
      if (storeAddr)
        this._markeplaceStore = factory.attach(
          storeAddr
        ) as NFTLabStoreMarketplaceVariant;
      else throw new Error();
    }
    return this._markeplaceStore;
  }
}
