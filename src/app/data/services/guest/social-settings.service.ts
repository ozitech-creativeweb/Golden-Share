import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from '../config.service';
import { tap, delay } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';
import { AdminAuthService } from '../admin-auth.service';

@Injectable({ providedIn: 'root' })
export class SocialSettingsService {
  private serverUrl: string;
  private token: string;
  private _contents = new BehaviorSubject<any>(null);

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

  get getSocial_settings() {
    return this._contents;
  }

  settings() {
    return this.http.get<any>(this.serverUrl + 'getRequest')
    .pipe(tap(resData => {
        if (resData) { this._contents.next(resData); }
    }));
  }

  addSocialMedia(postData: string) {
    if (this.config.isDemo) {
      alert('Oops you can not update record on demo version.');
      return of(false);
    }
    return this.http.post<any>(
      this.serverUrl + 'social_settings/addSocial/' + this.token,
      postData
    );
  }

  deleteSocialMedia(mediaID: number) {
    return this.http.get<any>(
        this.serverUrl + 'social_settings/deleteSocialSet/' +
        this.token + '/' + mediaID
    );
  }

//   updateSocial(postData: string) {
//     return this.http.post<any>(
//       this.serverUrl + 'social_settings/update_social/' + this.token,
//       {data: postData}
//     );
//   }


}
