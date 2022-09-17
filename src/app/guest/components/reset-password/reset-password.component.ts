import { StorageService } from '../../../data/helpers/storage.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../data/services/auth.service';
import { SEOService } from '../../../data/services/seo.service';
import { RoutingService } from '../../../data/helpers/routing.service';
import { PagesService } from '../../../data/services/administrator/pages.service';
import { ActivatedRoute } from '@angular/router';
import { GeneralSettingsService } from 'src/app/data/services/guest/general-settings.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  auth: any;
  error: any;
  webSet: any;
  success: any;
  isLoading = false;
  banks: any;
  refferalID : any;
  verySuccess: any;

  // for username
  form = new FormGroup({
    password: new FormControl('', [
      Validators.minLength(6),
      Validators.required,
    ]),
    retypePassword: new FormControl('', [
      Validators.minLength(6),
      Validators.required,
    ]),
    email: new FormControl('', []),
  });

  get password() {
    return this.form.get('password');
  }
  get retypePassword() {
    return this.form.get('retypePassword');
  }

  constructor(
    private authService: AuthService,
    private storageservice: StorageService,
    private seoService: SEOService,
    private routingService: RoutingService,
    private route: ActivatedRoute,
    private generalSettingsService: GeneralSettingsService,
  ) { }

  ngOnInit() {
    const verifyCode = this.route.snapshot.paramMap.get('verify-code');
    if (verifyCode) {
      this.verify(verifyCode);
    } else {
      this.routingService.replace(['/']);
    }

    this.seoUpdate();
    this.getWebSettings();
  }

  private redirectTo(url: string) {
    // this.routingService.replace([url]);
    window.location.href = url;
  }


  private verify(code) {
    this.authService.verifyCode(code).subscribe(res => {
      if (res.status === 'success') {
        this.verySuccess = 'Email successfully verified, Type your new password';
        this.form.get('email').setValue(res.auth.email)
      } else {
        alert('Email verification failed');
        this.routingService.replace(['/forgot-password']);
      }
      this.isLoading = false;
    });
  }

  submit() {
    this.isLoading = true;
    this.error = null;
    this.success = null;
    const newPass = this.form.get('password').value;
    const retypePass = this.form.get('retypePassword').value;

    if(newPass !== retypePass){
      alert('Oops! Password does not matched');
      this.error = 'Oops! Password does not matched';
      this.isLoading = false;
    } else {
      this.isLoading = true;
      const data = JSON.stringify(this.form.value);
      this.authService.changePassword(data).subscribe(res => {
        if (res) {
          this.authService.storeAuthData(res);
          alert('Password successfully reset')
          this.routingService.replace(['/user/dashboard']);
        } else {
          this.error = 'Oops! Something went wrong, please try again.';
        }
        this.isLoading = false;
      });
    }
    

    
  }


  private getWebSettings() {
    this.generalSettingsService.getSettings.subscribe(res => {
      if (res) {
        this.webSet = res.generalSettings;
      }
    });
  }

  allowNum(ev) {
    if (ev.key) {
      if (isNaN(ev.key)) {
        if (ev.key === "Backspace" ||
          ev.key === "Tab" ||
          ev.key === "Alt" ||
          ev.key.indexOf('Arrow') > -1 ||
          ev.key === "Control" ||
          ev.key === "Shift" ||
          ev.key === "+" ||
          ev.key === "End" ||
          ev.key === "Home") {
          return;
        }
        ev.preventDefault();
      }
    } else {
      setTimeout(()=>{
        let inputVal = ev.target.value;
        if (isNaN(inputVal)) {
          ev.target.value = "";
        }
      });
    }
  }

  private seoUpdate() {
    this.seoService.updateTitle('Signup');
    // this.seoService.updateOgUrl('my title');
    this.seoService.updateDescription('Signup to access your account');
  }

}
