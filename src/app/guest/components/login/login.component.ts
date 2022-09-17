import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../data/services/auth.service';
import { Router } from '@angular/router';
import { SEOService } from '../../../data/services/seo.service';
import { RoutingService } from '../../../data/helpers/routing.service';
import { StorageService } from '../../../data/helpers/storage.service';
import { GeneralSettingsService } from 'src/app/data/services/guest/general-settings.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  authError: any;
  webSet: any;
  auth: any;
  returnUrl: string;

  error: any;

  // for username
  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.required,
    ]),
  });

  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }

  constructor(
    private route: Router,
    private authService: AuthService,
    private seoService: SEOService,
    private routingService: RoutingService,
    private storageService: StorageService,
    private generalSettingsService: GeneralSettingsService,
  ) { }

  ngOnInit() {
    this.seoUpdate();
    this.checkAuth();
    this.getWebSettings();
  }

  onSubmit() {
    this.authError = null;
    this.isLoading = true;
    this.form.setErrors({
      invalidLogin: true
    });
    const username = this.form.value.email;
    const password = this.form.value.password;
    this.authService.login(username, password).subscribe(res => {
      if (res && res.login_id) {
        this.authError = null;
        this.authService.storeAuthData(res);
        this.redirectTo('/user/dashboard');
      } else {
        this.authError = res;
      }
      this.isLoading = false;
    },
    err => {
      console.log(err);
      this.isLoading = false;
    });
  }

  private checkAuth() {
    this.authService.user.subscribe(auth => {
      if (auth) {
        this.redirectTo('/user/dashboard');
      }
    });
  }

  private getWebSettings() {
    this.generalSettingsService.getSettings.subscribe(res => {
      if (res) {
        this.webSet = res.generalSettings;
      }
    });
  }

  private seoUpdate() {
    this.seoService.updateTitle('Login');
    // this.seoService.updateOgUrl('my title');
    this.seoService.updateDescription('Login to access your account');
  }

  private redirectTo(url: string) {
    if (this.storageService.hasKey('returnUrl')) {
      const returnUrl = this.storageService.getString('returnUrl');
      // this.storageService.remove('returnUrl');
      this.routingService.replace([returnUrl]);
    } else {
      this.routingService.replace([url]);
    }
  }


}
