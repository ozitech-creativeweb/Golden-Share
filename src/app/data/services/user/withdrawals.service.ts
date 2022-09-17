import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from '../config.service';
import { AuthService } from '../auth.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WithdrawalsService {
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

  withdrawals(limit = 10, page = 0) {
    return this.http.get<any>(
      this.serverUrl + 'user/withdrawals/' + this.token + '/' + limit + '/' + page
    );
  }

  makeDonation(postData: any) {
    return this.http.post<any>(
      this.serverUrl + 'user/withdrawals/add/' + this.token,
      postData
    );
  }

  order(donationID) {
    return this.http.get<any>(
      this.serverUrl + 'user/withdrawals/order/' +
      this.token + '/' + donationID
    );
  }

  approvePOP(orderID) {
    return this.http.get<any>(
      this.serverUrl + 'user/withdrawals/approvePOP/' +
      this.token + '/' + orderID
    );
  }

  approveActivationPOP(userID) {
    return this.http.get<any>(
      this.serverUrl + 'user/withdrawals/approveActivationPOP/' +
      this.token + '/' + userID
    );
  }

  withdrawalRequest(limit = 10, page = 0) {
    return this.http.get<any>(
      this.serverUrl + 'user/withdrawals/withdrawalRequest/' +
      this.token + '/' + limit + '/' + page
    );
  }

  createRequest(donationID) {
    return this.http.get<any>(
      this.serverUrl + 'user/withdrawals/createRequest/' +
      this.token + '/' + donationID
    );
  }

  mergeOrder() {
    return this.http.get<any>(
      this.serverUrl + 'user/withdrawals/mergedOrderWithdrawal/' +
      this.token
    );
  }

  testWithdrawChecks() {
    return this.http.get<any>(
      this.serverUrl + 'user/withdrawals/testWithdrawChecks/' +
      this.token
    );
  }

}
