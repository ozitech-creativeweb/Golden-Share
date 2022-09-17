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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  auth: any;
  webSet: any;
  error: any;
  success: any;
  isLoading = false;
  banks: any;
  refferalID : any;

  // for username
  form = new FormGroup({
    first_name: new FormControl('', [
      Validators.minLength(4),
      Validators.required,
    ]),
    last_name: new FormControl('', [
      Validators.minLength(4),
      Validators.required,
    ]),
    username: new FormControl('', [
      Validators.minLength(4),
      Validators.required,
    ]),
    email: new FormControl('', [
      Validators.required,
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(18),
    ]),
    account_name: new FormControl('', [
      Validators.required,
    ]),
    account_number: new FormControl('', [
      Validators.required,
    ]),
    bank: new FormControl('', [
      Validators.required,
    ]),
    com_password: new FormControl('', [
      Validators.required,
    ]),
    // loginID: new FormControl('', [
    // ]),
    // bankID: new FormControl('', [
    // ]),
    // agree: new FormControl('', [
    //   Validators.required,
    // ]),
    referral: new FormControl('', []),
  });

  get first_name() {
    return this.form.get('first_name');
  }
  get last_name() {
    return this.form.get('last_name');
  }
  get username() {
    return this.form.get('username');
  }
  get phone() {
    return this.form.get('phone');
  }
  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }
  get account_name() {
    return this.form.get('account_name');
  }
  get account_number() {
    return this.form.get('account_number');
  }
  get bank() {
    return this.form.get('bank');
  }
  get com_password() {
    return this.form.get('com_password');
  }
  // get loginID() {
  //   return this.form.get('loginID');
  // }
  // get bankID() {
  //   return this.form.get('bankID');
  // }

  constructor(
    private authService: AuthService,
    private storageservice: StorageService,
    private seoService: SEOService,
    private routingService: RoutingService,
    private pagesService: PagesService,
    private route: ActivatedRoute,
    private generalSettingsService: GeneralSettingsService,
  ) { }

  ngOnInit() {

    const refID = this.route.snapshot.paramMap.get('referralID');
    if(refID){
      this.storageservice.storeString('refID', refID);
    }

    if (this.storageservice.hasKey('refID')) {
      // tslint:disable-next-line: radix
      const refID = this.storageservice.getString('refID');
      this.refferalID = refID;
      this.form.get('referral').setValue(refID);
    }
    this.seoUpdate();
    this.getData();
    this.getWebSettings();
  }

  private redirectTo(url: string) {
    // this.routingService.replace([url]);
    window.location.href = url;
  }

  private getData() {
    this.pagesService.localBanks().subscribe(res => {
      if (res) {
        this.banks = res;
      }
    });
  }

  submit() {
    this.isLoading = true;
    this.error = null;
    this.success = null;
    const comPass = this.form.get("com_password").value;
    const pass = this.form.get("password").value;
    if(pass != comPass){
      this.error = "Oops! the two password not matched";
      alert(this.error);
      return;
    }
    const data = JSON.stringify(this.form.value);
    this.authService.signUp(data).subscribe(res => {
      if (res && res.login_id) {
        if (this.storageservice.hasKey('refID')) {
          this.storageservice.remove('refID');
        }
        this.form.reset();
        this.routingService.replace(['/user/dashboard']);
        this.success = 'Registration is successfull. A link has been sent to your email, click on the link to verify your email. Thank you';
      } else {
        this.error = res;
      }
      this.isLoading = false;
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

  private getWebSettings() {
    this.generalSettingsService.getSettings.subscribe(res => {
      if (res) {
        this.webSet = res.generalSettings;
      }
    });
  }

  private seoUpdate() {
    this.seoService.updateTitle('Signup');
    // this.seoService.updateOgUrl('my title');
    this.seoService.updateDescription('Signup to access your account');
  }

}
