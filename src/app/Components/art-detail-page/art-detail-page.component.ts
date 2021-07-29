import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MarketplaceService } from '../../Services/MarketplaceService/marketplace.service';
import { IpfsService, Metadata } from '../../Services/IpfsService/ipfs.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { BigNumber, ethers } from 'ethers';
import { WalletProviderService } from '../../Services/WalletProviderService/wallet-provider.service';
import { MatDialog } from '@angular/material/dialog';
import { SellDialogComponent } from './sell-dialog/sell-dialog.component';
import { BuyDialogComponent } from './buy-dialog/buy-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { faCoins } from '@fortawesome/free-solid-svg-icons';

export interface SellData {
  price: number;
}

export interface BuyData {
  price: number;
  tip: number;
}
@Component({
  selector: 'app-art-detail-page',
  templateUrl: './art-detail-page.component.html',
  styleUrls: ['./art-detail-page.component.css'],
  animations: [
    trigger('entering', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('.3s', style({ opacity: 0, left: '-100%' })),
      ]),
    ]),
  ],
})
export class ArtDetailPageComponent implements OnInit {
  cid!: string;
  metadata: Metadata | undefined;
  owner: string | undefined;
  _trade: {
    NFT: BigNumber;
    poster: string;
    open: boolean;
    price: BigNumber;
  } = {
    open: false,
    price: BigNumber.from(0),
    poster: '',
    NFT: BigNumber.from(0),
  };
  sellable: boolean = false;
  cancellable: boolean = false;
  nft: {
    cid: string;
    metadataCid: string;
    image: boolean;
    music: boolean;
    video: boolean;
  } = {
    cid: '',
    metadataCid: '',
    image: false,
    music: false,
    video: false,
  };
  displayPrice: string = '';
  faEthereum = faCoins;

  constructor(
    private route: ActivatedRoute,
    private market: MarketplaceService,
    private ipfs: IpfsService,
    private provider: WalletProviderService,
    private router: Router,
    private ngZone: NgZone,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  reloadPage = () => {
    const url = this.router.url;
    this.router
      .navigate(['/home'], { skipLocationChange: true })
      .then(() => this.ngZone.run(() => this.router.navigate([url])));
  };

  ngOnInit() {
    this.route.params.subscribe(async (params) => {
      this.cid = params['cid'];
      let account = (
        await (await this.provider.signer()).getAddress()
      ).toLowerCase();
      this.market
        .isSellable(params['cid'], account)
        .then((isSellable) => (this.sellable = isSellable));
      this.market.isBuyable(params['cid']).then((trade) => {
        this._trade = trade ?? this._trade;
        this.displayPrice = ethers.utils.formatEther(
          this._trade.price.toString()
        );
      });
      this.market
        .isCancellable(params['cid'], account)
        .then((cancellable) => (this.cancellable = cancellable));
      this.market.getMarketplaceStore().then((store) => {
        store
          .getNFTByHash(params['cid'])
          .then((nft) => {
            this.nft = nft;
            this.ipfs.getMetadata(nft.metadataCid).subscribe((metadata) => {
              this.metadata = metadata;
            });
            store
              .getTokenId(params['cid'])
              .then((tokenId) =>
                store.ownerOf(tokenId).then((owner) => (this.owner = owner))
              );
          })
          .catch((error) => console.error(error));
      });
    });
  }

  openSellDialog(): void {
    const dialogRef = this.dialog.open(SellDialogComponent, {
      width: '250px',
      data: {
        price: 0,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.sell(result);
    });
  }

  openBuyDialog() {
    const dialogRef = this.dialog.open(BuyDialogComponent, {
      width: '500px',
      data: {
        price: Number.parseFloat(ethers.utils.formatEther(this._trade.price)),
        tip: 10000,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.buy(result);
    });
  }

  buy(result: BuyData) {
    if (this.cid) {
      this._snackBar.open(
        'Waiting for metamask to confirm transaction',
        'Dismiss',
        { duration: 3000, panelClass: ['snackbar'] }
      );
      this.market
        .buy(this.cid, result.price, result.tip)
        .then((transaction) => {
          this._snackBar.open('Transaction pending', 'Dismiss', {
            panelClass: ['snackbar'],
          });
          if (transaction) {
            transaction.wait().then(() => {
              this._snackBar.open(
                'Completed, this NFT is now yours!',
                'Dismiss',
                { duration: 3000, panelClass: ['snackbar'] }
              );
              this.reloadPage();
            });
          } else {
            this._snackBar.open(
              'Something went wrong, transaction was reverted',
              'Dismiss',
              { duration: 3000, panelClass: ['snackbar'] }
            );
          }
        })
        .catch((error) => {
          this._snackBar.open(
            'Transaction was reverted, the trade is still open!',
            'Dismiss',
            { duration: 3000, panelClass: ['snackbar'] }
          );
        });
    }
  }

  sell(price: number) {
    if (this.cid) {
      this._snackBar.open(
        'Waiting for metamask to confirm transaction',
        'Dismiss',
        { panelClass: ['snackbar'], duration: 3000 }
      );
      this.market
        .sell(this.cid, price)
        .then((transaction) => {
          this._snackBar.open('Transaction pending', 'Dismiss', {
            panelClass: ['snackbar'],
          });
          if (transaction) {
            transaction.wait().then(() => {
              this._snackBar.open(
                'Transaction completed, Opened trade for NFT!',
                'Dismiss',
                { panelClass: ['snackbar'], duration: 3000 }
              );
              this.reloadPage();
            });
          } else {
            this._snackBar.open(
              'Something went wrong, transaction was reverted',
              'Dismiss',
              { panelClass: ['snackbar'], duration: 3000 }
            );
          }
        })
        .catch((error) => {
          this._snackBar.open(
            'Transaction was reverted, no trade has been opened!',
            'Dismiss',
            { panelClass: ['snackbar'], duration: 3000 }
          );
        });
    }
  }

  cancel() {
    if (this.cid) {
      this._snackBar.open(
        'Waiting for metamask to confirm transaction',
        'Dismiss',
        { panelClass: ['snackbar'], duration: 3000 }
      );
      this.market
        .cancel(this.cid)
        .then((transaction) => {
          this._snackBar.open('Transaction pending', 'Dismiss', {
            panelClass: ['snackbar'],
          });
          if (transaction) {
            transaction.wait().then(() => {
              this._snackBar.open(
                'Transaction completed, the trade was cancelled',
                'Dismiss',
                { panelClass: ['snackbar'], duration: 3000 }
              );
              this.reloadPage();
            });
          } else {
            this._snackBar.open(
              'Something went wrong, transaction was reverted',
              'Dismiss',
              { panelClass: ['snackbar'], duration: 3000 }
            );
          }
        })
        .catch((error) => {
          this._snackBar.open(
            'Transaction was reverted, the trade is still open!',
            'Dismiss',
            { panelClass: ['snackbar'], duration: 3000 }
          );
        });
    }
  }
}
