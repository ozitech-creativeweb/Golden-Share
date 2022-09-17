import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserBankAccountService } from '../../../data/services/user/user-bank-account.service';
import { AuthService } from '../../../data/services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { FileUploadService } from '../../../data/services/file-upload.service';
import { HttpEventType } from '@angular/common/http';
import { UserService } from '../../../data/services/user/user.service';
import { GeneralSettingsService } from '../../../data/services/guest/general-settings.service';
import { CurrencyService } from '../../../data/services/currency.service';
import { SEOService } from '../../../data/services/seo.service';

@Component({
  selector: 'app-referrals',
  templateUrl: './referrals.component.html',
  styleUrls: ['./referrals.component.scss']
})
export class ReferralsComponent implements OnInit, AfterViewInit {
  heightList = [];
  toggleH = { open: true, owner: 0 };
  earnings = 0;
  balance = 0;
  withdrawn = 0;
  currency: any;
  config: any;
  settings: any;
  auth: any;
  isLoading = true;

  referralList: any;
  refInfo: any;

  constructor(
    private userservice: UserService,
    private currencyService: CurrencyService,
    private generalSettings: GeneralSettingsService,
    private authService: AuthService,
    private seoService: SEOService,
    private userService: UserService
  ) { }

  get rank() {
    let refCount = 0;
    if (this.referralList && this.referralList[0].list) {
      refCount = this.referralList[0].list.length;
    }
    if (this.config && this.config.guider_qualification) {
      if (refCount >= this.config.guider_qualification && refCount < this.config.manager_qualification) {
        return 'Guider';
      } else if (refCount >= this.config.manager_qualification) {
        return 'Manager';
      } else {
        return null;
      }
    }
  }

  ngOnInit() {
    this.getReferrals();
    this.getCurrency();
    this.getConfig();
    this.getSettings();
    this.getAuth();
    this.seoUpdate();
    this.refDetail();
  }

  ngAfterViewInit() {
    const actHeightEl = document.querySelectorAll('.actHeight');
    if (actHeightEl.length === 0) {
      setTimeout(() => {
        this.ngAfterViewInit();
      }, 1000);
      return;
    }

    for (let i = 0; i < actHeightEl.length; i++) {
      const actH = +getComputedStyle(actHeightEl[i.toString()]).height.replace('px', '');
      this.heightList.push(actH);
    }
  }

  getReferrals() {
    this.userservice.referrals().subscribe((res) => {
      console.log(res);
      if (res) {
        this.referralList = res.downlinesTree;
        console.log(this.referralList);
        this.earnings = res.earnings;
        this.balance = res.balance;
        this.withdrawn = res.withdrawn;
      }
      this.isLoading = false;
    });
  }

  copyRefLink(inp, btn) {
    inp.select();
    document.execCommand('copy');
    btn.innerHTML = "Copied";
    document.oncopy = () => {
      btn.innerHTML = "Copy";
      document.oncopy = null;
    }
  }

  private getCurrency() {
    this.currencyService.getCurrency.subscribe(res => {
      if (res) {
        this.currency = res;
      }
    });
  }

  private getConfig() {
    this.generalSettings.getConfiguration.subscribe(res => {
      this.config = res;
    });
  }

  private getSettings() {
    this.generalSettings.getSettings.subscribe(res => {
      this.settings = res.generalSettings;
    });
  }
  private getAuth() {
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


  withdraw() {
    // if (this.balance < this.config.min_invest_amount) {
    if (this.balance < this.config.min_invest_amount) {
      alert('Available balance is less than minimum withdraw amount!');
      return;
    }
    this.userservice.withdraw(this.balance).subscribe(res => {
      if (res.status === 'success') {
        alert('Withdrawal request submitted successfully!');
        this.ngOnInit();
      }
    });
  }


  private refDetail() {
    this.userService.refInfo().subscribe(res => {
      if (res) {
        this.refInfo = res.refDet;
      }
    });
  }

  private seoUpdate() {
    this.seoService.updateTitle('Referrals');
    this.seoService.updateDescription('Referrals');
  }
}
