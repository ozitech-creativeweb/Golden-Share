import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from '../config.service';
import { BehaviorSubject, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AdminAuthService } from '../admin-auth.service';

@Injectable({ providedIn: 'root' })
export class WithdrawalManagerService {
  private serverUrl: string;
  private adminUrl: string;
  private token: string;
  private _activities = new BehaviorSubject<any>(null);
  private _activity = new BehaviorSubject<any>(null);

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
 
  get activities() {
    return this._activities.asObservable();
  }

  // get job() {
  //   return this._activity.asObservable();
  // }

  getWithdrawals(status, limit = 10, page = 1) {
      return this.http.get<any>(
      this.serverUrl + this.adminUrl + '/withdrawal_manager/' +
      this.token + '/' + status + '/' + limit + '/' + page
      );
  }

  userWithdrawals(loginID, limit = 10, page = 1, role = 'all') {
    return this.http.get<any>(
    this.serverUrl + this.adminUrl + '/withdrawal_manager/userWithdrawals/' +
    this.token + '/' + loginID + '/' + limit + '/' + page + '/' + role
    );
  }

  withdrawalOrder(actID: number) {
      return this.http.get<any>(
          this.serverUrl + this.adminUrl + '/withdrawal_manager/order/' +
          this.token + '/' + actID
      ).pipe(tap(resData => {
          if (resData) {
              this._activity.next(resData);
          }
      }));
  }

  addUser(msgData: string) {
    return this.http.post<any>(
      this.serverUrl + this.adminUrl + '/withdrawal_manager/add/' +
      this.token, { data: msgData }
    );
  }

  deleteWithdrawal(withID: number) {
    if (this.config.isDemo) {
      alert('Oops you can not update record on demo version.');
      return of(false);
    }
    return this.http.get<any>(
        this.serverUrl + this.adminUrl + '/withdrawal_manager/delete/' +
        this.token + '/' + withID
    );
  }


  onOffAction(withID: number, role: any) {
    return this.http.get<any>(
        this.serverUrl + this.adminUrl + '/withdrawal_manager/switchSingle/' +
        this.token + '/' + withID + '/' + role
    );
  }


  approveWithdrawal(withID: number) {
    return this.http.get<any>(
        this.serverUrl + this.adminUrl + '/withdrawal_manager/approvePOP/' +
        this.token + '/' + withID
    );
  }


  switchList(action) {
    return this.http.get<any>(
      this.serverUrl + this.adminUrl + '/withdrawal_manager/switchAuction/' +
      this.token + '/' + action
    );
  }


  search(keywords) {
    return this.http.get<any>(
      this.serverUrl + this.adminUrl + '/withdrawal_manager/search/' +
      this.token + '/' + keywords
    );
  }

}
