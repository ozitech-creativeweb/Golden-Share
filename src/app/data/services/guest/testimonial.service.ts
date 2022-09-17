import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from '../config.service';
import { tap, delay } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { AdminAuthService } from '../admin-auth.service';

@Injectable({ providedIn: 'root' })
export class TestimonialService {
  private serverUrl: string;
  private token: string;
  private _contents = new BehaviorSubject<any>(null);
  // getTestimonies: any;

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

  get getTestimonies() {
    return this._contents;
  }

  testimonial() {
    return this.http.get<any>(this.serverUrl + 'testimonials')
    .pipe(tap(resData => {
        if (resData) { this._contents.next(resData); }
    }));
  }


  getTest(limit = 10, page = 0) {
    return this.http.get<any>(
        this.serverUrl + 'testimonials/' + limit + '/' + page
    );
  }

  allTestimony() {
    return this.http.get<any>(
        this.serverUrl + 'testimonials/all_testimony'
    )
    .pipe(tap(resData => {
        if (resData) { this._contents.next(resData); }
    }));
  }


  addTestimony(postData: string) {
    return this.http.post<any>(
      this.serverUrl + 'testimonials/createTestimony/' + this.token,
      postData
    );
  }

  updateTestimony(postData: string) {
    return this.http.post<any>(
      this.serverUrl + 'testimonials/updateTestimony/' + this.token,
      {data: postData}
    );
  }

}
