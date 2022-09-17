import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from '../config.service';
import { delay } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private serverUrl: string;
  private token: string;

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private authService: AuthService
  ) {
    this.serverUrl = this.config.base_url();
    this.authService.user.subscribe(auth => {
      if (auth) { this.token = auth.token; }
    });
  }

  // Update personal information
  personal(postData) {
    return this.http
      .post<any>(
        this.serverUrl + 'user/profile/personal/' + this.token,
        { data: postData }
      );
  }

  // Change password
  changePassword(postData) {
    return this.http
      .post<any>(
        this.serverUrl + 'user/profile/change_password/' + this.token,
        { data: postData }
      );
  }

  // update profile title and category
  updateTitle(postData) {
    return this.http
      .post<any>(
        this.serverUrl + 'user/profile/update_title/' + this.token,
        { data: postData }
      );
  }

  // update service rate ->PENDING
  updateRate(postData) {
    return this.http
      .post<any>(
        this.serverUrl + 'user/profile/update_rate/' + this.token,
        { data: postData }
      );
  }

  // Update skills
  updateSkills(postData) {
    return this.http
      .post<any>(
        this.serverUrl + 'user/profile/update_skills/' + this.token,
        { data: postData }
      );
  }

  // Update skills
  updateOverview(postData) {
    return this.http
      .post<any>(
        this.serverUrl + 'user/profile/update_overview/' + this.token,
        { data: postData }
      );
  }

  // Upload any file
  uploadPhoto(
    fileData: any, folder: string, name: string
    ) {
    return this.http
      .post<any>(
        this.serverUrl + 'user/profile/photo_update/'
        + this.token + '/' + folder + '/' + name, fileData,
        {
          reportProgress: true,
          observe: 'events',
        }
      ). pipe(delay(1000));
  }

   //
   updateOnlineStatus() {
    return this.http
      .get<any>(
        this.serverUrl + 'user/profile/onlineStatus/' + this.token
      );
  }

}
