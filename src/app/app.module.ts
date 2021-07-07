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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WalletButtonComponent,
    LandingPageComponent,
    ArtPageComponent,
    CategoriesPageComponent,
    ForgePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatExpansionModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
