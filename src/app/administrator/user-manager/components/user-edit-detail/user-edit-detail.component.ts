import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserManagerService } from '../../../../data/services/administrator/user-manager.service';
import { ConfigService } from '../../../../data/services/config.service';
import { SEOService } from '../../../../data/services/seo.service';

@Component({
  selector: 'app-user-edit-detail',
  templateUrl: './user-edit-detail.component.html',
  styleUrls: ['./user-edit-detail.component.scss']
})
export class UserEditDetailComponent implements OnInit {
  isLoading = false;
  customer: any;
  updateError: string;

  form = new FormGroup({
    loginID: new FormControl('', []),
    first_name: new FormControl('', []),
    last_name: new FormControl('', []),
    email: new FormControl('', []),
    phone: new FormControl('', []),
  });

  constructor(
    private route: ActivatedRoute,
    private userManagerService: UserManagerService,
    private configService: ConfigService,
    private seoService: SEOService
  ) { }

  get adminUrl() {
    return this.configService.adminURL;
  }

  ngOnInit() {
    const loginID = this.route.snapshot.paramMap.get('login-id');
    this.getCustomer(loginID);
    this.seoUpdate()
  }

  submit() {
    this.isLoading = true;
    this.updateError = null;
    const data = JSON.stringify(this.form.value);
    this.userManagerService.updateUser(data).subscribe(res => {
      if (res.login_id) {
        this.getCustomer(res.login_id);
      } else {
        this.updateError = 'Oops! Something went wrong, please ensure there is no email duplicate';
      }
      this.isLoading = false;
    });
  }

  private getCustomer(loginID) {
    this.userManagerService.getCustomer(loginID).subscribe(res => {
      this.customer = res.user;
      const user = res.user;
      this.form.get('loginID').setValue(user.login_id);
      this.form.get('first_name').setValue(user.first_name);
      this.form.get('last_name').setValue(user.last_name);
      this.form.get('email').setValue(user.email);
      this.form.get('phone').setValue(user.phone);
    });
  }

  private seoUpdate() {
    this.seoService.updateTitle('Edit User');
    this.seoService.updateDescription('Edit User');
  }

}
