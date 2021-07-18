import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WalletService } from '../../Services/WalletService/wallet.service';
import { IpfsService } from '../../Services/IpfsService/ipfs.service';
import { MarketplaceService } from '../../Services/MarketplaceService/marketplace.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WalletProviderService } from '../../Services/WalletProviderService/wallet-provider.service';
import { ChipListComponent } from './chip-list/chip-list.component';

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
  @ViewChild('chiplist') chiplist!: ChipListComponent;
  minted: boolean = false;
  mintMessage: string = 'Mint NFT';
  nft: { metadataHash: string; cid: string } = { cid: '', metadataHash: '' };

  constructor(
    private walletService: WalletService,
    private providerService: WalletProviderService,
    private ipfsService: IpfsService,
    private formBuilder: FormBuilder,
    private marketplace: MarketplaceService,
    private _snackBar: MatSnackBar
  ) {
    if (this.walletService.getCurrentAccount())
      this.walletAddress = this.walletService.getCurrentAccount() ?? '';
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
        duration: 3000,
        panelClass: ['snackbar'],
      });
      this.ipfsService
        .addFile(this.mintForm.value.file, {
          name: this.mintForm.value.title,
          categories: [],
        })
        .then((artResponse) => {
          this._snackBar.open('Saving the file metadata on ipfs', 'dismiss', {
            duration: 3000,
            panelClass: ['snackbar'],
          });
          const art_res = artResponse as IPFSResponse;
          this.ipfsService
            .addJson(
              JSON.stringify({ ...this.mintForm.value, file: undefined })
            )
            .then((metadataResponse) => {
              this._snackBar.open('Getting the store', 'dismiss', {
                duration: 3000,
                panelClass: ['snackbar'],
              });
              const meta_res = metadataResponse as IPFSResponse;
              this.marketplace.getMarketplaceStore().then((store) => {
                this._snackBar.open('minting the NFT', 'dismiss', {
                  duration: 3000,
                  panelClass: ['snackbar'],
                });
                if (this.providerService.provider)
                  store
                    .connect(this.providerService.provider.getSigner())
                    .mint(this.walletAddress, {
                      cid: art_res.IpfsHash,
                      metadataCid: meta_res.IpfsHash,
                      image: this.chiplist.categories.includes('Image'),
                      music: this.chiplist.categories.includes('Music'),
                      video: this.chiplist.categories.includes('Video'),
                    })
                    .then((tx) => {
                      this._snackBar.open('Transaction pending...', 'dismiss', {
                        duration: 3000,
                        panelClass: ['snackbar'],
                      });
                      tx.wait().then((receipt) => {
                        this._snackBar.open('Minted!!', 'dismiss', {
                          duration: 3000,
                          panelClass: ['snackbar'],
                        });
                        this.nft = {
                          cid: art_res.IpfsHash,
                          metadataHash: meta_res.IpfsHash,
                        };
                        this.minted = true;
                        this.mintMessage = tx.hash;
                      });
                    })
                    .catch((error) => {
                      this._snackBar.open(
                        'Failed to mint, ' + error,
                        'dismiss',
                        {
                          duration: 3000,
                          panelClass: ['snackbar'],
                        }
                      );
                    });
              });
            });
        });
    }
  }
}
