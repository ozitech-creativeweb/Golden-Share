import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../../data/services/config.service';
import { SEOService } from '../../../../data/services/seo.service';
import { UserManagerService } from '../../../../data/services/administrator/user-manager.service';
import { AdminAuthService } from '../../../../data/services/admin-auth.service';
import { OrderManagerService } from '../../../../data/services/administrator/order-manager.service';
import { ProductService } from '../../../../data/services/guest/products.service';
import { AdminManagerService } from '../../../../data/services/administrator/admin-manager.service';
import { CurrencyService } from '../../../../data/services/currency.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  adm: any;
  isLoading = false;
  isRootAdmin = false;
  currency: any;
  customers: any;
  customerCounts = 0;
  customerActiveCounts = 0;
  customerSuspendedCounts = 0;
  customerBlockedCounts = 0;
  orders: any;
  orderCounts = 0;
  products: any;
  productCounts = 0;
  inactiveProducts: any;
  inactiveProductCounts = 0;
  loginActivities: any;
  recentlyLogin: any;
  vendorInfo: any;
  clientInfo: any;
  sumOrder: any;
  visitor: any;
  dashInfo: any;

  activeUsers: any;

  constructor(
    private configService: ConfigService,
    private seoService: SEOService,
    private userManagerService: UserManagerService,
    private adminAuthService: AdminAuthService,
    private orderManagerService: OrderManagerService,
    private productService: ProductService,
    private adminManagerService: AdminManagerService,
    private currencyService: CurrencyService,
  ) { }

  get adminUrl() {
    return this.configService.adminURL;
  }

  ngOnInit() {
    this.updateAuth();
    this.seoUpdate();
    this.getCurrency();
    this.getCustomers();
    this.getDashboardData();
    this.activatedUsers();
    this.getCurrency();
  }


  private activatedUsers() {
    this.userManagerService.activatedUser(5).subscribe(res => {
      if (res) {
        this.activeUsers = res;
      }
    });
  }

  private getCustomers() {
    this.userManagerService.getCustomers('all', 5, 1)
    .subscribe(res => {
      if (res) {
        this.customers = res.data;
        this.customerCounts = res.counts;
      }
    });
    this.userManagerService.getCustomers('active', 5, 1)
    .subscribe(res => {
      if (res) { this.customerActiveCounts = res.counts; }
    });
    this.userManagerService.getCustomers('suspended', 5, 1)
    .subscribe(res => {
      if (res) { this.customerSuspendedCounts = res.counts; }
    });
    this.userManagerService.getCustomers('blocked', 5, 1)
    .subscribe(res => {
      if (res) { this.customerBlockedCounts = res.counts;  }
    });
  }


  private getCurrency() {
    this.currencyService.getCurrency.subscribe(res => {
      this.currency = res;
    });
  }

  private getDashboardData() {
    this.adminManagerService.dashboard(10, 1).subscribe(res => {
      this.loginActivities = res.loginActivities;
      this.recentlyLogin = res.recentlyLogin;
      this.vendorInfo = res.vendorInfo;
      this.clientInfo = res.clientInfo;
      this.sumOrder = res.sumOrder;
      this.dashInfo = res;
      this.visitor = res.visitor;
    });
  }

  private updateAuth() {
    this.adminAuthService.admin.subscribe(res => {
      if (res) {
        this.adm = res;
        const data = this.configService.isRootAdmin(res);
        if (data) {
          this.isRootAdmin = true;
        }
      }
    });
  }


  clearnUrl(name) {
    return this.configService.clearnUrl(name);
  }

  private seoUpdate() {
    this.seoService.updateTitle('Admin Dasboard');
    this.seoService.updateDescription('Admin Dasboard');
  }

}
