import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtPageComponent } from './Components/art-page/art-page.component';
import { CategoriesPageComponent } from './Components/categories-page/categories-page.component';
import { LandingPageComponent } from './Components/landing-page/landing-page.component';
import { ForgePageComponent } from './Components/forge-page/forge-page.component';
import { ArtDetailPageComponent } from './Components/art-detail-page/art-detail-page.component';
import { WalletService } from './Services/WalletService/wallet.service';
import { MyArtPageComponent } from './Components/my-art-page/my-art-page.component';

const routes: Routes = [
  { path: 'art', component: ArtPageComponent, data: { animation: 'opacity' } },
  {
    path: 'categories',
    component: CategoriesPageComponent,
    data: { animation: 'opacity' },
  },
  {
    path: 'home',
    component: LandingPageComponent,
    data: { animation: 'opacity' },
  },
  {
    path: 'forge',
    component: ForgePageComponent,
    canActivate: [WalletService],
    data: { animation: 'opacity' },
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
    data: { animation: 'opacity' },
  },
  {
    path: 'art/:cid',
    component: ArtDetailPageComponent,
    data: { animation: 'opacity' },
  },
  {
    path: 'my-art',
    component: MyArtPageComponent,
    canActivate: [WalletService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
