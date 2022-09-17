import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../data/services/auth.service';
import { GeneralSettingsService } from '../../../data/services/guest/general-settings.service';
import { DonationsService } from '../../../data/services/user/donations.service';
import { CurrencyService } from '../../../data/services/currency.service';
import { ActivatedRoute } from '@angular/router';
import { RoutingService } from '../../../data/helpers/routing.service';
import { FileUploadService } from '../../../data/services/file-upload.service';
import { HttpEventType } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { WithdrawalsService } from '../../../data/services/user/withdrawals.service';
import { SEOService } from '../../../data/services/seo.service';

@Component({
  selector: 'app-incoming-orders',
  templateUrl: './incoming-orders.component.html',
  styleUrls: ['./incoming-orders.component.scss']
})
export class IncomingOrdersComponent implements OnInit {
  withdrawals: any;
  activationFees: any;
  withdrawalOther: any;
  withdrawalCount: any;
  auth: any;
  currency: any;
  isLoading = true;
  config: any;

  constructor(
    private authService: AuthService,
    private generalSettings: GeneralSettingsService,
    private currencyService: CurrencyService,
    private withdrawalsService: WithdrawalsService,
    private seoService: SEOService
  ) { }

  ngOnInit() {
    this.getAuth();
    this.getAuth();
    this.getConfig();
    this.getCurrency();
    this.getWithdrawals();
    this.seoUpdate();
  }

  countFrom(date) {
    return new Date(date);
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

  private getConfig() {
    this.generalSettings.configuration().subscribe(res => {
      this.config = res;
    });
  }

  private getCurrency() {
    this.currencyService.getCurrency.subscribe(res => {
      if (res) {
        this.currency = res;
      }
    });
  }

  private getWithdrawals() {
    this.isLoading = true;
    this.withdrawalsService.withdrawals().subscribe(res => {
      console.log(res);
      this.withdrawalOther = res;
      this.withdrawals = res.data;
      this.withdrawalCount = res.count;
      this.activationFees = res.activationFees;
      this.isLoading = false;
    });
  }

  approvePOP(activation) {
    const x = 'Are you sure you want to approve this payment.';
    if (confirm(x)) {
      this.withdrawalsService.approveActivationPOP(activation.login_id)
      .subscribe(res => {
        if (res.status === 'success') {
          alert('Payment confirmed successfully!');
          this.getWithdrawals();
        } else {
          alert('Oops! Something went wrong, please try it again.');
        }
      });
    }
  }

  private seoUpdate() {
    this.seoService.updateTitle('Withdrawals');
    this.seoService.updateDescription('Withdrawals');
  }

}
