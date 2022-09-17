import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from '../config.service';
import { BehaviorSubject, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AdminAuthService } from '../admin-auth.service';

@Injectable({ providedIn: 'root' })
export class PackagesManagerService {
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

  getPackages() {
      return this.http.get<any>(
      this.serverUrl + '/packages/records/' + this.token
      );
  }

  addPackage( msgData: string) {
    if (this.config.isDemo) {
      alert('Oops! You can not update record on demo version.');
      return of(false);
    }
    return this.http.post<any>(
        this.serverUrl + '/packages/add/' + this.token, { data: msgData }
      );
  }


  updatePackage( msgData: string) {
    if (this.config.isDemo) {
      alert('Oops! You can not update record on demo version.');
      return of(false);
    }
    return this.http.post<any>(
        this.serverUrl + 'packages/update/' +
        this.token, { data: msgData }
      );
  }

  deletePackage(actID: number) {
    if (this.config.isDemo) {
      alert('Oops! You can not update record on demo version.');
      return of(false);
    }
    return this.http.get<any>(
        this.serverUrl + '/packages/delete/' +
        this.token + '/' + actID
    );
  }

}
