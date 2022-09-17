import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from '../config.service';
import { tap } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';
import { AdminAuthService } from '../admin-auth.service';

@Injectable({ providedIn: 'root' })
export class HowItWorksService {
  private serverUrl: string;
  private token: string;
  private _contents = new BehaviorSubject<any>(null);

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private adminAuthService: AdminAuthService
  ) {
    this.serverUrl = this.config.base_url();
    this.adminAuthService.admin.subscribe(auth => {
      if (auth) { this.token = auth.token; }
    });
  }

  get getSliders() {
    return this._contents;
  }

  howItWorks() {
    return this.http.get<any>(this.serverUrl + 'getRequest')
    .pipe(tap(resData => {
      if (resData) { this._contents.next(resData); }
    }));
  }

  howItWorkByAdmin() {
    return this.http.get<any>(
      this.serverUrl + 'how_it_work/get_how_it_work/' + this.token
    );
  }

  updateHowItWork(postData: string) {
    if (this.config.isDemo) {
      alert('Oops you can not update record on demo version.');
      return of(false);
    }
    return this.http.post<any>(
      this.serverUrl + 'how_it_work/edit_how_it_work/' + this.token,
      {data: postData}
    );
  }


}
