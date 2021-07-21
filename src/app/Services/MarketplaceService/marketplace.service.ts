import { Injectable } from '@angular/core';
import { WalletProviderService } from '../WalletProviderService/wallet-provider.service';
import ETHM_INTERFACE from 'erc721nftlab/artifacts/contracts/ETHMarketplace.sol/ETHMarketplace.json';
import NFTLS_INTERFACE from 'erc721nftlab/artifacts/contracts/NFTLabStoreMarketplaceVariant.sol/NFTLabStoreMarketplaceVariant.json';
import { environment } from '../../../environments/environment';
import { ETHMarketplace } from 'erc721nftlab/typechain/ETHMarketplace';
import { NFTLabStoreMarketplaceVariant } from 'erc721nftlab/typechain/NFTLabStoreMarketplaceVariant';
import { BigNumber, ethers } from 'ethers';

@Injectable()
export class MarketplaceService {
  private _ETHMarketplace: ETHMarketplace | undefined;
  private _marketplaceStore: NFTLabStoreMarketplaceVariant | undefined;

  constructor(private walletProvider: WalletProviderService) {}

  async getEthMarketplace() {
    if (!this._ETHMarketplace) {
      this._ETHMarketplace = new ethers.Contract(
        environment.contractAddress,
        ETHM_INTERFACE['abi'],
        await this.walletProvider.provider()
      ) as ETHMarketplace;
    }
    return this._ETHMarketplace;
  }

  async getMarketplaceStore() {
    if (!this._marketplaceStore) {
      const addr = await (await this.getEthMarketplace()).getStorage();
      this._marketplaceStore = new ethers.Contract(
        addr,
        NFTLS_INTERFACE['abi'],
        await this.walletProvider.provider()
      ) as NFTLabStoreMarketplaceVariant;
    }
    return this._marketplaceStore;
  }

  async isBuyable(cid: string) {
    const store = await this.getMarketplaceStore();
    const tokenId = await store.getTokenId(cid);
    const marketplace = await this.getEthMarketplace();
    const tradeID = await marketplace.getTradeOfNft(tokenId);
    if (!tradeID.eq(BigNumber.from(0))) {
      const trade = await marketplace.getTrade(tradeID);
      return {
        poster: trade[0],
        NFT: trade[1],
        price: trade[2],
        open:
          trade[3] ==
          ethers.utils.hexlify(ethers.utils.formatBytes32String('Open')),
      };
    }
    return undefined;
  }

  async isCancellable(cid: string, account: string) {
    const trade = await this.isBuyable(cid);
    return !!trade && trade.poster.toLowerCase() == account.toLowerCase();
  }

  async isSellable(cid: string, account: string) {
    const store = await this.getMarketplaceStore();
    const tokenId = await store.getTokenId(cid);
    const marketplace = await this.getEthMarketplace();
    const tradeID = await marketplace.getTradeOfNft(tokenId);
    if (tradeID.eq(BigNumber.from(0))) {
      const owner = await store.ownerOf(tokenId);
      return account == owner.toLowerCase();
    }
    return false;
  }

  async buy(
    cid: string,
    price: number
  ): Promise<ethers.ContractTransaction | undefined> {
    const marketplace = await this.getEthMarketplace();
    const store = await this.getMarketplaceStore();
    const tokenId = await store.getTokenId(cid);
    const tradeID = await marketplace.getTradeOfNft(tokenId);
    const signer = await this.walletProvider.signer();
    if (signer)
      return marketplace.connect(signer).executeTrade(tradeID, {
        value: ethers.utils.parseEther('' + (price + 0.1)) /* tip */,
      });
    return undefined;
  }

  async sell(
    cid: string,
    price: number
  ): Promise<ethers.ContractTransaction | undefined> {
    const marketplace = await this.getEthMarketplace();
    const store = await this.getMarketplaceStore();
    const tokenId = await store.getTokenId(cid);
    const signer = await this.walletProvider.signer();
    if (signer) return marketplace.connect(signer).openTrade(tokenId, price);
    return undefined;
  }

  async cancel(cid: string): Promise<ethers.ContractTransaction | undefined> {
    const marketplace = await this.getEthMarketplace();
    const store = await this.getMarketplaceStore();
    const tokenId = await store.getTokenId(cid);
    const tradeID = await marketplace.getTradeOfNft(tokenId);
    const signer = await this.walletProvider.signer();
    if (signer) return marketplace.connect(signer).cancelTrade(tradeID);
    return undefined;
  }
}
