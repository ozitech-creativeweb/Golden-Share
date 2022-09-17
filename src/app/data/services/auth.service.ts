import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject, of } from 'rxjs';

import { ConfigService } from './config.service';
import { User } from '../model/user';
import { RoutingService } from '../helpers/routing.service';
import { StorageService } from '../helpers/storage.service';
import { VisitorService } from './visitor.service';
import { UserService } from './user/user.service';
import { AdminAuthService } from './admin-auth.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private serverUrl: string;
  private _user = new BehaviorSubject<any>(null);
  private token: string;

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private routingService: RoutingService,
    private storageService: StorageService,
    private visitorService: VisitorService,
    private adminAuthService: AdminAuthService,
  ) {
    this.serverUrl = this.config.base_url();
  }

  get user() {
    return this._user.asObservable();
  }

  signUp(formData: string) {
    return this.http
      .post<any>(
        this.serverUrl + 'register', formData
      );
  }

  provePayment(formData: string) {
    return this.http
      .post<any>(
        this.serverUrl + 'register/updatedPOP', formData
      );
  }


  login(email: string, password: string) {
    return this.http.post<any>(this.serverUrl + 'login',
      { user: email, password: password }
    );
  }

  socialLogin(userData: string) {
    return this.http.post<any>(
      this.serverUrl + 'login/socialLogin/', userData
    );
  }

  logout() {
    this._user.next(null);
    this.storageService.remove('userData');
    this.routingService.replace(['/']);
    // window.location.href = '/login';
  }

  autoLogin() {
    if (!this.storageService.hasKey('userData')) {
      return of(false);
    }
    const userData = JSON.parse(this.storageService.getString('userData'));

    if (userData) {
      this._user.next(userData);
      return of(true);
    }
    return of(false);
  }

  // Used within and outside
  storeAuthData(auth: any) {
    this.storageService.storeString('userData', JSON.stringify(auth));
    this.adminAuthService.storeAdminAuthData(null);
    this._user.next(auth);
  }

  authVerify(token) {
    return this.http.get<any>(
      this.serverUrl + 'user/profile/authVerify/' + token
    );
  }

  // verify email
  getData(username: string, code: string, role = null) {
    return this.http.get<any>(
      this.serverUrl + 'verification/' + username + '/' + code + '/' + role
    );
  }

  // password reset email
  resetPass(data: string) {
    return this.http.post<any>(
      this.serverUrl + 'forget_password/validate_email/', {data: data}
    );
  }

  verifyCode(code: string) {
    return this.http.get<any>(
      this.serverUrl + 'forget_password/verify_code/' + code
    );
  }

  changePassword(data: string) {
    return this.http.post<any>(
      this.serverUrl + 'forget_password/change_password/',
      {data: data}
    );
  }
}
