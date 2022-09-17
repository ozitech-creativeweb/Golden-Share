import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from '../config.service';
import { AuthService } from '../auth.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DonationsService {
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

  donations(limit = 10, page = 0) {
    return this.http.get<any>(
      this.serverUrl + 'user/donations/' + this.token + '/' + limit + '/' + page
    );
  }

  makeDonation(postData: any) {
    return this.http.post<any>(
      this.serverUrl + 'user/donations/add/' + this.token,
      postData
    );
  }

  order(donationID) {
    return this.http.get<any>(
      this.serverUrl + 'user/donations/order/' +
      this.token + '/' + donationID
    );
  }
  mergeOrder() {
    return this.http.get<any>(
      this.serverUrl + 'user/donations/mergedOrder/' +
      this.token
    );
  }

  pop(postData) {
    return this.http.post<any>(
      this.serverUrl + 'user/donations/pop/' + this.token,
      postData
    );
  }

  packages() {
    return this.http.get<any>(
      this.serverUrl + 'packages/' + this.token
    );
  }

}
