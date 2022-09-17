import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../../../data/services/auth.service';
import { GeneralSettingsService } from '../../../data/services/guest/general-settings.service';
import { DonationsService } from '../../../data/services/user/donations.service';
import { CurrencyService } from '../../../data/services/currency.service';
import { WithdrawalsService } from '../../../data/services/user/withdrawals.service';
import { SEOService } from '../../../data/services/seo.service';

@Component({
  selector: 'app-reserved-orders',
  templateUrl: './reserved-orders.component.html',
  styleUrls: ['./reserved-orders.component.scss']
})
export class ReservedOrdersComponent implements OnInit {
  donations: any;
  donationOther: any;
  auth: any;
  currency: any;
  isLoading = true;
  config: any;

  constructor(
    private authService: AuthService,
    private generalSettings: GeneralSettingsService,
    private donationsService: DonationsService,
    private currencyService: CurrencyService,
    private seoService: SEOService
  ) { }

  ngOnInit() {
    this.getAuth();
    this.getConfig();
    this.getCurrency();
    this.getDonation();
    this.seoUpdate()
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

  private getDonation() {
    this.isLoading = true;
    this.donationsService.donations().subscribe(res => {
      this.donationOther = res;
      this.donations = res.data;
      this.isLoading = false;
    });
  }

  private seoUpdate() {
    this.seoService.updateTitle('Donations');
    this.seoService.updateDescription('Donations');
  }

}
