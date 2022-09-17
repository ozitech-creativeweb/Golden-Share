import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from '../config.service';
import { BehaviorSubject, Subject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AdminAuthService } from '../admin-auth.service';

@Injectable({ providedIn: 'root' })
export class UserManagerService {
  private serverUrl: string;
  private adminUrl: string;
  private token: string;
  private _users = new BehaviorSubject<any>(null);
  private _user = new BehaviorSubject<any>(null);
  private subject = new Subject<any>();

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

  get customer() {
    return this._user;
  }

  setStatus(status: string) {
    this.subject.next(status);
  }

  get getStatus(): Observable<any> {
    return this.subject.asObservable();
  }

  getCustomers(role = 'all', limit = 10, page = 1) {
    return this.http.get<any>(
      this.serverUrl + this.adminUrl + '/user_manager/' +
      this.token + '/' + role + '/' + limit + '/' + page
    );
  }

  getCustomer(loginID: string) {
    return this.http.get<any>(
      this.serverUrl + this.adminUrl + '/user_manager/single/' +
      this.token + '/' + loginID
    )
    .pipe(
      tap(resData => {
        if (resData) {
          this._user.next(resData);
        }
    }));
  }

  accountAction(loginID: number, action: string) {
    if (this.config.isDemo) {
      alert('Oops you can not update record on demo version.');
      return of(false);
    }
    return this.http.get<any>(
      this.serverUrl + this.adminUrl + '/user_manager/accountActions/' +
      this.token + '/' + loginID + '/' + action
    );
  }

  updateUser(msgData: string) {
    if (this.config.isDemo) {
      alert('Oops you can not update record on demo version.');
      return of(false);
    }
    return this.http.post<any>(
      this.serverUrl + this.adminUrl + '/user_manager/updateUser/' +
      this.token, { data: msgData }
    );
  }

  loginAsUser(username: string) {
    return this.http.get<any>(
      this.serverUrl + this.adminUrl + '/user_manager/loginAsUser/' +
      this.token + '/' + username
    );
  }

  bankDetails(loginID) {
    return this.http.get<any>(
      this.serverUrl + this.adminUrl + '/user_manager/bank_detail/' +
      this.token + '/' + loginID
    );
  }

  updateBankDetails(msgData: string) {
    if (this.config.isDemo) {
      alert('Oops you can not update record on demo version.');
      return of(false);
    }
    return this.http.post<any>(
      this.serverUrl + this.adminUrl + '/user_manager/update_bank_detail/' +
      this.token, { data: msgData }
    );
  }


  popAction(loginID: number, action: any) {
    return this.http.get<any>(
      this.serverUrl + this.adminUrl + '/user_manager/provePaymentActions/' +
      this.token + '/' + loginID + '/' + action
    );
  }

  search(keywords) {
    return this.http.get<any>(
      this.serverUrl + this.adminUrl + '/user_manager/search/' +
      this.token + '/' + keywords
    );
  }

  activatedUser(limit = 10, page = 1) {
    return this.http.get<any>(
      this.serverUrl + this.adminUrl + '/user_manager/activated/' +
      this.token + '/' + limit + '/' + page
    );
  }

  referralTree(loginID: number) {
    return this.http.get<any>(
      this.serverUrl + this.adminUrl + '/user_manager/referralTree/' +
      this.token + '/' + loginID
    );
  }

}
