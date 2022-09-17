import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../data/services/auth.service';
import { UserService } from '../../../data/services/user/user.service';
import { RoutingService } from '../../../data/helpers/routing.service';
import { SEOService } from '../../../data/services/seo.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {
  isLoading = false;
  auth: any;
  successChange: any;
  isLoading2: any;
  successResend: any;

  changeEmailForm = new FormGroup({
    email: new FormControl('', [
      Validators.required
    ]),
    loginID: new FormControl('', []),
  });

  resendForm = new FormGroup({
    email: new FormControl('', []),
    loginID: new FormControl('', []),
  });

  get email() {
    return this.changeEmailForm.get('email');
  }

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private routingService: RoutingService,
    private seoService: SEOService
  ) { }

  ngOnInit() {
    this.getAuth();
    this.seoUpdate();
  }

  private getAuth() {
    this.authService.user.subscribe(res => {
      if (res) {
        this.authService.authVerify(res.token).subscribe(data => {
          if (data) {
            this.auth = data;
            this.changeEmailForm.get('email').setValue(data.email);
            this.changeEmailForm.get('loginID').setValue(data.login_id);

            
            this.resendForm.get('email').setValue(data.email);
            this.resendForm.get('loginID').setValue(data.login_id);
          }
        });
      }
    });
  }

  submit() {
    this.isLoading = true;
    const data = JSON.stringify(this.changeEmailForm.value);
    this.userService.changeEmail(data).subscribe(res => {
      if (res) {
        // this.authService.storeAuthData(res);
        alert('Email changed');
        this.successChange = 'You have successfully change your email';
      }
      this.isLoading = false;
    });
  }

  submitLink() {
    this.isLoading2 = true;
    const data = JSON.stringify(this.resendForm.value);
    this.userService.resendLink(data).subscribe(res => {
      if (res) {
        // this.authService.storeAuthData(res);
        alert('Email sent');
        this.successResend = 'Email has been resent to your inbox';
      }
      this.isLoading2 = false;
    });
  }

  private seoUpdate() {
    this.seoService.updateTitle('Verify Email');
    this.seoService.updateDescription('Verify Email');
  }

}
