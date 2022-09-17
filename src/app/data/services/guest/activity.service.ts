import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from '../config.service';
import { tap, delay } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { AdminAuthService } from '../admin-auth.service';

@Injectable({ providedIn: 'root' })
export class ActivityService {
  private serverUrl: string;
  private token: string;
  private _contents = new BehaviorSubject<any>(null);
  // getTestimonies: any;

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private adminAuthService: AdminAuthService
  ) {
    this.serverUrl = this.config.base_url();
    this.adminAuthService.admin.subscribe(auth => {
      if (auth) { this.token = auth.token; }
    });
  }

  get getActivities() {
    return this._contents;
  }

  activity() {
    return this.http.get<any>(this.serverUrl + 'activities')
    .pipe(tap(resData => {
        if (resData) { this._contents.next(resData); }
    }));
  }


  getActivity(limit = 10, page = 0) {
    return this.http.get<any>(
        this.serverUrl + 'activities/' + limit + '/' + page
    )
    .pipe(tap(resData => {
        if (resData) { this._contents.next(resData); }
    }));
  }

  getActSection() {
    return this.http.get<any>(this.serverUrl + 'activitiesSecUpdate')
    .pipe(tap(resData => {
      if (resData) { this._contents.next(resData); }
    }));
  }


  addActivity(postData: string) {
    return this.http.post<any>(
      this.serverUrl + 'activities/createActivity/' + this.token,
      postData
    );
  }

  updateActivity(postData: string) {
    return this.http.post<any>(
      this.serverUrl + 'activities/updateActivity/' + this.token,
      {data: postData}
    );
  }

  updateActivitySection(postData: string) {
    return this.http.post<any>(
      this.serverUrl + 'activitiesSecUpdate/activitySection/' + this.token,
      postData
    );
  }

}
