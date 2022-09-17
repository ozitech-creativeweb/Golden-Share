import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from '../config.service';
import { AuthService } from '../auth.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private serverUrl: string;
  private token: string;
  private _userData = new BehaviorSubject<any>(null);

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

  updateAccount(postData: any) {
    return this.http.post<any>(
      this.serverUrl + 'user/profile/update/' + this.token,
      postData
    );
  }

  resendLink(postData: any) {
    return this.http.post<any>(
      this.serverUrl + 'user/profile/resend_link/' + this.token,
      postData
    );
  }

  resendSMS() {
    return this.http.get<any>(
      this.serverUrl + 'user/profile/resendSMS/' + this.token
    );
  }

  changeEmail(postData: any) {
    return this.http.post<any>(
      this.serverUrl + 'user/profile/change_email/' + this.token,
      postData
    );
  }

  changePhone(postData: any) {
    return this.http.post<any>(
      this.serverUrl + 'user/profile/changePhone/' + this.token,
      postData
    );
  }

  proveOfPayment(postData: any) {
    return this.http.post<any>(
      this.serverUrl + 'user/profile/prove_of_payment/' + this.token,
      postData
    );
  }

  chnage_password(postData: any) {
    return this.http.post<any>(
      this.serverUrl + 'user/profile/change_password/' + this.token,
      {data: postData}
    );
  }

  dashboard(limit = 10, page = 1) {
    return this.http.get<any>(
      this.serverUrl + 'user/profile/' +
      this.token + '/' + limit + '/' + page
    );
  } 

  referrals(limit = 10, page = 1) {
    return this.http.get<any>(
      this.serverUrl + 'user/my_referrals/'
      + this.token + '/' + limit + '/' + page
    );
  }

  withdraw(amount) {
    return this.http.get<any>(
      this.serverUrl + 'user/my_referrals/requestWithdrawal/'
      + this.token + '/' + amount
    );
  }
  news(limit = 10, page = 1) {
    return this.http.get<any>(
      this.serverUrl + 'user/news/'
      + this.token + '/' + limit + '/' + page
    );
  }
  singleNews(newsID) {
    return this.http.get<any>(
      this.serverUrl + 'user/news/single/'
      + this.token + '/' + newsID
    );
  }
  unreadNews() {
    return this.http.get<any>(
      this.serverUrl + 'user/news/unread/'
      + this.token
    );
  }


  refInfo() {
    return this.http.get<any>(
      this.serverUrl + 'user/profile/'
      + this.token
    );
  }
}
