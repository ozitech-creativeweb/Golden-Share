import { CanLoad, Route, UrlSegment } from '@angular/router';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, timer } from 'rxjs';
import { take, switchMap, tap } from 'rxjs/operators';

import { AdminAuthService } from './admin-auth.service';

@Injectable()
export class AdminAuthGuard implements CanLoad {
  constructor(
    private adminAuthService: AdminAuthService,
    private router: Router
  ) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.adminAuthService.admin.pipe(
      take(1),
      switchMap(currentUser => {
        if (!currentUser) {
          return this.adminAuthService.autoLogin();
        }
        return of(true);
      }),
      tap(isAuth => {
        this.checkToken();
        if (!isAuth) {
          this.router.navigate(['/administrator/admin-login']);
        }
      })
    );
  }

  private checkToken() {
    this.adminAuthService.admin.subscribe(resp => {
      if (resp && resp.token ) {
        const currentDate = new Date().getTime();
        const tokenDate = new Date(resp.exp).getTime();
        if (tokenDate > currentDate) {
          return true;
        } else {
          this.adminAuthService.storeAdminAuthData(null);
          // this.adminAuthService.logout();
          return false;
        }
      } else {
        this.adminAuthService.storeAdminAuthData(null);
        // this.adminAuthService.logout();
        return false;
      }
    });
  }

}
