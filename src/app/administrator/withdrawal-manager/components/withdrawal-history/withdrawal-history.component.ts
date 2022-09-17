import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../../data/services/config.service';
import { ActivatedRoute } from '@angular/router';
import { RoutingService } from '../../../../data/helpers/routing.service';
import { CurrencyService } from '../../../../data/services/currency.service';
import { ConfigurationManagerService } from '../../../../data/services/administrator/configuration-manager.service';
import { WithdrawalManagerService } from '../../../../data/services/administrator/withdrawal-manager.service';
import { SEOService } from '../../../../data/services/seo.service';


@Component({
  selector: 'app-withdrawal-history',
  templateUrl: './withdrawal-history.component.html',
  styleUrls: ['./withdrawal-history.component.scss']
})
export class WithdrawalHistoryComponent implements OnInit {

  orders: any;
  currency: any;
  config: any;
  constructor(
    private configService: ConfigService,
    private route: ActivatedRoute,
    private routingService: RoutingService,
    private currencyService: CurrencyService,
    private ConfigurattionManagerService: ConfigurationManagerService,
    private withdrawalManagerService: WithdrawalManagerService,
    private seoService: SEOService
  ) { }

  ngOnInit() {
    const id  = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getPage(id);
    } else {
      this.routingService.replace([
        '/' + this.adminUrl + '/withdrawal-manager/pages'
      ]);
    }
    this.getCurrency();
    this.getConfig();
    this.seoUpdate()
  }

  private getPage(id){
    this.withdrawalManagerService.withdrawalOrder(id).subscribe(res => {
      if(res.status === 'success'){
        this.orders = res.data;
      }
      console.log(res)
    })
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

  approveWithdrawal(withID: number) {
    if (confirm('Are you sure you want to Approve this withdrawal?') ) {
      this.withdrawalManagerService.approveWithdrawal(withID).subscribe(res => {
        if(res){
          alert('Withdrawal successfully approved');
        }
      });
    }
  }

  private seoUpdate() {
    this.seoService.updateTitle('Withdrawal History');
    this.seoService.updateDescription('Withdrawal History');
  }

}
