import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from '../config.service';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AdminAuthService } from '../admin-auth.service';

@Injectable({ providedIn: 'root' })
export class SupportManagerService {
  private serverUrl: string;
  private adminUrl: string;
  private token: string;
  private _messageTree = new BehaviorSubject<any>(null);
  private _activity = new BehaviorSubject<any>(null);
  private subject = new Subject<any>();

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
 
  get getMessagrTree() {
    return this._messageTree.asObservable();
  }

  setID(id) {
    this.subject.next(id);
  }

  get getID(): Observable<any> {
    return this.subject.asObservable();
  }

  getSupport(limit = 50, page = 1) {
      return this.http.get<any>(
      this.serverUrl + this.adminUrl + '/support_manager/' +
      this.token + '/' + limit + '/' + page
      );
  }

  supportSingle(suppID: number) {
      return this.http.get<any>(
          this.serverUrl + this.adminUrl + '/support_manager/single/' +
          this.token + '/' + suppID
      ).pipe(tap(resData => {
          if (resData) {
              this._messageTree.next(resData);
          }
      }));
  }

  singleById(suppID: number) {
    return this.http.get<any>(
        this.serverUrl + this.adminUrl + '/support_manager/single_id/' +
        this.token + '/' + suppID
    ).pipe(tap(resData => {
        if (resData) {
            this._messageTree.next(resData);
        }
    }));
  }
  
  
	
  
//   donationForMerging() {
//     return this.http.get<any>(
//       this.serverUrl + this.adminUrl + '/support_manager/manualMergingList/' +
//       this.token
//     );
//   }

	replyChat(msgData: string) {
    return this.http.post<any>(
      this.serverUrl + this.adminUrl + '/support_manager/add/' +
      this.token, { data: msgData }
    );
  }

//   approvePOP(popID: number) {
//     return this.http.get<any>(
//         this.serverUrl + this.adminUrl + '/support_manager/approvePOP/' +
//         this.token + '/' + popID
//     );
//   }

//   deleteDonation(donateID: number) {
//     return this.http.get<any>(
//         this.serverUrl + this.adminUrl + '/support_manager/delete/' +
//         this.token + '/' + donateID
//     );
//   }


}
