import { Component, OnInit } from '@angular/core';
import { PagesService } from '../../../../data/services/administrator/pages.service';
import { ConfigService } from '../../../../data/services/config.service';
import { RoutingService } from '../../../../data/helpers/routing.service';
import { SEOService } from '../../../../data/services/seo.service';
import { CurrencyService } from '../../../../data/services/currency.service';
import { PackagesManagerService } from '../../../../data/services/administrator/packages-manager.service';


@Component({
  selector: 'app-admin-packages',
  templateUrl: './admin-packages.component.html',
  styleUrls: ['./admin-packages.component.scss']
})
export class AdminPackagesComponent implements OnInit {

  packages: any;
  pageCounts = 0;
  currency: any;

  constructor(
    private pagesService: PagesService,
    private packagesManagerService: PackagesManagerService,
    private configService: ConfigService,
    private routingService: RoutingService,
    private seoService: SEOService,
    private currencyService: CurrencyService
  ) { }

  get adminUrl() {
    return this.configService.adminURL;
  }

  ngOnInit() {
    this.seoUpdate();
    this.getPackages();
    this.getCurrency();
  }

  private getPackages() {
    this.packagesManagerService.getPackages().subscribe(res => {
      console.log(res);
      if(res){
        this.packages = res;
      }
    });
  }

  deletePackage(page: number) {
    const x = 'Are you sure you want to delete this package? ';
    if (confirm(x)) {
      this.packagesManagerService.deletePackage(page).subscribe(res => {
        if (res.status === 'success') {
          this.getPackages();
        } else {
          alert('Oops! Something web wrong, we could not process your request');
        }
      });
    }
  }

  private getCurrency() {
    this.currencyService.getCurrency.subscribe(res => {
      this.currency = res;
    });
  }

  private seoUpdate() {
    this.seoService.updateTitle('Packages');
    this.seoService.updateDescription('Packages');
  }

}
