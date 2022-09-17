import { CanLoad, Route, UrlSegment } from '@angular/router';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, timer } from 'rxjs';
import { take, switchMap, tap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.user.pipe(
      take(1),
      switchMap(currentUser => {
        if (!currentUser) {
          this.router.navigate(['/login']);
          return of(false);
        }
        return of(true);
      }),
      tap(isAuth => {
        this.checkToken();
        if (!isAuth) {
          this.router.navigate(['/login']);
        }
      })
    );
  }

  private checkToken() {
    this.authService.user.subscribe(resp => {
      if (resp && resp.token ) {
        const currentDate = new Date().getTime();
        const tokenDate = new Date(resp.exp).getTime();
        if (tokenDate > currentDate) {
          return true;
        } else {
          // this.authService.logout();
          return false;
        }
      } else {
        // this.authService.logout();
        return false;
      }
    });
  }

}
