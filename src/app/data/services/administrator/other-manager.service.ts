import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from '../config.service';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AdminAuthService } from '../admin-auth.service';

@Injectable({ providedIn: 'root' })
export class OtherManagerService {
  private serverUrl: string;
  private adminUrl: string;
  private token: string;

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

  paymentMethods() {
    return this.http.get<any>(
      this.serverUrl + this.adminUrl + '/other_manager/payment_methods/' +
      this.token
    );
  }

  payMethod(id) {
    return this.http.get<any>(
      this.serverUrl + this.adminUrl + '/other_manager/payment_method/' +
      this.token + '/' + id
    );
  }

  deletePaymentMethod(id) {
    return this.http.get<any>(
      this.serverUrl + this.adminUrl + '/other_manager/delete_payment_method/' +
      this.token + '/' + id
    );
  }

  addPaymentMethod(data: string) {
    return this.http.post<any>(
      this.serverUrl + this.adminUrl +
      '/other_manager/create_payment_method/' + this.token, {data: data}
    );
  }

  editPaymentMethod(data: string) {
    return this.http.post<any>(
      this.serverUrl + this.adminUrl +
      '/other_manager/update_payment_method/' + this.token, {data: data}
    );
  }

  shippingMethods() {
    return this.http.get<any>(
      this.serverUrl + this.adminUrl + '/other_manager/shipping_methods/' +
      this.token
    );
  }

  shipMethod(id) {
    return this.http.get<any>(
      this.serverUrl + this.adminUrl + '/other_manager/ship_method/' +
      this.token + '/' + id
    );
  }

  deleteShippingMethod(id) {
    return this.http.get<any>(
      this.serverUrl + this.adminUrl + '/other_manager/delete_shipping_method/' +
      this.token + '/' + id
    );
  }

  addShippingMethod(data: string) {
    return this.http.post<any>(
      this.serverUrl + this.adminUrl +
      '/other_manager/create_shipping_method/' + this.token, {data: data}
    );
  }

  editShippingMethod(data: string) {
    return this.http.post<any>(
      this.serverUrl + this.adminUrl +
      '/other_manager/update_shipping_method/' + this.token, {data: data}
    );
  }

  getBankDetails() {
    return this.http.get<any>(
      this.serverUrl + this.adminUrl + '/other_manager/get_bank_details/' +
      this.token
    );
  }

  bank_details_update(data: string, id) {
    return this.http.post<any>(
      this.serverUrl + this.adminUrl +
      '/other_manager/bank_details_update/' + this.token,
      {data: data, id: id}
    );
  }


}
