import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';

import { ConfigService } from './config.service';
import { RoutingService } from '../helpers/routing.service';
import { StorageService } from '../helpers/storage.service';

@Injectable({ providedIn: 'root' })
export class AdminAuthService {
  private serverUrl: string;
  private _admin = new BehaviorSubject<any>(null);

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private routingService: RoutingService,
    private storageService: StorageService
  ) {
    this.serverUrl = this.config.base_url();
  }

  get admin() {
    return this._admin.asObservable();
  }


  login(email: string, password: string) {
    if (email && password) {
      return this.http.post<any>(
        this.serverUrl + 'administrator/login/authenticate',
        { admin: email, password: password }
      );
    }
  }

  logout() {
    this._admin.next(null);
    this.storageService.remove('adminData');
    this.routingService.replace([
      '/' + this.config.adminURL + '/admin-login'
    ]);
  }

  autoLogin() {
    if (!this.storageService.hasKey('adminData')) {
      return of(false);
    }
    const adminData = JSON.parse(this.storageService.getString('adminData') );

    if (adminData) {
      // this.checkOnlineStatus(adminData);
      this._admin.next(adminData);
      return of(true);
    }
    return of(false);
  }

  // Used within and outside
  storeAdminAuthData(adminAuth: any) {
    this.storageService.storeString('adminData', JSON.stringify(adminAuth));
    this._admin.next(adminAuth);
  }
}
