import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SlideshowModule } from 'ng-simple-slideshow';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { ImagesComponent } from './images/images.component';
import { HttpClientModule } from '@angular/common/http';
import { ImageDatesComponent } from './image-dates/image-dates.component';
import { ImageListComponent } from './image-list/image-list.component';
import { GoatshowComponent } from './goatshow/goatshow.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';

const appRoutes: Routes = [
  {
    path: 'goatcam',
    component: ImagesComponent,
    data: { title: 'Goat Cam' }
  },
  { path: '',
    redirectTo: '/goatcam',
    pathMatch: 'full'
  },
  {
    path: 'goatshow',
    component: ImageListComponent,
    data: {title: 'Goat Show'}
  },
];

@NgModule({
  declarations: [
    AppComponent,
    ImagesComponent,
    ImageDatesComponent,
    ImageListComponent,
    GoatshowComponent,
    HeaderComponent,
    SidenavListComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    SlideshowModule,
    HttpClientModule
  ],
  providers: [ImageDatesComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
