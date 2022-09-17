import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '../../../../data/services/config.service';
import { CurrencyService } from '../../../../data/services/currency.service';
import { OrderManagerService } from '../../../../data/services/administrator/order-manager.service';

@Component({
  selector: 'app-admin-order-details',
  templateUrl: './admin-order-details.component.html',
  styleUrls: ['./admin-order-details.component.scss']
})
export class AdminOrderDetailsComponent implements OnInit {
  isLoading = false;
  orders: any;
  order: any;
  shipAddress: any;
  variation: any;
  shippingMethods: any;
  currencyObj: any;

  constructor(
    private route: ActivatedRoute,
    private configService: ConfigService,
    private currencyService: CurrencyService,
    private orderManagerService: OrderManagerService,
  ) { }

  get adminUrl() {
    return this.configService.adminURL;
  }

  ngOnInit() {
    const orderNumber = this.route.snapshot.paramMap.get('order-number');
    this.getOrder(orderNumber);
    this.getCurrency();
  }

  private getOrder(orderNumber) {
    this.orderManagerService.getOrder(orderNumber).subscribe(res => {
      if (res) {
        this.orders = res.orders;
        this.order = res.order;
        this.shipAddress = res.shipping_addr;
        this.variation = res.variation;
        this.shippingMethods = res.order.shipping_method.split('|');
      }
    });
  }

  clearnUrl(name) {
    return this.configService.clearnUrl(name);
  }

  private getCurrency() {
    this.currencyService.getCurrency.subscribe(res => {
      if (res) { this.currencyObj = res; }
    });
  }

  updateOrder(orderNumber, event, role) {
    const data = event.target.value;
    const x = 'Are you sure you want to mark this order as ' + data + '?';
    if (confirm(x)) {
      this.orderManagerService.update(orderNumber, data, role)
      .subscribe(res => {
        if (res.status === 'success') {
          this.ngOnInit();
        }
      });
    }
  }

}
