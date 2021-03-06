import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {
  public cardContent = 'Live images from the Goat Cam, refreshes every 5 minutes.';
  public imageUrl: string;
  interval: any;

  constructor() { }

  ngOnInit() {
    this.loadImage(this.getRandomInt(10000));
    this.interval = setInterval(() => { 
      this.loadImage(this.getRandomInt(10000));
  }, 240000);
  }

  loadImage(cacheBuster){
    this.imageUrl = 'https://api.goatpi.com/images/latestimage' + '?c=' + cacheBuster;
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

}
