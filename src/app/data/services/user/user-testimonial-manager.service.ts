import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from '../config.service';
import { delay, tap } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserTestimonialManagerService {
  private serverUrl: string;
  private token: string;
  private _testimonials = new BehaviorSubject<any>(null);

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

  get getTestimonials() {
    return this._testimonials.asObservable();
  }

  testimonials() {
    return this.http.get<any>(
      this.serverUrl + 'user/testimonial/' + this.token
    ).pipe(tap(resData => {
      if (resData) {
        this._testimonials.next(resData);
      }
    }));
  }

  testimony(id) {
    return this.http.get<any>(
      this.serverUrl + 'user/testimonial/single/' + this.token + '/' + id
    );
  }

  add(postData) {
    return this.http.post<any>(
        this.serverUrl + 'user/testimonial/add/' + this.token,
        { data: postData }
    );
  }

  edit(postData) {
    return this.http.post<any>(
        this.serverUrl + 'user/testimonial/edit/' + this.token,
        { data: postData }
    );
  }

  delete(id) {
    return this.http.get<any>(
      this.serverUrl + 'user/testimonial/delete/' + this.token + '/' + id
    );
  }

}
