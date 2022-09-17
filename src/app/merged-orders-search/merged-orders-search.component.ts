import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../../data/services/config.service';
import { DonationManagerService } from '../../../../data/services/administrator/donation-manager.service';
import { CurrencyService } from '../../../../data/services/currency.service';
import { SEOService } from '../../../../data/services/seo.service';
import { RoutingService } from '../../../../data/helpers/routing.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminAuthService } from 'src/app/data/services/admin-auth.service';

@Component({
  selector: 'app-merged-orders',
  templateUrl: './merged-orders.component.html',
  styleUrls: ['./merged-orders.component.scss']
})
export class MergedOrdersComponent implements OnInit {
  isLoading = false;
  isLoadMore = false;
  orders = [];
  orderCounts = 0;
  pageLimit = 20;
  currentPage = 1;
  currency: any;

  isRootAdmin = false;

  isTableSearch = false;

  formTable = new FormGroup({
    username: new FormControl('', [
      Validators.required
    ]),
  });

  get username() {
    return this.formTable.get('username');
  }

  constructor(
    private configService: ConfigService,
    private donationManagerService: DonationManagerService,
    private currencyService: CurrencyService,
    private seoService: SEOService,
    private routingService: RoutingService,
    private adminAuthService: AdminAuthService,
  ) { }

  ngOnInit() {
    this.getOrders();
    this.getCurrency();
    this.seoUpdate();
    this.updateAuth();
  }

  get adminUrl() {
    return this.configService.adminURL;
  }

  private updateAuth() {
    this.adminAuthService.admin.subscribe(res => {
      if (res) {
        const data = this.configService.isRootAdmin(res);
        if (data) {
          this.isRootAdmin = true;
        }
      }
    });
  }

  private getCurrency() {
    this.currencyService.getCurrency.subscribe(res => {
      this.currency = res;
    });
  }

  private getOrders(isMore = false) {
    this.isLoading = true;
    this.donationManagerService.mergedOrders(
      this.routingService.activeRoute, this.pageLimit, this.currentPage
    ).subscribe(res => {
      if (res) {
        if (isMore) {
          for (let i = 0; i < res.data.length; i++) {
            this.orders.push(res.data[i]);
          }
        } else {
          this.orders = res.data;
          console.log(this.orders);
        }
        this.orderCounts = res.counts;
      }
      this.isLoadMore = false;
      this.isLoading = false;

    });
  }

  delete(id: number) {
    if (confirm('Are you sure you want to DELETE this Order?') ) {
      this.donationManagerService.deleteOrder(id).subscribe(res => {
        this.getOrders();
      });
    }
  }


  private seoUpdate() {
    this.seoService.updateTitle('Meregd Orders');
    this.seoService.updateDescription('Meregd Orders');
  }

  loadMore(){
    this.isLoadMore = true;
    if (this.orderCounts > this.orders.length) {
      this.currentPage++;
      this.getOrders(true);
    }
  }
  theSearch

  submitTable() {
    this.isTableSearch = true;
    const data = (this.formTable.get("username").value);
    this.donationManagerService.theSearch(data).subscribe(res => {
      console.log(res);
    });
  }

}
