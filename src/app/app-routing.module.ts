import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtPageComponent } from './Components/art-page/art-page.component';
import { CategoriesPageComponent } from './Components/categories-page/categories-page.component';
import { LandingPageComponent } from './Components/landing-page/landing-page.component';
import { ForgePageComponent } from './Components/forge-page/forge-page.component';
import { ArtDetailPageComponent } from './Components/art-page/art-detail-page/art-detail-page.component';
import { WalletService } from './Services/WalletService/wallet.service';

const routes: Routes = [
  { path: 'art', component: ArtPageComponent },
  { path: 'categories', component: CategoriesPageComponent },
  { path: 'home', component: LandingPageComponent },
  {
    path: 'forge',
    component: ForgePageComponent,
    canActivate: [WalletService],
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'art/:cid', component: ArtDetailPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
