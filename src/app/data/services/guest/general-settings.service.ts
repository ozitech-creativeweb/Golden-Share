import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from '../config.service';
import { tap, delay } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';
import { AdminAuthService } from '../admin-auth.service';

@Injectable({ providedIn: 'root' })
export class GeneralSettingsService {
  private serverUrl: string;
  private token: string;
  private _contents = new BehaviorSubject<any>(null);
  private _configuration = new BehaviorSubject<any>(null);

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

  get getSettings() {
    return this._contents;
  }

  get getConfiguration() {
    return this._configuration;
  }

  settings() {
    return this.http.get<any>(this.serverUrl + 'getRequest')
    .pipe(tap(resData => {
        if (resData) { this._contents.next(resData); }
    }));
  }

  updateSettings(postData: string) {
    if (this.config.isDemo) {
      alert('Oops you can not update record on demo version.');
      return of(false);
    }
    return this.http.post<any>(
      this.serverUrl + 'general_settings/update/' + this.token,
      {data: postData}
    );
  }

  updateSocial(postData: string) {
    if (this.config.isDemo) {
      alert('Oops you can not update record on demo version.');
      return of(false);
    }
    return this.http.post<any>(
      this.serverUrl + 'general_settings/update_social/' + this.token,
      {data: postData}
    );
  }

  bank_info() {
    return this.http.get<any>(
      this.serverUrl + 'general_settings/bank_details'
    )
    .pipe(tap(resData => {
        if (resData) { this._contents.next(resData); }
    }));
  }


  configuration() {
    return this.http.get<any>(
      this.serverUrl + 'general_settings/configuration'
    )
    .pipe(tap(resData => {
        if (resData) { this._configuration.next(resData); }
    }));
  }

}
