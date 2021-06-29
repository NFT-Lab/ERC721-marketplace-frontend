import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { WalletButtonComponent } from './wallet-button/wallet-button.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ArtPageComponent } from './art-page/art-page.component';
import { CategoriesPageComponent } from './categories-page/categories-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon";
import { ForgePageComponent } from './forge-page/forge-page.component';

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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
