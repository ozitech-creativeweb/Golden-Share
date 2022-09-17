import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from '../config.service';
import { tap } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';
import { AdminAuthService } from '../admin-auth.service';

@Injectable({ providedIn: 'root' })
export class HomeSliderService {
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

  sliders() {
    return this.http.get<any>(this.serverUrl + 'getRequest')
    .pipe(tap(resData => {
      if (resData) { this._contents.next(resData); }
    }));
  }

  slidersByAdmin() {
    return this.http.get<any>(
      this.serverUrl + 'sliders/all_slides/' + this.token
    );
  }

  addSlide(postData: string) {
    if (this.config.isDemo) {
      alert('Oops you can not update record on demo version.');
      return of(false);
    }
    return this.http.post<any>(
      this.serverUrl + 'sliders/addSlide/' + this.token,
      {data: postData}
    );
  }

  edit(postData: string) {
    if (this.config.isDemo) {
      alert('Oops you can not update record on demo version.');
      return of(false);
    }
    return this.http.post<any>(
      this.serverUrl + 'sliders/edit/' + this.token,
      {data: postData}
    );
  }

  singleSlide(id) {
    return this.http.get<any>(
      this.serverUrl + 'sliders/slide/' + this.token + '/' + id
    );
  }

  delete(id) {
    if (this.config.isDemo) {
      alert('Oops you can not update record on demo version.');
      return of(false);
    }
    return this.http.get<any>(
      this.serverUrl + 'sliders/delete/' + this.token + '/' + id
    );
  }

  updateHomeBanner(postData: string) {
    if (this.config.isDemo) {
      alert('Oops you can not update record on demo version.');
      return of(false);
    }
    return this.http.post<any>(
      this.serverUrl + 'sliders/edit_home_banner/' + this.token,
      {data: postData}
    );
  }

}
