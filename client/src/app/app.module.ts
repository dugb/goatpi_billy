import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SlideshowModule } from 'ng-simple-slideshow';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
// import { ImagesComponent } from './images/images.component';
import { HttpClientModule } from '@angular/common/http';
import { ImageDatesComponent } from './image-dates/image-dates.component';
import { ImageListComponent } from './image-list/image-list.component';

@NgModule({
  declarations: [AppComponent, ImageDatesComponent, ImageListComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatCardModule,
    SlideshowModule,
    HttpClientModule
  ],
  providers: [ImageDatesComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
