import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../../data/services/config.service';
import { AdminAuthService } from '../../../../data/services/admin-auth.service';
import { GeneralSettingsService } from '../../../../data/services/guest/general-settings.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {
  generalSetting: any;
  adm: any;

  constructor(
    private configService: ConfigService,
    private adminAuthService: AdminAuthService,
    private generalSettingsService: GeneralSettingsService,
  ) { }

  ngOnInit() {
    this.getSettings();
    this.updateAuth();
  }

  get adminUrl() {
    return this.configService.adminURL;
  }

  private updateAuth() {
    this.adminAuthService.admin.subscribe(res => {
      if (res) {
        this.adm = res;
      }
    });
  }

  private getSettings() {
    this.generalSettingsService.getSettings.subscribe(res => {
      if (res) {
        this.generalSetting = res.generalSettings;
      }
    });
  }

  logout() {
    this.adminAuthService.logout();
  }

}
