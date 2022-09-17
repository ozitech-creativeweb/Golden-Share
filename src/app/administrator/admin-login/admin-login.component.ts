import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminAuthService } from '../../data/services/admin-auth.service';
import { ConfigService } from '../../data/services/config.service';
import { SEOService } from '../../data/services/seo.service';
import { GeneralSettingsService } from '../../data/services/guest/general-settings.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  isLoading = false;
  authError: any;
  projectName: string;
  settings: any;

  form = new FormGroup({
    username: new FormControl('', [
      Validators.minLength(4)
    ]),
    password: new FormControl('', [
      Validators.required
    ]),
  });

  constructor(
    private adminAuthService: AdminAuthService,
    private configService: ConfigService,
    private generalSettingsService: GeneralSettingsService,
    private seoService: SEOService,
  ) {}

  ngOnInit() {
    this.getSettings();
    this.seoUpdate();
    this.adminAuthService.admin.subscribe(auth => {
      if (auth) {
        this.redirectTo('/administrator/dashboard');
      }
    });
  }

  onSubmit() {
    this.isLoading = true;
    this.form.setErrors({
      invalidLogin: true
    });
    const username = this.form.value.username;
    const password = this.form.value.password;
    this.adminAuthService.login(username, password).subscribe(
      resData => {
        if (resData && resData.id) {
          this.authError = null;
          this.adminAuthService.storeAdminAuthData(resData);
          this.redirectTo('/administrator/dashboard');
        } else {
          this.authError = resData;
        }
        this.isLoading = false;
      },
      err => {
        console.log(err);
        this.isLoading = false;
      }
    );
  }

  private redirectTo(url: string) {
    window.location.href = url;
  }

  private seoUpdate() {
    this.seoService.updateTitle('Aministrative Login Only');
    this.seoService.updateDescription('Aministrative Login Only');
  }

  private getSettings() {
    this.generalSettingsService.getSettings.subscribe(res => {
      this.settings = res;
    });
  }
}
