import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FeedData } from './home.component';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class FeedService {

  constructor(
    private http: HttpClient
  ) { }

  getFeeds(): Observable<FeedData[]> {
    return this.http
      .get<any>(environment.endpoint.feed)
      .pipe(
        map(feeds => feeds as FeedData[])
      );
  }
}
