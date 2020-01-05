import {formatDate} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FetchDatesService {
  private readonly dirlistUrl = 'https://api.goatpi.com/images/datelist';

  constructor(private readonly http: HttpClient) { }

  getDates(): Observable<any|undefined> {
    return this.http.get<any>(this.dirlistUrl);
  }
}
