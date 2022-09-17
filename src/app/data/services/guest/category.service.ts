import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {take, tap, filter, delay } from 'rxjs/operators';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

import { Category, SubCategory } from '../../model/category';
import { ConfigService } from '../config.service';
import { AdminAuthService } from '../admin-auth.service';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private serverUrl: string;
  private token: string;
  private _categories = new BehaviorSubject<any>(null);
  private _menus = new BehaviorSubject<any>(null);
  private subject = new Subject<any>();

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private adminAuthService: AdminAuthService,
  ) {
    this.serverUrl = this.config.base_url();
    this.adminAuthService.admin.subscribe(auth => {
      if (auth) { this.token = auth.token; }
    });
  }

  private requestHeader() {
    const headers = new HttpHeaders({
      /* 'AuthKey': 'my-key',
      'AuthToken': 'my-token', */
      'Content-Type': 'application/json',
    });
    return headers;
  }

  get getCategories() {
    return this._categories;
  }

  get getMenus() {
    return this._menus;
  }

  // Get all main category
  Categories() {
    return this.http.get<any>(this.serverUrl + 'categories/')
    .pipe(tap(resData => {
      if (resData) {
        this._categories.next(resData);
      }
    }));
  }

  //
  menus() {
    return this.http.get<any>(this.serverUrl + 'categories/menus')
    .pipe(tap(resData => {
      if (resData) {
        this._menus.next(resData);
      }
    }));
  }

  setCategory(category: string) {
    this.subject.next(category);
  }

  get getCategory(): Observable<any> {
    return this.subject.asObservable();
  }

  add(postData: string) {
    return this.http.post<any>(
      this.serverUrl + 'categories/add/' + this.token, postData
    );
  }

  delete(catID, level) {
    return this.http.get<any>(
      this.serverUrl + 'categories/delete/' +
      this.token + '/' + catID + '/' + level
    );
  }

  bannerAds() {
    return this.http.get<any>(
      this.serverUrl + 'categories/allBannerAds/' + this.token
    );
  }

  addBannerAd(postData: string) {
    return this.http.post<any>(
      this.serverUrl + 'categories/addBannerAd/' + this.token, postData
    );
  }

  deleteBannerAd(id) {
    return this.http.get<any>(
      this.serverUrl + 'categories/deleteBannerAd/' + this.token + '/' + id
    );
  }

  // Admin only
  homeFeaturedCats() {
    return this.http.get<any>(
      this.serverUrl + 'categories/homeFeaturedCategories/' + this.token
    );
  }

  addHomeFeaturedCat(postData: string) {
    return this.http.post<any>(
      this.serverUrl + 'categories/addHomeFeaturedCat/' + this.token,
      postData
    );
  }

  deleteHomeFeaturedcat(id) {
    return this.http.get<any>(
      this.serverUrl + 'categories/deleteHomeFeaturedCat/' +
      this.token + '/' + id
    );
  }


  getVariations() {
    return this.http.get<any>(
      this.serverUrl + 'categories/getVariations/' + this.token
    );
  }

  addVariation(postData: string) {
    return this.http.post<any>(
      this.serverUrl + 'categories/addVariation/' + this.token,
      postData
    );
  }

  deleteVaiation(category, variationName = null) {
    return this.http.get<any>(
      this.serverUrl + 'categories/deleteVariation/' +
      this.token + '/' + category + '/' + variationName
    );
  }

}
