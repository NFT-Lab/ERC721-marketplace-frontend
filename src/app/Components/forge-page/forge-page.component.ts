import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WalletService } from '../../Services/WalletService/wallet.service';
import { IpfsService } from '../../Services/IpfsService/ipfs.service';
import { MarketplaceService } from '../../Services/MarketplaceService/marketplace.service';
import { Web3ProviderService } from '../../Services/Web3ProviderService/web3-provider.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface IPFSResponse {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
  isDuplicate?: boolean;
}

@Component({
  selector: 'app-forge-page',
  templateUrl: './forge-page.component.html',
  styleUrls: ['./forge-page.component.css'],
})
export class ForgePageComponent implements OnInit {
  walletAddress: string = '';

  mintForm: FormGroup = this.formBuilder.group({
    file: File,
    title: '',
    description: '',
    author: '',
    wallet: '',
    categories: '',
  });
  minted: boolean = false;
  mintMessage: string = 'Mint NFT';
  nft: { metadataHash: string; cid: string } = { cid: '', metadataHash: '' };

  constructor(
    private walletService: WalletService,
    private providerService: Web3ProviderService,
    private ipfsService: IpfsService,
    private formBuilder: FormBuilder,
    private marketplace: MarketplaceService,
    private _snackBar: MatSnackBar
  ) {
    walletService
      .getAccounts()
      .then((accounts) => {
        this.walletAddress = accounts ? accounts[0] : '';
      })
      .catch((error) => {
        console.log(error);
      });
  }

  ngOnInit(): void {
    this.mintForm.setValue({
      file: File,
      title: '',
      description: '',
      author: '',
      wallet: this.walletAddress,
      categories: '',
    });
  }

  mint() {
    if (this.minted) {
      window.open('https://etherscan.io/tx/' + this.mintMessage);
    } else {
      this._snackBar.open('Saving the file on ipfs', 'dismiss', {
        horizontalPosition: 'end',
        verticalPosition: 'bottom',
      });
      this.ipfsService
        .addFile(this.mintForm.value.file, {
          name: this.mintForm.value.title,
          categories: [],
        })
        .then((artResponse) => {
          this._snackBar.open('Saving the file metadata on ipfs', 'dismiss', {
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
          });
          const art_res = artResponse as IPFSResponse;
          this.ipfsService
            .addJson(
              JSON.stringify({ ...this.mintForm.value, file: undefined })
            )
            .then((metadataResponse) => {
              this._snackBar.open('Getting the store', 'dismiss', {
                horizontalPosition: 'end',
                verticalPosition: 'bottom',
              });
              const meta_res = metadataResponse as IPFSResponse;
              this.marketplace.getMarketplaceStore().then((store) => {
                this._snackBar.open('minting the NFT', 'dismiss', {
                  horizontalPosition: 'end',
                  verticalPosition: 'bottom',
                });
                if (this.providerService.provider)
                  store
                    .connect(this.providerService.provider.getSigner())
                    .mint(this.walletAddress, {
                      cid: art_res.IpfsHash,
                      metadataCid: meta_res.IpfsHash,
                    })
                    .then((tx) => {
                      this._snackBar.open('Minted!!', 'dismiss', {
                        horizontalPosition: 'end',
                        verticalPosition: 'bottom',
                      });
                      this.nft = {
                        cid: art_res.IpfsHash,
                        metadataHash: meta_res.IpfsHash,
                      };
                      this.minted = true;
                      this.mintMessage = tx.hash;
                    });
              });
            });
        });
    }
  }
}
