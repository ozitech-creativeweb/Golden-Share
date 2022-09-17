import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from '../config.service';
import { tap, delay } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { AdminAuthService } from '../admin-auth.service';

@Injectable({ providedIn: 'root' })
export class ContactUsService {
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

  get getContact() {
    return this._contents;
  }

  sendContactMssg(formData: string) {
    return this.http.post<any>(
        this.serverUrl + 'contact_us', formData
      );
  }



}
