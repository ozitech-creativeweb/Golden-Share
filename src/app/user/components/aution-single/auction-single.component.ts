import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { AuthService } from '../../../data/services/auth.service';
import { GeneralSettingsService } from '../../../data/services/guest/general-settings.service';
import { DonationsService } from '../../../data/services/user/donations.service';
import { CurrencyService } from '../../../data/services/currency.service';
import { WithdrawalsService } from '../../../data/services/user/withdrawals.service';
import { SEOService } from '../../../data/services/seo.service';
import { UserAuctionService } from '../../../data/services/user/user-auction.service';
import { ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-auction-single',
  templateUrl: './auction-single.component.html',
  styleUrls: ['./auction-single.component.scss']
})
export class AuctionSingleComponent implements OnInit {
  withdrawals: any;
  activationFees: any;
  withdrawalOther: any;
  auth: any;
  currency: any;
  isLoading = false;
  config: any;
  isLoadMore = false;
  auction: any;
  auctionData: any;
  validateCtrl = 0;
  isSubmitting = false;
  success: any;
  error: any;
  pendingOrders = 0;
  lastOrder: any;
  packages: any;

  form = new FormGroup({
    amount: new FormControl('', [
      Validators.required,
    ]),
    duration: new FormControl('', [
      Validators.required,
    ]),
    id: new FormControl('', [
      Validators.required,
    ]),
    auctionID: new FormControl('', []),
    min_amount: new FormControl('', []),
    max_amount: new FormControl('', []),
  });
  

  

  get amount() {
    return this.form.get('amount');
  }

  constructor(
    private authService: AuthService,
    private generalSettings: GeneralSettingsService,
    private currencyService: CurrencyService,
    private seoService: SEOService,
    private userAuctionService: UserAuctionService,
    private route: ActivatedRoute,
    private donationsService: DonationsService,
    private el: ElementRef
  ) { }

  ngOnInit() {
    this.getAuth();
    this.getAuth();
    this.getConfig();
    this.getCurrency();
    this.seoUpdate();
    // tslint:disable-next-line: radix
    const id = parseInt(this.route.snapshot.paramMap.get('auction-id'));
    if (id) {
      this.getAuction(id);
    }
    this.getDonation();
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

  private getAuction(id) {
    this.isLoading = true;
    this.userAuctionService.auctionSingle(id).subscribe(res => {
      if (res && res.status === 'success') {
        this.auction = res.data;
        console.log(this.auction);
        this.auctionData = res.data.data;
        this.pendingOrders = this.auction.pendingOrders;
        this.lastOrder = this.auction.lastOrder;
        this.form.get('auctionID').setValue(this.auctionData.id);
        this.validate();
      }
      this.isLoading = false;
    });
  }

  private validate() {
    this.validateCtrl = 0;
    const remainder =  this.auction.balance / 2;
    if (this.auction.total > this.auction.balance) {
      if (this.config.min_invest_amount && remainder <= this.config.min_invest_amount) {
        this.form.get('amount').setValue(this.auction.balance);
        this.validateCtrl = 1;
      } else {
        this.validateCtrl = 2;
      }
    }
  }

  submit() {
    this.isSubmitting = true;
    this.success = null;
    this.error = null;
    const amount = Number(this.form.value.amount);
    const newAmount = this.auction.balance - amount;
    const minInvest = Number(this.form.value.min_amount);
    const maxInvest = Number(this.auction.balance);

    if (amount > this.auction.balance) {
      this.error = 'Reserve amount can not be greater than ' + this.currency.symbol + this.auction.balance;
      this.scrollIntoView();
      this.isSubmitting = false;
      return;
    }

    if (amount < minInvest) {
      this.error = 'The minimum required amount is ' + this.currency.symbol + minInvest;
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
    if (this.pendingOrders >= this.config.allowed_pending) {
      this.error = 'You can not purchase another coin until you finish the last transaction.';
      this.scrollIntoView();
      this.isSubmitting = false;
      return;
    }
    /* if (this.pendingOrders >= this.config.allowed_pending) {
      this.error = 'You exceeded the number of allowed Pending Reserve of ' + this.config.allowed_pending;
      this.scrollIntoView();
      this.isSubmitting = false;
      return;
    } */
    /* if (this.lastOrder && this.lastOrder.amount > amount) {
      // tslint:disable-next-line: max-line-length
      this.error = 'Your reserve amount can not be lower than your previous reserve amount of ' + this.currency.symbol + this.lastOrder.amount;
      this.scrollIntoView();
      return;
    } */
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
          this.ngOnInit();
        } else {
          alert("Ooops! Something went wrong. Please try again.");
          window.location.reload();
        }
        this.isSubmitting = false;
        this.scrollIntoView();
      });
      return;
    }
  }

  private scrollIntoView() {
    const firstInvalidControl: HTMLElement = this.el.nativeElement.querySelector(
      "form"
    );
    firstInvalidControl.focus(); //without smooth behavior
  }

  private seoUpdate() {
    this.seoService.updateTitle('Withdrawals');
    this.seoService.updateDescription('Withdrawals');
  }

  private getDonation() {
    this.donationsService.packages().subscribe(res => {
      this.packages = res;
    });
  }

  testFormVal(val) {
    this.form.get('duration').setValue(Number(val.duration));
    this.form.get('amount').setValue(Number(val.amount));
    this.form.get('min_amount').setValue(Number(val.min_amount));
    this.form.get('max_amount').setValue(Number(val.max_amount));
    this.submit();
  }

}
