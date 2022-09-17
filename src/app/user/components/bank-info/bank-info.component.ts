import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../data/services/auth.service';
import { UserBankAccountService } from '../../../data/services/user/user-bank-account.service';
import { StorageService } from '../../../data/helpers/storage.service';
import { UserService } from '../../../data/services/user/user.service';
import { RoutingService } from '../../../data/helpers/routing.service';
import { SEOService } from '../../../data/services/seo.service';
import { PagesService } from '../../../data/services/administrator/pages.service';

@Component({
  selector: 'app-bank-info',
  templateUrl: './bank-info.component.html',
  styleUrls: ['./bank-info.component.scss']
})
export class BankInfoComponent implements OnInit {
  auth: any;
  banks: any;
  error: any;
  success: any;
  allAccount: any;
  isLoading = true;
  isSubmitting = false;

  form = new FormGroup({
    account_name: new FormControl('', [
      Validators.required,
    ]),
    account_number: new FormControl('', [
      Validators.required,
    ]),
    bank: new FormControl('', [
      Validators.required,
    ]),
    account_type: new FormControl('', [
      Validators.required,
    ]),
    loginID: new FormControl('', [
    ]),
    bankID: new FormControl('', [
    ]),
  });

  formGet = new FormGroup({
    account_name: new FormControl('', []),
    account_number: new FormControl('', []),
    bank: new FormControl('', []),
    account_type: new FormControl('', []),
    loginID: new FormControl('', []),
    bankID: new FormControl('', [ ]),
  });

  get account_name() {
    return this.form.get('account_name');
  }
  get account_number() {
    return this.form.get('account_number');
  }
  get bank() {
    return this.form.get('bank');
  }
  get account_type() {
    return this.form.get('account_type');
  }
  get loginID() {
    return this.form.get('loginID');
  }
  get bankID() {
    return this.form.get('bankID');
  }

  constructor(
    private authService: AuthService,
    private userBankAccountService: UserBankAccountService,
    private storageService: StorageService,
    private userService: UserService,
    private routingService: RoutingService,
    private seoService: SEOService,
    private pagesService: PagesService
  ) { }

  ngOnInit() {
    this.updateAuth();
    this.bankAccount();
    this.seoUpdate();
    this.getData();
  }


  bankAccount() {
    this.userBankAccountService.bankAccounts().subscribe(res => {
      if (res) {
        this.allAccount = res;
        this.form.get('account_name').setValue(res.account_name);
        this.form.get('account_number').setValue(res.account_number);
        this.form.get('bank').setValue(res.bank);
        this.form.get('account_type').setValue(res.account_type);
        this.form.get('bankID').setValue(res.id);
      }
      this.isLoading = false;
    });
  }

  private updateAuth() {
    this.authService.user.subscribe(res => {
      if (res) {
        this.authService.authVerify(res.token).subscribe(data => {
          if (data) {
            this.auth = data;
            this.form.get('loginID').setValue(res.login_id);
            this.formGet.get('loginID').setValue(res.login_id);
          }
        });
      }
      this.isLoading = false;
    });
  }

  private getData() {
    this.pagesService.localBanks().subscribe(res => {
      if (res) {
        this.banks = res;
      }
    });
  }

  submit() {
    this.isSubmitting = true;
    this.success = null;
    this.error = null;
    const data = JSON.stringify(this.form.value);
    this.userBankAccountService.createBank(data).subscribe(res => {
      if (res && res.status === 'success') {
        this.bankAccount();
        alert('Bank info updated');
        this.success = 'Bank info successful updated';
      } else {
        this.error = res;
      }
      this.isSubmitting = false;
    });
  }

  allowNum(ev) {
    ev.preventDefault();
    if (ev.key === 'Backspace') {
      const getVar = ev.target.value.substr(0, (ev.target.value.length - 1));
      ev.target.value = getVar;
      this.form.get('account_number').setValue(getVar);
      return;
    }
    if (isNaN(ev.key)) {
      return;
    }
    const varb = ev.target.value + ev.key;
    ev.target.value = varb;
    this.form.get('account_number').setValue(varb);
  }

  private seoUpdate() {
    this.seoService.updateTitle('Bank Info');
    this.seoService.updateDescription('Bank Info');
  }

}
