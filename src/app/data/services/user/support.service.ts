import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from '../config.service';
import { AuthService } from '../auth.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SupportService {
  private serverUrl: string;
  private token: string;
  private _userData = new BehaviorSubject<any>(null);

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

  sendMessage(postData: any) {
    return this.http.post<any>(
      this.serverUrl + 'user/supports/add/' + this.token,
      {data: postData}
    );
  }
  supports(limit = 10, page = 1) {
    return this.http.get<any>(
      this.serverUrl + 'user/supports/'
      + this.token + '/' + limit + '/' + page
    );
  }

  supportSingle(suppID: number) {
    return this.http.get<any>(
        this.serverUrl + 'user/supports/single/' +
        this.token + '/' + suppID
    );
  }

}
