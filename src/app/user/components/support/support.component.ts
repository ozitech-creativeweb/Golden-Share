import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserBankAccountService } from '../../../data/services/user/user-bank-account.service';
import { AuthService } from '../../../data/services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { FileUploadService } from '../../../data/services/file-upload.service';
import { HttpEventType } from '@angular/common/http';
import { UserService } from '../../../data/services/user/user.service';
import { GeneralSettingsService } from '../../../data/services/guest/general-settings.service';
import { RoutingService } from '../../../data/helpers/routing.service';
import { SEOService } from '../../../data/services/seo.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {
  
  auth: any;
  

  form = new FormGroup({
    loginID: new FormControl('', []),
    pop: new FormControl('', []),
  });
  get pop() {
    return this.form.get('pop');
  }


  constructor(
    private userBankAccountservice: UserBankAccountService,
    private authService: AuthService,
    private fileUploadService: FileUploadService,
    private userService: UserService,
    private generalSettings: GeneralSettingsService,
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
            this.form.get('loginID').setValue(data.login_id);
          }
        });
      }
    });
  }

  private seoUpdate() {
    this.seoService.updateTitle('Support');
    this.seoService.updateDescription('Support');
  }
 
}
