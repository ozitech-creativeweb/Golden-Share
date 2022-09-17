import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { AuthService } from '../../../data/services/auth.service';
import { GeneralSettingsService } from '../../../data/services/guest/general-settings.service';
import { DonationsService } from '../../../data/services/user/donations.service';
import { CurrencyService } from '../../../data/services/currency.service';
import { WithdrawalsService } from '../../../data/services/user/withdrawals.service';
import { SEOService } from '../../../data/services/seo.service';
import { UserAuctionService } from '../../../data/services/user/user-auction.service';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TimercheckService } from '../../../data/services/user/timercheck.service';
import { RoutingService } from '../../../data/helpers/routing.service';


@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.scss']
})
export class AuctionComponent implements OnInit {
  auth: any;
  currency: any;
  isLoading = true;
  config: any;
  isLoadMore = false;
  totalAmount = 0;

  customerStatus = 'all';
  pageLimit = 18;
  currPage = 1;
  auctionCounts: 0;
  allAuct = [];

  auctionTimerControl = false;

  packages: any;

  success: any;
  isSubmitting = false;
  error: any;
  pendOrder: any;
  activeID: any;

  pageLoad = false;

  form = new FormGroup({
    amount: new FormControl('', [
      Validators.required,
    ]),
    duration: new FormControl('', [
      Validators.required,
    ]),
    min_amount: new FormControl('', [
      Validators.required,
    ]),
    id: new FormControl('', []),
    auctionID: new FormControl('', []),
  });

  hasrun = false;

  // get showTime(){
  //   if (!this.timecheckService.showTimeGetter) {
  //     if (!this.hasrun) {
  //       this.ngOnInit();
  //       this.hasrun = true;
  //     }
  //   }
  //   return this.timecheckService.showTimeGetter;
  // }

  constructor(
    private authService: AuthService,
    private generalSettings: GeneralSettingsService,
    private currencyService: CurrencyService,
    private donationsService: DonationsService,
    private seoService: SEOService,
    private userAuctionService: UserAuctionService,
    private el: ElementRef,
    private timecheckService: TimercheckService,
    private routingService: RoutingService
  ) { }

  ngOnInit() {
    this.getAuth();
    this.getConfig();
    this.getCurrency();
    this.seoUpdate();
    this.getAuction();
    this.custUpdator();
    this.getPackages();
    // if(this.showTime){
    //   this.allAuct = [];
    // }
    this.getPendingOrder();
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
    this.isLoading = true;
    this.generalSettings.configuration().subscribe(res => {
      this.config = res;
      const currentDate = new Date().getTime();
      const auction_timer = new Date(res.auction_time).getTime();

      if (auction_timer > currentDate) {
        this.auctionTimerControl = true;
      }

      this.isLoading = false;
    });
  }

  private getCurrency() {
    this.currencyService.getCurrency.subscribe(res => {
      if (res) {
        this.currency = res;
      }
    });
  }

  private getAuction(isMore = false) {
    this.userAuctionService.auctions(
      this.pageLimit, this.currPage
    ).subscribe(res => {
      if (isMore) {
        for (let i = 0; i < res.data.length; i++) {
          this.allAuct.push(res.data[i]);
        }
        this.isLoadMore = false;
      } else {
        this.allAuct = res.data;
        this.auctionCounts = res.counts;
        this.isLoading = false;
      }

      if (this.allAuct) {
        this.totalAmount = 0;
        for (let i = 0; i < this.allAuct.length; i++) {
          this.totalAmount += this.allAuct[i].amount;
        }
      }
    }, err => {
      this.isLoadMore = false;
      this.isLoading = false;
    });
  }

  loadMore() {
    this.isLoadMore = true;
    this.currPage++;
    if (this.auctionCounts > this.allAuct.length) {
      this.getAuction(true);
    }
  }

  private seoUpdate() {
    this.seoService.updateTitle('Bidding Auctions');
    this.seoService.updateDescription('Bidding Auctions');
  }

  private custUpdator() {
    /* timer(5, 60000).pipe(
      take(50)).subscribe( x => {
        this.getAuction();
      }); */
  }


  countFrom(date) {
    return new Date(date);
  }



  private getPendingOrder() {
    this.userAuctionService.pendingOrder().subscribe(res => {
      this.pendOrder = res.pendingOrders;
    });
  }
  
  private getPackages() {
    this.donationsService.packages().subscribe(res => {
      this.packages = res;
    });
  }

  getDuration(duration, min_amount, id){
    this.form.get('duration').setValue(duration);
    this.form.get('min_amount').setValue(min_amount);
    this.form.get('id').setValue(id);
  }

  submitBid(auctionID, auctionBalance){
    this.form.get('auctionID').setValue(auctionID);

    if (!this.form.value.duration || this.form.value.duration === ''){
      alert('Oops! Please select Bid Duration!');
      this.error = 'Oops! Please select Bid Duration!';
      this.scrollIntoView();
      this.isSubmitting = false;
      // this.form.reset();
      return;
    }
    
    this.activeID = auctionID;

    this.isSubmitting = true;
    this.success = null;
    this.error = null;
    const amount = Number(this.form.value.amount);
    const newAmount = auctionBalance - amount;
    const minInvest = Number(this.form.value.min_amount);
    const maxInvest = Number(auctionBalance);

    // console.log(amount);
    // console.log(newAmount);
    // console.log(minInvest);
    // console.log(maxInvest);

    if (amount > auctionBalance) {
      this.error = 'Reserve amount can not be greater than ' + this.currency.symbol + auctionBalance;
      this.scrollIntoView();
      this.isSubmitting = false;
      return;
    }

    if (amount < minInvest) {
      this.error = 'The minimum required amount for this plan is ' + this.currency.symbol + minInvest;
      this.scrollIntoView();
      this.isSubmitting = false;
      return;
    }

    if (amount > maxInvest) {
      this.error = 'The maximum required amount is ' + this.currency.symbol + maxInvest;
      this.scrollIntoView();
      this.isSubmitting = false;
      return;
    }
    if (this.pendOrder >= this.config.allowed_pending) {
      this.error = 'You can not purchase another coin until you finish the last transaction.';
      this.scrollIntoView();
      this.isSubmitting = false;
      return;
    }
    if (newAmount > 0 && newAmount < minInvest) {
      this.error = 'The reminder amount is less than the minimum allowed amount.';
      this.scrollIntoView();
      this.isSubmitting = false;
      return;
    }

    if (!this.error) {
      this.isSubmitting = true;
      const data = JSON.stringify(this.form.value);
      this.userAuctionService.add(data).subscribe(res => {
        if (res && res.status === 'success') {
          alert('Your reserve request is submitted succesfully');
          this.success = 'Your reserve request is submitted succesfully';
          this.form.reset();
          // console.log(res);
          this.ngOnInit();
          if (res.data.id) {
            this.routingService.replace([
              '/user/reserved-orders/' + res.data.id
            ]);
          } else {
            alert('Invalid Amount entered or someone out-bid you!');
            window.location.reload();
          }
        } else if (res === 'error') {
          alert('Ooops! Something went wrong. Please try again.');
          this.form.reset();
          window.location.reload();
        } else {
          this.error = res;
        }
        this.isSubmitting = false;
        this.scrollIntoView();
      });
      return;
    }
  }

  private scrollIntoView() {
    const firstInvalidControl: HTMLElement = this.el.nativeElement.querySelector(
      'form'
    );
    firstInvalidControl.focus(); // without smooth behavior
  }

}
