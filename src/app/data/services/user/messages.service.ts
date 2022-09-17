import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from '../config.service';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { Message } from '../../model/message';
import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class MessagesService {
  private serverUrl: string;
  private token: string;
  private _messages = new BehaviorSubject<Message>(null);
  private _messagetree = new BehaviorSubject<Message>(null);
  private subject = new Subject<any>();

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

  // Messages by user login_id
  getMessages(
    limit: number = 10,
    page: number = 1
  ) {
    return this.http.get<Message>(
      this.serverUrl + 'user/messages/'
      + this.token + '/' + limit + '/' + page
    )
    .pipe(
      tap(resData => {
        if (resData) {
          this._messages.next(resData);
        }
    }),
    delay(
      1000
    )
    );
  }

  getMessageTree(
    parnerUsername: string,
    limit: number = 10,
    page: number = 1
  ) {
    return this.http.get<any>(
      this.serverUrl + 'user/messages/tree/'
      + this.token + '/' + parnerUsername + '/' + limit + '/' + page
    )
    .pipe(
      tap(resData => {
        if (resData) {
          this._messagetree.next(resData);
        }
    }));
  }

  // Post or update job
  sendMsg( msgData: string, receiverID: number) {
    return this.http
      .post<any>(
        this.serverUrl + 'user/messages/send/' + this.token + '/' + receiverID,
        { data: msgData }
      );
  }

  // Send quote request
  sendQuoteRequest( msgData: string) {
    return this.http
      .post<any>(
        this.serverUrl + 'user/messages/quoteRequest/' + this.token,
        { data: msgData }
      );
  }

  setUsername(username: string) {
    this.subject.next(username);
  }

  getUsername(): Observable<any> {
    return this.subject.asObservable();
  }

}
