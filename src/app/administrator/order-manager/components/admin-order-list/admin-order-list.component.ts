import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '../../../../data/services/config.service';
import { SEOService } from '../../../../data/services/seo.service';
import { OrderManagerService } from '../../../../data/services/administrator/order-manager.service';

@Component({
  selector: 'app-admin-order-list',
  templateUrl: './admin-order-list.component.html',
  styleUrls: ['./admin-order-list.component.scss']
})
export class AdminOrderListComponent implements OnInit {
  isLoading = false;
  currencyObj: any;
  orders = [];
  orderCounts = 0;
  orderStatus = 'all';
  pageLimit = 10;
  currPage = 1;

  constructor(
    private route: ActivatedRoute,
    private configService: ConfigService,
    private seoService: SEOService,
    private orderManagerService: OrderManagerService,
  ) { }

  get adminUrl() {
    return this.configService.adminURL;
  }

  ngOnInit() {
    const status = this.route.snapshot.paramMap.get('status');
    if (status) {
      this.orderStatus = status;
    }
    this.seoUpdate();
    this.getOrders();
    this.getStatus();
  }

  private getOrders() {
    this.orderManagerService.getOrders(
      this.orderStatus, this.pageLimit, this.currPage
    )
    .subscribe(res => {
      if (res) {
        this.orders = res.data;
        this.orderCounts = res.counts;
      }
    });
  }

  private seoUpdate() {
    this.seoService.updateTitle('Customer Orders');
    this.seoService.updateDescription('Customer Orders');
  }

  clearnUrl(name) {
    return this.configService.clearnUrl(name);
  }

  private getStatus() {
    this.orderManagerService.getStatus.subscribe(res => {
      if (res) {
        this.orderStatus = res;
        this.getOrders();
      }
    });
  }

}
