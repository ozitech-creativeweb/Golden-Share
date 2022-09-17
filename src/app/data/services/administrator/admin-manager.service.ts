import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from '../config.service';
import { BehaviorSubject, Subject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AdminAuthService } from '../admin-auth.service';

@Injectable({ providedIn: 'root' })
export class AdminManagerService {
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

  getAll(limit = 10, page = 1) {
    return this.http.get<any>(
      this.serverUrl + this.adminUrl + '/admin_manager/' +
      this.token + '/' + limit + '/' + page
    );
  }

  getLogin_activities(limit = 10, page = 1) {
    return this.http.get<any>(
      this.serverUrl + this.adminUrl + '/admin_manager/login_activities/' +
      this.token + '/' + limit + '/' + page
    );
  }

  dashboard(limit = 10, page = 1) {
    return this.http.get<any>(
      this.serverUrl + this.adminUrl + '/admin_manager/dashboard/' +
      this.token + '/' + limit + '/' + page
    );
  }

  getSingle(admID: string) {
    return this.http.get<any>(
      this.serverUrl + this.adminUrl + '/admin_manager/single/' +
      this.token + '/' + admID
    );
  }

  createAdmin(msgData: string) {
    if (this.config.isDemo) {
      alert('Oops you can not update record on demo version.');
      return of(false);
    }
    return this.http.post<any>(
      this.serverUrl + this.adminUrl + '/admin_manager/create_record/' +
      this.token, { data: msgData }
    );
  }

  updateRecord(msgData: string, role: string) {
    if (this.config.isDemo) {
      alert('Oops you can not update record on demo version.');
      return of(false);
    }
    return this.http.post<any>(
      this.serverUrl + this.adminUrl + '/admin_manager/update_record/' +
      this.token + '/' + role, { data: msgData }
    );
  }

  changePassword(msgData: string) {
    if (this.config.isDemo) {
      alert('Oops you can not update record on demo version.');
      return of(false);
    }
    return this.http.post<any>(
      this.serverUrl + this.adminUrl + '/admin_manager/change_password/' +
      this.token, { data: msgData }
    );
  }


  delete(admID) {
    if (this.config.isDemo) {
      alert('Oops you can not update record on demo version.');
      return of(false);
    }
    return this.http.get<any>(
      this.serverUrl + this.adminUrl + '/admin_manager/delete/' +
      this.token + '/' + admID
    );
  }

}
