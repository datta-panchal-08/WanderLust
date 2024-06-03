import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { DetailComponent } from './components/pages/detail/detail.component';
import { AddListingComponent } from './components/pages/add-listing/add-listing.component';
import { UpdateListingComponent } from './components/pages/update-listing/update-listing.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  { path: 'listing/:id', component: DetailComponent },
  {path:"listings/new",component:AddListingComponent},
  {path:"listings/:id/edit",component:UpdateListingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
