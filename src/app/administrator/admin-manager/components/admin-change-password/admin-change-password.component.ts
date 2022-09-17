import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfigService } from '../../../../data/services/config.service';
import { AdminManagerService } from '../../../../data/services/administrator/admin-manager.service';
import { AdminAuthService } from '../../../../data/services/admin-auth.service';
import { SEOService } from '../../../../data/services/seo.service';

@Component({
  selector: 'app-admin-change-password',
  templateUrl: './admin-change-password.component.html',
  styleUrls: ['./admin-change-password.component.scss']
})
export class AdminChangePasswordComponent implements OnInit {
  isUpdating = false;
  updateError: any;

  form = new FormGroup({
    oldPassword: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    confirmPass: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
  });

  constructor(
    private configService: ConfigService,
    private adminManagerService: AdminManagerService,
    private adminAuthService: AdminAuthService,
    private seoService: SEOService
  ) { }

  ngOnInit() {
    this.seoUpdate()
  }

  get adminUrl() {
    return this.configService.adminURL;
  }

  submit() {
    this.isUpdating = true;
    const data = JSON.stringify(this.form.value);
    console.log(data);
    this.adminManagerService.changePassword(data).subscribe(res => {
      if (res === 'success') {
        this.adminAuthService.logout();
      } else if (res === 'failed') {
        this.updateError = 'Oops! Something went wrong, please try it again.';
      } else {
        this.updateError = res;
      }
      this.isUpdating = false;
    });
  }

  private seoUpdate() {
    this.seoService.updateTitle('Change Password');
    this.seoService.updateDescription('Change Password');
  }

}
