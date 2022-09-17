import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from '../config.service';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AdminAuthService } from '../admin-auth.service';

@Injectable({ providedIn: 'root' })
export class OrderManagerService {
  private serverUrl: string;
  private adminUrl: string;
  private token: string;
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

  getOrders(role = 'all', limit = 10, page = 1) {
    return this.http.get<any>(
      this.serverUrl + this.adminUrl + '/order_manager/' +
      this.token + '/' + role + '/' + limit + '/' + page
    );
  }

  getOrder(orderNumber: string) {
    return this.http.get<any>(
      this.serverUrl + this.adminUrl + '/order_manager/single/' +
      this.token + '/' + orderNumber
    );
  }

  update(orderNumber: string, action, role) {
    return this.http.get<any>(
      this.serverUrl + this.adminUrl + '/order_manager/update/' +
      this.token + '/' + orderNumber + '/' + action + '/' + role
    );
  }

}
