import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from '../config.service';
import { BehaviorSubject, Subject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AdminAuthService } from '../admin-auth.service';

@Injectable({ providedIn: 'root' })
export class EmailTemplateManagerService {
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

  getAll() {
    return this.http.get<any>(
      this.serverUrl + this.adminUrl + '/email_content_manager/' +
      this.token
    );
  }

   updateRecord(msgData: string) {
    if (this.config.isDemo) {
      alert('Oops you can not update record on demo version.');
      return of(false);
    }
    return this.http.post<any>(
      this.serverUrl + this.adminUrl + '/email_content_manager/update/' +
      this.token, { data: msgData }
    );
  }


  smsTemplate() {
    return this.http.get<any>(
      this.serverUrl + this.adminUrl + '/email_content_manager/smsTemplate/' +
      this.token
    );
  }

  updatesms(msgData: string) {
    if (this.config.isDemo) {
      alert('Oops you can not update record on demo version.');
      return of(false);
    }
    return this.http.post<any>(
      this.serverUrl + this.adminUrl + '/email_content_manager/updateSMS/' +
      this.token, { data: msgData }
    );
  }

}
