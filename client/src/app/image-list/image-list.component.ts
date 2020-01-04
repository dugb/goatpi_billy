import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';
import { FetchImageListService } from '../fetch-image-list.service';
import { ImageDatesComponent } from '../image-dates/image-dates.component';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css']
})
export class ImageListComponent implements OnInit {
  today = new Date();
  date = this.getDate(this.today);

  imageListData: Observable<
    Array<string> | undefined
  > = this.fetchImageList.getImageList(this.date);
  imageUrls: string[];

  private imageListSubscription?: Subscription;

  constructor(private readonly fetchImageList: FetchImageListService) {}

  ngOnInit() {
    this.getNewImages();
  }

  receiveDate($event) {
    this.date = $event;
    this.imageListData = this.fetchImageList.getImageList(this.date);
    this.imageUrls = [];
    this.getNewImages();
  }

  getNewImages() {
    this.imageListSubscription = this.imageListData.subscribe(items => {
      this.imageUrls = items.map(image => {
        return `https://api.goatpi.com/getimage?date=${this.date}&name=${image}`;
      });
    });
  }

  getDate(date) {
    let day = date.getDate().toString();
    if (day.length === 1) {
      day = `0${day}`;
    }

    let month = (date.getMonth() + 1).toString();
    if (month.length === 1) {
      month = `0${month}`;
    }

    const year = date.getFullYear().toString();

    return `${year}${month}${day}`;
  }
}
