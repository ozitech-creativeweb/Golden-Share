import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from '../config.service';

@Injectable({ providedIn: 'root' })
export class UserVerificationService {
  private serverUrl: string;

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {
    this.serverUrl = this.config.base_url();
  }

  // verify email
  getData(username: string, code: string, role = null) {
    return this.http.get<any>(
        this.serverUrl + 'verification/' + username + '/' + code + '/' + role
    );
  }

  // password reset email
  resetPass(postData: string) {
    return this.http
      .post<any>(
        this.serverUrl + 'forget_password/validate_email/', {email: postData}
      );
  }

  verifyCode(postData: string) {
    return this.http
      .post<any>(
        this.serverUrl + 'forget_password/verify_code/', {code: postData}
      );
  }

  changePassword(username: string, password: string) {
    return this.http
      .post<any>(
        this.serverUrl + 'forget_password/change_password/',
        {username: username, password: password}
      );
  }
}
