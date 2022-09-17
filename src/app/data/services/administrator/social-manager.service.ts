import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from '../config.service';
import { BehaviorSubject, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AdminAuthService } from '../admin-auth.service';

@Injectable({ providedIn: 'root' })
export class SocialManagerService {
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


  getAllSocialSettings() {
      return this.http.get<any>(
      this.serverUrl + this.adminUrl + '/social_settings_manager/' +
      this.token
      )
      .pipe(
      tap(resData => {
          if (resData) {
          this._activities.next(resData);
          }
      }));
  }

  single(actID: number) {
      return this.http.get<any>(
          this.serverUrl + this.adminUrl + '/social_settings_manager/single/' +
          this.token + '/' + actID
      ).pipe(tap(resData => {
          if (resData) {
              this._activity.next(resData);
          }
      }));
  }

  addSocialSettings( msgData: string) {
    if (this.config.isDemo) {
      alert('Oops you can not update record on demo version.');
      return of(false);
    }
    return this.http.post<any>(
        this.serverUrl + this.adminUrl + '/social_settings_manager/addSocialSettings/' +
        this.token, { data: msgData }
      );
  }

  deleteSocial(socialID: number) {
    if (this.config.isDemo) {
      alert('Oops you can not update record on demo version.');
      return of(false);
    }
    return this.http.get<any>(
        this.serverUrl + this.adminUrl + '/social_settings_manager/deleteSocialSettings/' +
        this.token + '/' + socialID
    );
  }

}
