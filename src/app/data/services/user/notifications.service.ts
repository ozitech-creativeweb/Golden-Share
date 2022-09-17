import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from '../config.service';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private serverUrl: string;
  private token: string;
  private _messages = new BehaviorSubject<any>(null);
  private _system_notes = new BehaviorSubject<any>(null);
  private _undreadMsgCnts = new BehaviorSubject<any>(null);
  private _noteUndreadCnts = new BehaviorSubject<any>(null);

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

  getMessages(
    limit: number = 10,
    page: number = 1
  ) {
    return this.http.get<any>(
      this.serverUrl + 'user/manage_notification/messages/'
      + this.token + '/' + limit + '/' + page
    )
    .pipe(
      tap(resData => {
        if (resData) {
          this._messages.next(resData);
        }
    }),
    delay(1000)
    );
  }

  readStatus(msgID: number) {
    return this.http.get<any>(
      this.serverUrl + 'user/manage_notification/readStatus/'
      + this.token + '/' + msgID
    );
  }

  unreadCnts() {
    return this.http.get<any>(
      this.serverUrl + 'user/manage_notification/msgUnreadCnts/' + this.token
    )
    .pipe(
        tap(resData => {
          if (resData) {
            this._undreadMsgCnts.next(resData);
          }
      })
    );
  }

  getUnreadCnts(): Observable<any> {
    return this._undreadMsgCnts.asObservable();
  }

  getSystem_notes(
    limit: number = 10,
    page: number = 1
  ) {
    return this.http.get<any>(
      this.serverUrl + 'user/manage_notification/system_notes/'
      + this.token + '/' + limit + '/' + page
    )
    .pipe(
      tap(resData => {
        if (resData) {
          this._system_notes.next(resData);
        }
    }),
    delay(1000)
    );
  }

  noteUnreadCnts() {
    return this.http.get<any>(
      this.serverUrl + 'user/manage_notification/noteUnreadCnts/' + this.token
    )
    .pipe(
        tap(resData => {
          if (resData) {
            this._noteUndreadCnts.next(resData);
          }
      })
    );
  }

  getNoteUnreadCnts(): Observable<any> {
    return this._noteUndreadCnts.asObservable();
  }

  noteReadStatus(noteID: number) {
    return this.http.get<any>(
      this.serverUrl + 'user/manage_notification/note_readStatus/'
      + this.token + '/' + noteID
    );
  }

}
