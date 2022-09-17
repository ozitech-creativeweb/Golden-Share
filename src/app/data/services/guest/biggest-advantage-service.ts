import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from '../config.service';
import { tap } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';
import { AdminAuthService } from '../admin-auth.service';

@Injectable({ providedIn: 'root' })
export class BiggestAdvantageService {
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

  biggestAdvantage() {
    return this.http.get<any>(this.serverUrl + 'biggest_advantage')
    .pipe(tap(resData => {
      if (resData) { this._contents.next(resData); }
    }));
  }

  biggestAdvantageByAdmin() {
    return this.http.get<any>(
      this.serverUrl + 'biggest_advantage/get_big_advantage/' + this.token
    );
  }

  updateBiggestAdvantage(postData: string) {
    if (this.config.isDemo) {
      alert('Oops you can not update record on demo version.');
      return of(false);
    }
    return this.http.post<any>(
      this.serverUrl + 'biggest_advantage/edit_big_advantage/' + this.token,
      {data: postData}
    );
  }

}
