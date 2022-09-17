import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DonationManagerService } from '../../../../data/services/administrator/donation-manager.service';
import { CurrencyService } from '../../../../data/services/currency.service';
import { SEOService } from '../../../../data/services/seo.service';
import { ConfigService } from '../../../../data/services/config.service';
import { RoutingService } from '../../../../data/helpers/routing.service';
import { AdminAuthService } from '../../../../data/services/admin-auth.service';

@Component({
  selector: 'app-manual-merging',
  templateUrl: './manual-merging.component.html',
  styleUrls: ['./manual-merging.component.scss']
})
export class ManualMergingComponent implements OnInit {

  success = false;
  isLoading: any;
  donations: any;
  withdrawals: any;
  currency: any;

  payers = [];

  form = new FormGroup({
    payers: new FormControl('', []),
    payee: new FormControl('', []),
  });

  constructor(
    private donationManagerService: DonationManagerService,
    private currencyService: CurrencyService,
    private seoService: SEOService,
    private configService: ConfigService,
    private routingService: RoutingService,
    private adminAuthService: AdminAuthService,
  ) { }

  ngOnInit() {
    this.updateAuth();
    this.getMergingList();
    this.getCurrency();
    this.seoUpdate();
  }
  
  private updateAuth() {
    this.adminAuthService.admin.subscribe(res => {
      if (res) {
        const data = this.configService.isRootAdmin(res);
        if (!data) {
          this.routingService.replace(['/' + this.configService.adminURL + '/dashboard']);
        }
      }
    });
  }

  private getMergingList(){
    this.donationManagerService.donationForMerging().subscribe(res => {
      if(res){
        this.donations = res.donations;
        this.withdrawals = res.withdrawals;
      }
    });
  }

  private getCurrency() {
    this.currencyService.getCurrency.subscribe(res => {
      this.currency = res;
    });
  }


  payersChange(event){
    const value = event.target.value;
    this.payers.push(value);
    this.form.get('payers').setValue(this.payers);
  }

  submit() {
    this.isLoading = true;
    const data = JSON.stringify(this.form.value);
    this.donationManagerService.createMerging(data).subscribe(res => {
      this.getMergingList();
      this.form.reset();
      this.payers = [];
      this.success = true;
      this.isLoading = false;
    });
  }

  private seoUpdate() {
    this.seoService.updateTitle('Manual Merging');
    this.seoService.updateDescription('Manual Merging');
  }
  

}
