import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, delay } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

import { ConfigService } from '../config.service';
import { UserRatings } from '../../model/user-ratings';
import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class UserRatingsService {
  private serverUrl: string;
  private token: string;
  private _ratings = new BehaviorSubject<UserRatings>(null);
  private _gdgfdfggf = new BehaviorSubject<any>(null);

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private authService: AuthService,
  ) {
    this.serverUrl = this.config.base_url();
    this.authService.user.subscribe(auth => {
      if (auth) { this.token = auth.token; }
    });
  }

  // Get freelancer Ratings by login_id
  getRatings(loginID: number) {
    return this.http.get<UserRatings>(
      this.serverUrl + 'freelancer/ratings/' + loginID
    )
    .pipe(
      tap(resData => {
        if (resData) {
          this._ratings.next(resData);
        }
    }));
  }

  // post rating form
  post(postData) {
    return this.http
      .post<any>(
        this.serverUrl + 'user/rating/post/' + this.token,
        { data: postData }
      )
      .pipe(delay(1000));
  }

  // get rating on single order
  getRatingOnOrder(orderID: number) {
    return this.http.get<UserRatings>(
      this.serverUrl + 'user/rating/onOrder/' + this.token + '/' + orderID
    )
    .pipe(delay(1000));
  }

}
