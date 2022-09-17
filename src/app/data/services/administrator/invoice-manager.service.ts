import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from '../config.service';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AdminAuthService } from '../admin-auth.service';

@Injectable({ providedIn: 'root' })
export class InvoiceManagerService {
  private serverUrl: string;
  private adminUrl: string;
  private token: string;

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

  /* getTrans(loginID: number) {
    return this.http.get<any>(
      this.serverUrl + this.adminUrl + '/invoice_manager/' +
      this.token + '/' + loginID
    );
  } */

  addORremoveFunds(data: string, loginID: number) {
    return this.http.post<any>(
      this.serverUrl + this.adminUrl +
      '/invoice_manager/addORremoveFunds/'
      + this.token + '/' + loginID, {data: data}
    );
  }

}
