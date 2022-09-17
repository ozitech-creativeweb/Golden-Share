import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from '../config.service';
import { delay } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class TimercheckService {
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

  showTime = true;
  
  get showTimeGetter(){
    return this.showTime;
  }

}
