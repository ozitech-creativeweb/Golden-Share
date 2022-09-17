import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../../data/services/config.service';
import { DonationManagerService } from '../../../../data/services/administrator/donation-manager.service';
import { ActivatedRoute } from '@angular/router';
import { RoutingService } from '../../../../data/helpers/routing.service';
import { CurrencyService } from '../../../../data/services/currency.service';
import { ConfigurationManagerService } from '../../../../data/services/administrator/configuration-manager.service';
import { SEOService } from '../../../../data/services/seo.service';

@Component({
  selector: 'app-merged-order',
  templateUrl: './merged-order.component.html',
  styleUrls: ['./merged-order.component.scss']
})
export class MergedOrderComponent implements OnInit {
  order: any;
  currency: any;
  config: any;
  constructor(
    private configService: ConfigService,
    private donationManagerService: DonationManagerService,
    private route: ActivatedRoute,
    private routingService: RoutingService,
    private currencyService: CurrencyService,
    private ConfigurattionManagerService: ConfigurationManagerService,
    private seoService: SEOService
  ) { }

  ngOnInit() {
    const id  = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getData(id);
    } else {
      this.routingService.replace([
        '/' + this.adminUrl + '/donation-manager/merged-orders'
      ]);
    }
    this.getCurrency();
    this.getConfig();
    this.seoUpdate();
  }

  private getData(id) {
    this.donationManagerService.mergedOrder(id).subscribe(res => {
      if (res.status === 'success') {
        this.order = res.data;
      }
    });
  }

  private getCurrency() {
    this.currencyService.getCurrency.subscribe(res => {
      this.currency = res;
    });
  }

  private getConfig() {
    this.ConfigurattionManagerService.getConfiguration().subscribe(res => {
      this.config = res;
    });
  }

  get adminUrl() {
    return this.configService.adminURL;
  }

  approvePop(popID: number) {
    if (confirm('Are you sure you want to Approve this POP?') ) {
      this.donationManagerService.approvePOP(popID).subscribe(res => {
        if (res) {
          this.ngOnInit();
          alert('POP successfully approved');
        }
      });
    }
  }

  private seoUpdate() {
    this.seoService.updateTitle('Donation History');
    this.seoService.updateDescription('Donation History');
  }

}
