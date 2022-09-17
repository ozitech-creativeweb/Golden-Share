import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../../data/services/config.service';
import { DonationManagerService } from '../../../../data/services/administrator/donation-manager.service';
import { CurrencyService } from '../../../../data/services/currency.service';
import { SEOService } from '../../../../data/services/seo.service';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.scss']
})
export class DonationComponent implements OnInit {
  isLoading = false;
  isLoadMore = false;
  pageLimit = 20;
  currentPage = 1;
  donations = [];
  currency: any;
  donationsCounty = 0;

  constructor(
    private configService: ConfigService,
    private donationManagerService: DonationManagerService,
    private currencyService: CurrencyService,
    private seoService: SEOService
  ) { }

  ngOnInit() {
    this.getDonation();
    this.getCurrency();
    this.seoUpdate();
  }

  get adminUrl() {
    return this.configService.adminURL;
  }

  private getCurrency() {
    this.currencyService.getCurrency.subscribe(res => {
      this.currency = res;
    });
  }

  private getDonation(isMore = false) {
    this.isLoading = true;
    this.donationManagerService.getDonations(
      this.pageLimit, this.currentPage
    ).subscribe(res => {
      if (res) {
        if (isMore) {
          for (let i = 0; i < res.data.length; i++) {
            this.donations.push(res.data[i]);            
          }
        } else {
          this.donations = res.data;
        }  
        this.donationsCounty = res.counts;
      }
      this.isLoadMore = false;
      this.isLoading = false;
      
    });
  }


  deleteDonation(donateID: number) {
    if (confirm('Are you sure you want to DELETE this donation?') ) {
      this.donationManagerService.deleteDonation(donateID).subscribe(res => {
        this.getDonation();
      });
    }
  }

  private seoUpdate() {
    this.seoService.updateTitle('List of all Donations');
    this.seoService.updateDescription('List of all Donations');
  }

  loadMore(){
    this.isLoadMore = true;
    if (this.donationsCounty > this.donations.length) {
      this.currentPage++;
      this.getDonation(true);
    }
  }

}
