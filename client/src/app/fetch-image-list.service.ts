import {formatDate} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, tap, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FetchImageListService {
  private readonly dirlistUrl = 'https://api.goatpi.com/images/imagelist?date=';

  constructor(private readonly http: HttpClient) { }

  getImageList(date: string): Observable<any|undefined> {
    const imageList = this.http.get<any>(this.dirlistUrl + date);
    return imageList;
      // .pipe(
      //   map(image => `https://api.goatpi.com/images/getimage?date=${date}&name=${image}`)
      // );
  }
}
