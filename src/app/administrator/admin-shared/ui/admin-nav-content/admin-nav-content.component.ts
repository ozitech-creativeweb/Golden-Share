import { Component, OnInit } from '@angular/core';
import { AdminAuthService } from '../../../../data/services/admin-auth.service';
import { ConfigService } from '../../../../data/services/config.service';
import { OrderManagerService } from '../../../../data/services/administrator/order-manager.service';
import { UserManagerService } from '../../../../data/services/administrator/user-manager.service';
import { StorageService } from '../../../../data/helpers/storage.service';
import { RoutingService } from '../../../../data/helpers/routing.service';
import { DonationManagerService } from '../../../../data/services/administrator/donation-manager.service';

@Component({
  selector: 'app-admin-nav-content',
  templateUrl: './admin-nav-content.component.html',
  styleUrls: ['./admin-nav-content.component.scss']
})
export class AdminNavContentComponent implements OnInit {
  role: any;
  isRootAdmin = false;

  constructor(
    private adminAuthService: AdminAuthService,
    private configService: ConfigService,
    private orderManagerService: OrderManagerService,
    private userManagerService: UserManagerService,
    private storageService: StorageService,
    private routingService: RoutingService,
    private donationManagerService: DonationManagerService,
  ) { }

  get adminUrl() {
    return this.configService.adminURL;
  }

  ngOnInit() {
    this.updateAuth();
    this.updateActiveMenu();
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

  toggle(role) {
    this.storageService.storeString('adminNavMenu', role);
    this.role = (this.role === role) ? null : role;
  }

  private updateActiveMenu() {
    if (this.storageService.hasKey('adminNavMenu')) {
      this.role = this.storageService.getString('adminNavMenu');
    } /* else {
      const route = this.routingService.activeRoute;
      this.toggle(route);
    } */
  }

  logout() {
    this.adminAuthService.logout();
  }

  setOrderStatus(status) {
    this.orderManagerService.setStatus(status);
  }

  setCustomerStatus(status) {
    this.userManagerService.setStatus(status);
  }

  setMergedStatus(status) {
    this.donationManagerService.setStatus(status);
  }

}
