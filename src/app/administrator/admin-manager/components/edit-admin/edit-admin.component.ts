import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../../data/services/config.service';
import { SEOService } from '../../../../data/services/seo.service';
import { AdminAuthService } from '../../../../data/services/admin-auth.service';
import { RoutingService } from '../../../../data/helpers/routing.service';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.scss']
})
export class EditAdminComponent implements OnInit {
  isLoading = false;
  isAdding = false;
  adm: any;
  updateSuccess: any;

  constructor(
    private configService: ConfigService,
    private seoService: SEOService,
    private routingService: RoutingService,
    private adminAuthService: AdminAuthService,
  ) { }

  ngOnInit() {
    this.updateAuth();
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

  getFeedback(data) {
    this.updateSuccess = data;
    alert(data);
  }

  getAdminInfo(data) {
    this.adm = data;
  }

  private seoUpdate() {
    this.seoService.updateTitle('Edit Admin');
    this.seoService.updateDescription('Edit Admin');
  }
}
