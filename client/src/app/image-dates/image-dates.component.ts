import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Observable, Subscription, timer} from 'rxjs';
import {FetchDatesService} from '../fetch-dates.service';

@Component({
  selector: 'app-image-dates',
  templateUrl: './image-dates.component.html',
  styleUrls: ['./image-dates.component.css']
})
export class ImageDatesComponent implements OnInit {
  @Output() dateEvent = new EventEmitter<string>();
  datesData: Observable<any|undefined> = this.fetchDates.getDates();
  dates: any|undefined = undefined;
  date?: string;

  constructor(private readonly fetchDates: FetchDatesService) { }

  ngOnInit() {
  }

  onSelectDate(date){
    this.date = date;
    this.dateEvent.emit(this.date)
    console.log(this.date);
  }

}
