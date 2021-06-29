import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ArtPageComponent} from "./art-page/art-page.component";
import {CategoriesPageComponent} from "./categories-page/categories-page.component";
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {ForgePageComponent} from "./forge-page/forge-page.component";

const routes: Routes = [
  { path: 'art', component: ArtPageComponent },
  { path: 'categories', component: CategoriesPageComponent },
  { path: '', component: LandingPageComponent},
  { path: 'forge', component: ForgePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
