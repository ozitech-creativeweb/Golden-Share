import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from '../config.service';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StaticContentService {
  private serverUrl: string;
  private _contents = new BehaviorSubject<any>(null);

  constructor(
    private http: HttpClient,
    private config: ConfigService,
  ) {
    this.serverUrl = this.config.base_url();
  }

  get getContents() {
    return this._contents;
  }

  contents() {
    return this.http.get<any>(this.serverUrl + 'content')
    .pipe(tap(resData => {
      if (resData) { this._contents.next(resData); }
    }));
  }


  service() {
    return this.http.get<any>(this.serverUrl + 'content/services')
    .pipe(tap(resData => {
      if (resData) { this._contents.next(resData); }
    }));
  }

  contact() {
    return this.http.get<any>(this.serverUrl + 'content/contacts')
    .pipe(tap(resData => {
      if (resData) { this._contents.next(resData); }
    }));
  }

  about() {
    return this.http.get<any>(this.serverUrl + 'content/abouts')
    .pipe(tap(resData => {
      if (resData) { this._contents.next(resData); }
    }));
  }

  howTo() {
    return this.http.get<any>(this.serverUrl + 'content/howTos')
    .pipe(tap(resData => {
      if (resData) { this._contents.next(resData); }
    }));
  }

  other() {
    return this.http.get<any>(this.serverUrl + 'content/others')
    .pipe(tap(resData => {
      if (resData) { this._contents.next(resData); }
    }));
  }
  
  indexInfo() {
    return this.http.get<any>(this.serverUrl + 'getRequest')
    .pipe(tap(resData => {
      if (resData) { this._contents.next(resData); }
    }));
  }



}
