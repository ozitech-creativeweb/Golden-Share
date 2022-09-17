import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../../data/services/config.service';
import { AdminManagerService } from '../../../../data/services/administrator/admin-manager.service';
import { SEOService } from '../../../../data/services/seo.service';
import { RoutingService } from '../../../../data/helpers/routing.service';
import { AdminAuthService } from '../../../../data/services/admin-auth.service';

@Component({
  selector: 'app-admin-listing',
  templateUrl: './admin-listing.component.html',
  styleUrls: ['./admin-listing.component.scss']
})
export class AdminListingComponent implements OnInit {
  isLoading = false;
  adminstrators: any;
  adminstratorCounts = 0;
  limit = 12;
  currPage = 1;

  constructor(
    private configService: ConfigService,
    private adminManagerService: AdminManagerService,
    private seoService: SEOService,
    private routingService: RoutingService,
    private adminAuthService: AdminAuthService,
  ) { }

  ngOnInit() {
    this.updateAuth();
    this.getAdmins();
    this.seoUpdate();
  }

  get adminUrl() {
    return this.configService.adminURL;
  }
  
  private updateAuth() {
    this.adminAuthService.admin.subscribe(res => {
      if (res) {
        const data = this.configService.isRootAdmin(res);
        if (!data) {
          this.routingService.replace(['/' + this.adminUrl + '/dashboard']);
        }
      }
    });
  }

  private getAdmins() {
    this.adminManagerService.getAll(this.limit, this.currPage)
    .subscribe(res => {
      if (res) {
        this.adminstrators = res.data;
        this.adminstratorCounts = res.counts;
      }
    });
  }

  delete(adm) {
    const x = 'Are you sure you want to delete ' + adm.username + '?';
    if (confirm(x)) {
      this.adminManagerService.delete(adm.id).subscribe(res => {
        if (res.status === 'success') {
          this.getAdmins();
        } else {
          alert('Oops! Something went wrong, we could not process your request.');
        }
      });
    }
  }

  private seoUpdate() {
    this.seoService.updateTitle('Admin Listing');
    this.seoService.updateDescription('Admin Listing');
  }

}
