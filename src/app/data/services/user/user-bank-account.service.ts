import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from '../config.service';
import { delay, tap } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserBankAccountService {
  private serverUrl: string;
  private token: string;
  private _bank = new BehaviorSubject<any>(null);

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

  get getBank() {
    return this._bank;
  }

  bankAccounts() {
    return this.http.get<any>(
      this.serverUrl + 'user/bank_info/' + this.token
    ).pipe(tap(resData => {
      if (resData) { this._bank.next(resData); }
    }));
  }

  uplineInfo() {
    return this.http.get<any>(
      this.serverUrl + 'user/profile/uplineInfo/' + this.token
    );
  }

  createBank(postData) {
    return this.http.post<any>(
        this.serverUrl + 'user/bank_info/createBankAccount/' + this.token,
        { data: postData }
    );
  }

}
