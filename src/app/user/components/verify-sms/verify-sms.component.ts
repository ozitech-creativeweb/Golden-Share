import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../data/services/auth.service';
import { UserService } from '../../../data/services/user/user.service';
import { RoutingService } from '../../../data/helpers/routing.service';
import { SEOService } from '../../../data/services/seo.service';

@Component({
  selector: 'app-verify-sms',
  templateUrl: './verify-sms.component.html',
  styleUrls: ['./verify-sms.component.scss']
})
export class VerifySMSComponent implements OnInit {
  isLoading = false;
  auth: any;
  successChange: any;
  isLoading2: any;
  successResend: any;
  success = false;
  failed = false;
  verifying = false;

  form = new FormGroup({
    phone: new FormControl('', [
      Validators.required
    ]),
    loginID: new FormControl('', []),
  });

  resendForm = new FormGroup({
    phone: new FormControl('', []),
    loginID: new FormControl('', []),
  });

  verifyForm = new FormGroup({
    code: new FormControl('', [
      Validators.required
    ]),
    loginID: new FormControl('', []),
  });

  get phone() {
    return this.form.get('phone');
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
            this.form.get('phone').setValue(data.phone);
            this.form.get('loginID').setValue(data.login_id);

            this.resendForm.get('phone').setValue(data.phone);
            this.resendForm.get('loginID').setValue(data.login_id);
          }
        });
      }
    });
  }

  submit() {
    this.isLoading = true;
    this.successChange = null;
    const data = JSON.stringify(this.form.value);
    this.userService.changePhone(data).subscribe(res => {
      if (res) {
        if (res.status === 'success') {
          alert('Phone Number changed');
          this.successChange = 'You have successfully change your Phone Number';
        } else {
          this.form.get('phone').setValue(this.auth.phone);
          alert('Oops! It seems Phone Number already in use in the system.');
        }
      }
      this.isLoading = false;
    });
  }

  submitLink() {
    this.isLoading2 = true;
    const data = JSON.stringify(this.resendForm.value);
    this.userService.resendSMS().subscribe(res => {
      if (res) {
        alert('Verification Code sent to your Phone');
        this.successResend = 'Verification Code has been sent to your Phone';
      }
      this.isLoading2 = false;
    });
  }

  verifyCode() {
    this.verifying = true;
    this.authService.verifyCode(this.verifyForm.value.code).subscribe(res => {
      if (res.status === 'success') {
        this.success = true;
        this.failed = false;
        alert('Phone verified successfully');
        this.routingService.replace(['/user/dashboard']);
      } else {
        this.failed = true;
        this.success = false;
      }
      this.verifying = false;
    });
  }

  allowNum(ev) {
    ev.preventDefault();
    if (ev.key === "Backspace") {
      const getVar = ev.target.value.substr(0, (ev.target.value.length - 1));
      ev.target.value = getVar;
      this.form.get('phone').setValue(getVar);
      return;
    }
    if (isNaN(ev.key)) {
      return;
    }
    const varb = ev.target.value + ev.key;
    ev.target.value = varb;
    this.form.get('phone').setValue(varb);
  }

  private seoUpdate() {
    this.seoService.updateTitle('Verify SMS');
    this.seoService.updateDescription('Verify SMS');
  }

}
