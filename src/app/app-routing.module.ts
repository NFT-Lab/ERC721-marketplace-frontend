import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtPageComponent } from './Components/art-page/art-page.component';
import { CategoriesPageComponent } from './Components/categories-page/categories-page.component';
import { LandingPageComponent } from './Components/landing-page/landing-page.component';
import { ForgePageComponent } from './Components/forge-page/forge-page.component';
import { ArtDetailPageComponent } from './Components/art-detail-page/art-detail-page.component';
import { MyArtPageComponent } from './Components/my-art-page/my-art-page.component';
import { WalletProviderService } from './Services/WalletProviderService/wallet-provider.service';

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
    path: 'mint',
    component: ForgePageComponent,
    canActivate: [WalletProviderService],
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
    canActivate: [WalletProviderService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
