import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from '../config.service';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AdminAuthService } from '../admin-auth.service';

@Injectable({ providedIn: 'root' })
export class DonationManagerService {
  private serverUrl: string;
  private adminUrl: string;
  private token: string;
  private _activities = new BehaviorSubject<any>(null);
  private _activity = new BehaviorSubject<any>(null);
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

  setStatus(status: string) {
    this.subject.next(status);
  }

  get getStatus(): Observable<any> {
    return this.subject.asObservable();
  }

  get activities() {
    return this._activities.asObservable();
  }

  getDonations(limit = 10, page = 1) {
      return this.http.get<any>(
      this.serverUrl + this.adminUrl + '/donation_manager/' +
      this.token + '/' + limit + '/' + page
      );
  }
  userDonations(loginID, limit = 10, page = 1) {
      return this.http.get<any>(
      this.serverUrl + this.adminUrl + '/donation_manager/userDonations/' +
      this.token + '/' + loginID + '/' + limit + '/' + page
      );
  }

  donationOrder(actID: number) {
      return this.http.get<any>(
          this.serverUrl + this.adminUrl + '/donation_manager/order/' +
          this.token + '/' + actID
      ).pipe(tap(resData => {
          if (resData) {
              this._activity.next(resData);
          }
      }));
  }

  donationForMerging() {
    return this.http.get<any>(
      this.serverUrl + this.adminUrl + '/donation_manager/manualMergingList/' +
      this.token
    );
  }

  createMerging(msgData: string) {
    return this.http.post<any>(
      this.serverUrl + this.adminUrl + '/donation_manager/manualMerging/' +
      this.token, { data: msgData }
    );
  }

  approvePOP(popID: number) {
    return this.http.get<any>(
        this.serverUrl + this.adminUrl + '/donation_manager/approvePOP/' +
        this.token + '/' + popID
    );
  }

  deleteDonation(donateID: number) {
    if (this.config.isDemo) {
      alert('Oops you can not update record on demo version.');
      return of(false);
    }
    return this.http.get<any>(
        this.serverUrl + this.adminUrl + '/donation_manager/delete/' +
        this.token + '/' + donateID
    );
  }

  deleteOrder(id: number) {
    if (this.config.isDemo) {
      alert('Oops you can not update record on demo version.');
      return of(false);
    }
    return this.http.get<any>(
        this.serverUrl + this.adminUrl + '/donation_manager/deleteOrder/' +
        this.token + '/' + id
    );
  }

  mergedOrders(role = 'all', limit = 10, page = 1) {
    return this.http.get<any>(
      this.serverUrl + this.adminUrl + '/donation_manager/mergedOrders/' +
      this.token + '/' + role + '/' + limit + '/' + page
    );
  }

  mergedOrder(id) {
    return this.http.get<any>(
      this.serverUrl + this.adminUrl + '/donation_manager/mergedOrder/' +
      this.token + '/' + id
    );
  }


  search(keywords: number) {
    return this.http.get<any>(
      this.serverUrl + this.adminUrl + '/donation_manager/search/' +
      this.token + '/' + keywords
    );
  }



}