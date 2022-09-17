import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from '../config.service';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { AdminAuthService } from '../admin-auth.service';
import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private serverUrl: string;
  private token: string;
  private userToken: string;
  private _contents = new BehaviorSubject<any>(null);
  private _content = new BehaviorSubject<any>(null);
  private _deals = new BehaviorSubject<any>(null);
  private _featured = new BehaviorSubject<any>(null);
  private _featuredCategories = new BehaviorSubject<any>(null);

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private adminAuthService: AdminAuthService,
    private authService: AuthService
  ) {
    this.serverUrl = this.config.base_url();
    this.adminAuthService.admin.subscribe(auth => {
      if (auth) { this.token = auth.token; }
    });
    this.authService.user.subscribe(res => {
      if (res) { this.userToken = res.token; }
    });
  }

  get getProducts() {
    return this._contents;
  }

  get getDeals() {
    return this._deals;
  }

  get getFeatured() {
    return this._featured;
  }

  get getFeaturedCategories() {
    return this._featuredCategories;
  }

  products(category, limit = 10, page = 0) {
    return this.http.get<any>(
        this.serverUrl + 'category_products/' +
        category + '/' + limit + '/' + page
    )
    .pipe(tap(resData => {
        if (resData) { this._contents.next(resData); }
    }));
  }

  product(pid) {
    return this.http.get<any>(
        this.serverUrl + 'category_products/product/' + pid
    )
    .pipe(tap(resData => {
        if (resData) { this._content.next(resData); }
    }));
  }

  deal(limit = 10) {
    return this.http.get<any>(
        this.serverUrl + 'category_products/deal/' + limit
    )
    .pipe(tap(resData => {
        if (resData) { this._deals.next(resData); }
    }));
  }

  featured(limit = 10) {
    return this.http.get<any>(
        this.serverUrl + 'category_products/featured/' + limit
    )
    .pipe(tap(resData => {
        if (resData) { this._featured.next(resData); }
    }));
  }

  featuredCategories(limit = 10) {
    return this.http.get<any>(
        this.serverUrl + 'category_products/featuredCategories/' + limit
    )
    .pipe(tap(resData => {
        if (resData) { this._featuredCategories.next(resData); }
    }));
  }

  add(postData: string, imgData: string) {
    return this.http.post<any>(
      this.serverUrl + 'category_products/add/' + this.token,
      {data: postData, files: imgData}
    );
  }

  edit(postData: string, imgData: string) {
    return this.http.post<any>(
      this.serverUrl + 'category_products/edit/' + this.token,
      {data: postData, files: imgData}
    );
  }

  getProductsAdmin(category = 'all', limit = 10, page = 1) {
    return this.http.get<any>(
        this.serverUrl + 'category_products/products_byadmin/' +
        this.token + '/' + category + '/' + limit + '/' + page
    );
  }

  inactiveProducts(limit = 10, page = 1) {
    return this.http.get<any>(
        this.serverUrl + 'category_products/inactive_products/' +
        this.token + '/' + limit + '/' + page
    );
  }

  deleteItem(pid) {
    return this.http.get<any>(
        this.serverUrl + 'category_products/deleteItem/' +
        this.token + '/' + pid
    );
  }

  rating(postData: string) {
    return this.http.post<any>(
      this.serverUrl + 'category_products/rating/' + this.userToken,
      {data: postData}
    );
  }

}
