import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from '../config.service';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AdminAuthService } from '../admin-auth.service';

@Injectable({ providedIn: 'root' })
export class JobManagerService {
  private serverUrl: string;
  private adminUrl: string;
  private token: string;
  private _jobs = new BehaviorSubject<any>(null);
  private _job = new BehaviorSubject<any>(null);

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

  get jobs() {
    return this._jobs.asObservable();
  }

  get job() {
    return this._job.asObservable();
  }

   getJobs(category = 'all-jobs', limit = 10, page = 1, role = 'all') {
        return this.http.get<any>(
        this.serverUrl + this.adminUrl + '/job_manager/' +
        this.token + '/' + category + '/' + limit + '/' + page + '/' + role
        )
        .pipe(
        tap(resData => {
            if (resData) {
            this._jobs.next(resData);
            }
        }));
    }

    single(jobID: number) {
        return this.http.get<any>(
            this.serverUrl + this.adminUrl + '/job_manager/single/' +
            this.token + '/' + jobID
        ).pipe(tap(resData => {
            if (resData) {
                this._job.next(resData);
            }
        }));
    }

  updateJob( msgData: string) {
    return this.http
      .post<any>(
        this.serverUrl + this.adminUrl + '/job_manager/updateJob/' +
        this.token, { data: msgData }
      );
  }

  deleteJob(jobID: number) {
    return this.http.get<any>(
        this.serverUrl + this.adminUrl + '/job_manager/deleteJob/' +
        this.token + '/' + jobID
    );
  }

}
