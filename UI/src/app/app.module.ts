import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { HomeComponent } from './components/pages/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { DetailComponent } from './components/pages/detail/detail.component';
import { AddListingComponent } from './components/pages/add-listing/add-listing.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateListingComponent } from './components/pages/update-listing/update-listing.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
   DetailComponent,
   AddListingComponent,
   UpdateListingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
