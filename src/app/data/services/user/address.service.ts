import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from '../config.service';
import { delay } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class AddressService {
  private serverUrl: string;
  private token: string;

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

  addresses() {
    return this.http.get<any>(
      this.serverUrl + 'user/address/' + this.token
    );
  }

  address(id) {
    return this.http.get<any>(
      this.serverUrl + 'user/address/single/' + this.token + '/' + id
    );
  }

  add(postData) {
    return this.http.post<any>(
        this.serverUrl + 'user/address/add/' + this.token,
        { data: postData }
    );
  }

  edit(postData) {
    return this.http.post<any>(
        this.serverUrl + 'user/address/edit/' + this.token,
        { data: postData }
    );
  }

  setDefault(id) {
    return this.http.get<any>(
      this.serverUrl + 'user/address/setDefault/' + this.token + '/' + id
    );
  }

  delete(id) {
    return this.http.get<any>(
      this.serverUrl + 'user/address/delete/' + this.token + '/' + id
    );
  }

}
