import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from '../config.service';
import { BehaviorSubject, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AdminAuthService } from '../admin-auth.service';

@Injectable({ providedIn: 'root' })
export class PagesService {
  private serverUrl: string;
  private adminUrl: string;
  private token: string;

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

  getPages() {
    return this.http.get<any>(
      this.serverUrl + this.adminUrl + '/page_contents/' + this.token
    );
  }

  delete(id) {
    if (this.config.isDemo) {
      alert('Oops you can not update record on demo version.');
      return of(false);
    }
    return this.http.get<any>(
      this.serverUrl + this.adminUrl + '/page_contents/delete/'
      + this.token + '/' + id
    );
  }

  single(url) {
    return this.http.get<any>(
      this.serverUrl + this.adminUrl + '/page_contents/single_page/' + url
    );
  }

  add(data: string) {
    if (this.config.isDemo) {
      alert('Oops you can not update record on demo version.');
      return of(false);
    }
    return this.http.post<any>(
        this.serverUrl + this.adminUrl + '/page_contents/add/' + this.token,
        {data: data}
    );
  }

  edit(data: string) {
    if (this.config.isDemo) {
      alert('Oops you can not update record on demo version.');
      return of(false);
    }
    return this.http.post<any>(
        this.serverUrl + this.adminUrl + '/page_contents/edit/' + this.token,
        {data: data}
    );
  }

  getMenus() {
    return this.http.get<any>(
      this.serverUrl + this.adminUrl + '/page_contents/menus/' + this.token
    );
  }

  deleteMenu(id) {
    if (this.config.isDemo) {
      alert('Oops you can not update record on demo version.');
      return of(false);
    }
    return this.http.get<any>(
      this.serverUrl + this.adminUrl + '/page_contents/remove_menu/'
      + this.token + '/' + id
    );
  }

  addMenu(data: string) {
    if (this.config.isDemo) {
      alert('Oops you can not update record on demo version.');
      return of(false);
    }
    return this.http.post<any>(
        this.serverUrl + this.adminUrl + '/page_contents/add_menu/'
        + this.token, {data: data}
    );
  }

  localBanks() {
    return this.http.get<any>(
      this.serverUrl + this.adminUrl + '/page_contents/localBanks/'
    );
  }

  addBank(data: string) {
    if (this.config.isDemo) {
      alert('Oops you can not update record on demo version.');
      return of(false);
    }
    return this.http.post<any>(
      this.serverUrl + this.adminUrl + '/page_contents/addBank/'
      + this.token, {data: data}
    );
  }

  deleteBank(id) {
    if (this.config.isDemo) {
      alert('Oops you can not update record on demo version.');
      return of(false);
    }
    return this.http.get<any>(
      this.serverUrl + this.adminUrl + '/page_contents/deleteBank/'
      + this.token + '/' + id
    );
  }

}
