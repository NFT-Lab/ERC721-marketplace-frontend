import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { WalletButtonComponent } from './Components/header/wallet-button/wallet-button.component';
import { LandingPageComponent } from './Components/landing-page/landing-page.component';
import { ArtPageComponent } from './Components/art-page/art-page.component';
import { CategoriesPageComponent } from './Components/categories-page/categories-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { ForgePageComponent } from './Components/forge-page/forge-page.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { NFTPreviewComponent } from './Components/art-page/NFT-Preview/nft-preview.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ArtDetailPageComponent } from './Components/art-detail-page/art-detail-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { HttpClientModule } from '@angular/common/http';
import { ChipListComponent } from './Components/forge-page/chip-list/chip-list.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRippleModule } from '@angular/material/core';
import { MyArtPageComponent } from './Components/my-art-page/my-art-page.component';
import { WalletProviderService } from './Services/WalletProviderService/wallet-provider.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SellDialogComponent } from './Components/art-detail-page/sell-dialog/sell-dialog.component';
import { BuyDialogComponent } from './Components/art-detail-page/buy-dialog/buy-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MarketplaceService } from './Services/MarketplaceService/marketplace.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WalletButtonComponent,
    LandingPageComponent,
    ArtPageComponent,
    CategoriesPageComponent,
    ForgePageComponent,
    NFTPreviewComponent,
    ArtDetailPageComponent,
    ChipListComponent,
    MyArtPageComponent,
    SellDialogComponent,
    BuyDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatExpansionModule,
    ScrollingModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatChipsModule,
    NgxMatFileInputModule,
    HttpClientModule,
    MatSnackBarModule,
    InfiniteScrollModule,
    ClipboardModule,
    MatTooltipModule,
    MatRippleModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatButtonModule,
  ],
  providers: [WalletProviderService, MarketplaceService],
  bootstrap: [AppComponent],
})
export class AppModule {}
