import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from '../config.service';
import { BehaviorSubject, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AdminAuthService } from '../admin-auth.service';

@Injectable({ providedIn: 'root' })
export class NewsManagerService {
  private serverUrl: string;
  private adminUrl: string;
  private token: string;
  private _activities = new BehaviorSubject<any>(null);
  private _activity = new BehaviorSubject<any>(null);

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private adminAuthService: AdminAuthService
  ) {
    this.serverUrl = this.config.base_url();
    this.adminUrl = this.config.adminURL;
    this.adminAuthService.admin.subscribe(auth => {
      if (auth) { this.token = auth.token; }
    });
  }
 
  get activities() {
    return this._activities.asObservable();
  }

  // get job() {
  //   return this._activity.asObservable();
  // }

  getNews(limit = 10, page = 1, role = 'all') {
      return this.http.get<any>(
      this.serverUrl + this.adminUrl + '/news_manager/' +
      this.token + '/' + limit + '/' + page + '/' + role
      );
  }

  singleNews(actID: number) {
      return this.http.get<any>(
          this.serverUrl + this.adminUrl + '/news_manager/single/' +
          this.token + '/' + actID
      ).pipe(tap(resData => {
          if (resData) {
              this._activity.next(resData);
          }
      }));
  }

  createNews(msgData: string) {
    if (this.config.isDemo) {
      alert('Oops you can not update record on demo version.');
      return of(false);
    }
    return this.http.post<any>(
      this.serverUrl + this.adminUrl + '/news_manager/add/' +
      this.token, { data: msgData }
    );
  }

  updateNews( msgData: string) {
    if (this.config.isDemo) {
      alert('Oops you can not update record on demo version.');
      return of(false);
    }
    return this.http
      .post<any>(
        this.serverUrl + this.adminUrl + '/news_manager/updateActivity/' +
        this.token, { data: msgData }
      );
  }

  deleteNews(actID: number) {
    if (this.config.isDemo) {
      alert('Oops you can not update record on demo version.');
      return of(false);
    }
    return this.http.get<any>(
        this.serverUrl + this.adminUrl + '/news_manager/delete/' +
        this.token + '/' + actID
    );
  }

}
