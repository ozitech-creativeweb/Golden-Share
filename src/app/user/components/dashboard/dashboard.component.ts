import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserBankAccountService } from '../../../data/services/user/user-bank-account.service';
import { AuthService } from '../../../data/services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { FileUploadService } from '../../../data/services/file-upload.service';
import { HttpEventType } from '@angular/common/http';
import { UserService } from '../../../data/services/user/user.service';
import { GeneralSettingsService } from '../../../data/services/guest/general-settings.service';
import { RoutingService } from '../../../data/helpers/routing.service';
import { CurrencyService } from '../../../data/services/currency.service';
import { DonationsService } from '../../../data/services/user/donations.service';
import { WithdrawalsService } from '../../../data/services/user/withdrawals.service';
import { SEOService } from '../../../data/services/seo.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  accountDetails: any;
  auth: any;
  refInfo: any;
  successUpdate: string;
  config: any;
  settings: any;
  currency: any;
  donationOther: any;
  withdrawalOther: any;
  withdrawals: any;
  activationFees: any;
  donations: any;
  totalDonation = 0;
  totalWithdrawn = 0;
  refEarnings = 0;
  isLoading = true;
  unreadNewsContent: any;
  mergedOrders: any;
  mergedOrdersWithdraws: any;
  referralList: any;
  totalAmount = 0;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private generalSettings: GeneralSettingsService,
    private currencyService: CurrencyService,
    private donationsService: DonationsService,
    private withdrawalsService: WithdrawalsService,
    private seoService: SEOService
  ) { }

  get rank() {
    let refCount = 0;
    if (this.referralList && this.referralList[0].list) {
      refCount = this.referralList[0].list.length;
    }

    if (this.config) {
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
    this.getAuth();
    this.getCurrency();
    this.getConfig();
    this.getSettings();
    this.getDonation();
    this.getWithdrawals();
    this.getReferrals();
    this.unreadNews();
    this.getMergedOrders();
    this.seoUpdate();
    this.getMergedOrdersWithdraw();
    this.refDetail();
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

  private getCurrency() {
    this.currencyService.getCurrency.subscribe(res => {
      if (res) {
        this.currency = res;
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

  private getDonation() {
    this.isLoading = true;
    this.donationsService.donations().subscribe(res => {
      this.donationOther = res;
      this.donations = res.data;
      this.totalDonation = res.paid;
      this.isLoading = false;
    });
  }

  private getWithdrawals() {
    this.isLoading = true;
    this.withdrawalsService.withdrawals().subscribe(res => {
      
      this.withdrawalOther = res;
      this.withdrawals = res.data;
      this.totalWithdrawn = res.withdrawn;
      this.activationFees = res.activationFees;
      this.totalAmount = res.auctionSum;
      this.isLoading = false;
    });
  }

  private getReferrals() {
    this.userService.referrals().subscribe((res) => {
      if (res) {
        this.referralList = res.downlinesTree;
        this.refEarnings = res.earnings;
      }
      this.isLoading = false;
    });
  }

  private unreadNews() {
    this.userService.unreadNews().subscribe((res) => {
      if (res) {
        this.unreadNewsContent = res;
      }
      this.isLoading = false;
    });
  }
  private getMergedOrders() {
    this.donationsService.mergeOrder().subscribe((res) => {
      if (res) {
        this.mergedOrders = res;
      }
      this.isLoading = false;
    });
  }
  private getMergedOrdersWithdraw() {
    this.withdrawalsService.mergeOrder().subscribe((res) => {
      if (res) {
        this.mergedOrdersWithdraws = res;
      }
      this.isLoading = false;
    });
  }

  countFrom(date) {
    return new Date(date);
  }

  private seoUpdate() {
    this.seoService.updateTitle('User Dashboard');
    this.seoService.updateDescription('User Dashboard');
  }

}
