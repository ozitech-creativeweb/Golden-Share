import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CurrencyService } from '../../../../data/services/currency.service';
import { ConfigService } from '../../../../data/services/config.service';
import { SEOService } from '../../../../data/services/seo.service';
import { RoutingService } from '../../../../data/helpers/routing.service';
import { AdminAuthService } from '../../../../data/services/admin-auth.service';

@Component({
  selector: 'app-currency-settings',
  templateUrl: './currency-settings.component.html',
  styleUrls: ['./currency-settings.component.scss']
})
export class CurrencySettingsComponent implements OnInit {
  isLoading = false;
  defaultCurrency: any;
  currencies: any;

  form = new FormGroup({
    country: new FormControl('', []),
    code: new FormControl('', []),
    symbol: new FormControl('', []),
  });

  formDefault = new FormGroup({
    id: new FormControl('', []),
  });

  constructor(
    private currencyService: CurrencyService,
    private configService: ConfigService,
    private seoService: SEOService,
    private routingService: RoutingService,
    private adminAuthService: AdminAuthService,
  ) { }

  get adminUrl() {
    return this.configService.adminURL;
  }

  ngOnInit() {
    this.updateAuth();
    this.getCurrency();
    this.seoUpdate();
  }
  
  private updateAuth() {
    this.adminAuthService.admin.subscribe(res => {
      if (res) {
        const data = this.configService.isRootAdmin(res);
        if (!data) {
          this.routingService.replace(['/' + this.adminUrl + '/dashboard']);
        }
      }
    });
  }

  submit() {
    this.isLoading = true;
    const data = JSON.stringify(this.form.value);
    this.currencyService.add(data).subscribe(res => {
      if (res && res.status === 'success') {
        this.currencyService.currencyDefault().subscribe();
        alert('Currency Added Successfully!');
      } else {
        alert('Oops! Someth went wrong, we could not process your request.');
      }
      this.isLoading = false;
    });
  }

  submitDefault() {
    this.isLoading = true;
    const data = JSON.stringify(this.formDefault.value);
    this.currencyService.setDefault(data).subscribe(res => {
      if (res && res.status === 'success') {
        this.currencyService.currencyDefault().subscribe();
        alert('Currency Updated Successfully!');
      } else {
        alert('Oops! Someth went wrong, we could not process your request.');
      }
      this.isLoading = false;
    });
  }

  private getCurrency() {
    this.currencyService.getCurrency.subscribe(res => {
      this.defaultCurrency = res;
      this.formDefault.get('id').setValue(res.id);
      this.currencies = res.currencies;
    });
  }

  private seoUpdate() {
    this.seoService.updateTitle('Currency Settings');
    this.seoService.updateDescription('Currency Settings');
  }

}
