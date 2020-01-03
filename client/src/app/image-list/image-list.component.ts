import { Component, OnInit } from '@angular/core';
import {Observable, Subscription, timer} from 'rxjs';
import {FetchImageListService} from '../fetch-image-list.service';
import {ImageDatesComponent} from '../image-dates/image-dates.component';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {
  date = '20200103';
  imageListData: Observable<Array<string>|undefined> = this.fetchImageList.getImageList(this.date);
  imageUrls: string[];

  private imageListSubscription?: Subscription;

  constructor(private readonly fetchImageList: FetchImageListService, ) { }

  ngOnInit() {
    this.getNewImages()
  }

  receiveDate($event) {
    console.log('ping: ', $event);
    this.date = $event;
    this.imageListData = this.fetchImageList.getImageList(this.date);
    this.imageUrls = [];
    this.getNewImages()
  }

  getNewImages() {
    this.imageListSubscription = this.imageListData.subscribe((items) => {
      this.imageUrls = items.map((image) =>{
        return `https://api.goatpi.com/getimage?date=${this.date}&name=${image}`
      });
    });
  }

}
