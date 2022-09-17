import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from '../config.service';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth.service';
import { StorageService } from '../../helpers/storage.service';

@Injectable({ providedIn: 'root' })
export class ShoppingCartService {
  private serverUrl: string;
  private token: string;
  private _shoppingCart = new BehaviorSubject<any>(null);

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private authService: AuthService,
    private storageService: StorageService
  ) {
    this.serverUrl = this.config.base_url();
    this.authService.user.subscribe(auth => {
      if (auth) { this.token = auth.token; }
    });
  }

  get getShoppingCart() {
    return this._shoppingCart;
  }

  shoppingCart() {
    const cardID = this.storageService.getString('cardID');
    return this.http.get<any>(
      this.serverUrl + 'shopping_cart/' + cardID + '/' + this.token
    )
    .pipe(tap(resData => {
      if (resData) { this._shoppingCart.next(resData); }
    }));
  }

  addToCart(pid: number, qty: number, variation = null) {
    let cardID;
    if (!this.storageService.hasKey('cardID')) {
      cardID = this.config.getRandomString(15);
      this.storageService.storeString('cardID', cardID);
    } else {
      cardID = this.storageService.getString('cardID');
    }

    return this.http.post<any>(
      this.serverUrl + 'shopping_cart/add/' +
      cardID + '/' + pid + '/' + qty + '/' + this.token, variation
    )
    .pipe(tap(resData => {
        if (resData) { this._shoppingCart.next(resData); }
    }));
  }

  removeItem(pid: number) {
    const cardID = this.storageService.getString('cardID');

    return this.http.get<any>(
      this.serverUrl + 'shopping_cart/remove/' +
      cardID + '/' + pid + '/' + this.token
    )
    .pipe(tap(resData => {
        if (resData) { this._shoppingCart.next(resData); }
    }));
  }

  updateQty(pid: number) {
    const cardID = this.storageService.getString('cardID');

    return this.http.get<any>(
      this.serverUrl + 'shopping_cart/reduceItem/' +
      cardID + '/' + pid + '/' + this.token
    )
    .pipe(tap(resData => {
        if (resData) { this._shoppingCart.next(resData); }
    }));
  }

}
