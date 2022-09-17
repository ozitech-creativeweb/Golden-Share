import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../../data/services/user/user.service';
import { AuthService } from '../../../data/services/auth.service';
import { RoutingService } from '../../../data/helpers/routing.service';
import { User } from '../../../data/model/user';
import { SEOService } from '../../../data/services/seo.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  auth: User;
  isLoading = false;
  success: string;
  failed: string;

  form = new FormGroup({
    // currentpwd: new FormControl('', [
    //   Validators.required
    // ]),

    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
  });

  // get currentpwd() {
  //   return this.form.get('currentpwd');
  // }
  get newPassword() {
    return this.form.get('newPassword');
  }

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private routingService: RoutingService,
    private seoService: SEOService
  ) { }

  ngOnInit() {
    this.updateAuth();
    this.seoUpdate();
  }

  private updateAuth() {
    this.authService.user.subscribe(res => {
      if (res) {
        this.authService.authVerify(res.token).subscribe(data => {
          if (data) {
            this.auth = data;
          }
        });
      }
    });
  }

  submit() {
    this.isLoading = true;
    const data =  JSON.stringify(this.form.value);
    this.userService.chnage_password(data).subscribe(res => {
      if (res && res.status === 'success') {
        this.success = 'Your password updated successfully!';
        this.failed = null;
        this.form.reset();
      } else if (res) {
        this.failed = res;
        this.success = null;
      } else {
        this.failed = 'Oops! We could not update your request.';
        this.success = null;
      }
      this.isLoading = false;
    });
  }

  private seoUpdate() {
    this.seoService.updateTitle('Change Password');
    this.seoService.updateDescription('Change Password');
  }

}
