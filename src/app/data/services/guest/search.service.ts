import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from '../config.service';
import { tap } from 'rxjs/operators';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class SearchService {
  private serverUrl: string;
  private token: string;
  private _searchResults = new BehaviorSubject<any>(null);
  private subject = new Subject<any>();

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private authService: AuthService
  ) {
    this.serverUrl = this.config.base_url();
    this.authService.user.subscribe(res => {
      if (res) { this.token = res.token; }
    });
  }

  get getSearchResults() {
    return this._searchResults;
  }

  searchResults(keyword, limit = 10, page = 0) {
    return this.http.get<any>(
      this.serverUrl + 'search/' + keyword + '/' + limit + '/' + page
    )
    .pipe(tap(resData => {
      if (resData) { this._searchResults.next(resData); }
    }));
  }

  setKeyword(keyword: string) {
    this.subject.next(keyword);
  }

  get getKeyword(): Observable<any> {
    return this.subject.asObservable();
  }


}
