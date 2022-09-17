import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserManagerService } from '../../../../data/services/administrator/user-manager.service';
import { ConfigService } from '../../../../data/services/config.service';
import { CurrencyService } from '../../../../data/services/currency.service';
import { RoutingService } from '../../../../data/helpers/routing.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SEOService } from '../../../../data/services/seo.service';
import { WithdrawalManagerService } from '../../../../data/services/administrator/withdrawal-manager.service';
import { DonationManagerService } from '../../../../data/services/administrator/donation-manager.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  bankDetail: any;
  updateError: any;
  successBank: any;
  isLoading = false;
  isLoadMore = false;
  successPOP: string;
  errorPOP: string;
  currency: any;
  pageLimit = 20;
  currentPage = 1;
  pageLimitDonate = 20;
  currentPageDonate = 1;
  withdrawal = [];
  withdrawalCounty: any;
  allwithdrawals = 0;
  withdrawnNow = 0;
  withdrawalAvailable = 0;

  donationCounty: any;
  donation = [];
  isLoadMoreDonate = false;
  allDonations: any;
  allDonation = 0;
  donationPaid = 0;
  donationUnpaid = 0;
  customer: any;
  user: any;
  addresses: any;

  referrals: any;
  earnings: any;
  balance: any;
  withdrawn: any;


  // bank details form start
  form = new FormGroup ({
    loginID: new FormControl('', []),
    bankID: new FormControl('', []),
    account_name: new FormControl('', [
      Validators.required,
    ]),
    account_number: new FormControl('', [
      Validators.required,
    ]),
    bank: new FormControl('', [
      Validators.required
    ]),
    // branch: new FormControl('', [
    //   Validators.required
    // ]),
  });
  get account_name() {
    return this.form.get('account_name');
  }
  get account_number() {
    return this.form.get('account_number');
  }
  get bank() {
    return this.form.get('bank');
  }
  // get branch() {
  //   return this.form.get('branch');
  // }
  get loginID() {
    return this.form.get('loginID');
  }
  get bankID() {
    return this.form.get('bankID');
  }
  // bank details form start


  constructor(
    private route: ActivatedRoute,
    private userManagerService: UserManagerService,
    private configService: ConfigService,
    private currencyService: CurrencyService,
    private routingService: RoutingService,
    private seoService: SEOService,
    private withdawalManagerService: WithdrawalManagerService,
    private donationManagerService: DonationManagerService
  ) { }

  get adminUrl() {
    return this.configService.adminURL;
  }

  ngOnInit() {
    this.getCurrency();
    const loginID = this.route.snapshot.paramMap.get('login-id');
    this.getCustomer(loginID);
    this.seoUpdate();
  }

  private getCustomer(loginID) {
    this.userManagerService.getCustomer(loginID).subscribe(res => {
      if (res) {
        this.customer = res;
        this.user = res.user;
        this.addresses = res.addresses;
        this.getBank(loginID);
        this.getReferrals(loginID);
        this.userDonation();
        this.userWithdrawal();
      } else {
        this.routingService.replace([
          '/' + this.adminUrl + '/user-manager'
        ]);
      }
    });
  }

  private userWithdrawal(isMore = false) {
    this.isLoading = true;
    this.withdawalManagerService.userWithdrawals(
      this.customer.user.login_id, this.pageLimit, this.currentPage
      ).subscribe(res => {
      if (res) {
        this.allwithdrawals = res.withdrawals;
        this.withdrawnNow = res.withdrawn;
        this.withdrawalAvailable = res.available;
        if (isMore) {
          for (let i = 0; i < res.data.length; i++) {
            this.withdrawal.push(res.data[i]);
          }
        } else {
          this.withdrawal = res.data;
        }
        this.withdrawalCounty = res.counts;
      }
      this.isLoadMore = false;
      this.isLoading = false;
    });
  }

  loadMore(){
    this.isLoadMore = true;
    if (this.withdrawalCounty > this.withdrawal.length) {
      this.currentPage++;
      this.userWithdrawal(true);
    }
  }

  deleteWithdrawal(withID: number) {
    if (confirm('Are you sure you want to DELETE this withdrawal?') ) {
      this.withdawalManagerService.deleteWithdrawal(withID).subscribe(res => {
        window.location.reload();
      });
    }
  }


  private userDonation(isMore = false) {
    this.isLoading = true;
    this.donationManagerService.userDonations(
      this.customer.user.login_id, this.pageLimitDonate, this.currentPageDonate
    ).subscribe(res => {
      if (res) {
        this.allDonation = res.donations;
        this.donationPaid = res.paid;
        this.donationUnpaid = res.unpaid;
        if (isMore) {
          for (let i = 0; i < res.data.length; i++) {
            this.donation.push(res.data[i]);
          }
        } else {
          this.donation = res.data;
        }
        this.donationCounty = res.counts;
      }
      this.isLoadMore = false;
      this.isLoading = false;
    });
  }

  loadMoreDonat(){
    this.isLoadMore = true;
    if (this.donationCounty > this.donation.length) {
      this.currentPageDonate++;
      this.userDonation(true);
    }
  }

  deleteDonation(donateID: number) {
    if (confirm('Are you sure you want to DELETE this donation?') ) {
      this.donationManagerService.deleteDonation(donateID).subscribe(res => {
        window.location.reload();
      });
    }
  }

  private getBank(loginID) {
    this.userManagerService.bankDetails(loginID).subscribe(res => {
      if (res) {
        this.bankDetail = res;
        this.form.get('account_name').setValue(res.account_name);
        this.form.get('account_number').setValue(res.account_number);
        this.form.get('bank').setValue(res.bank);
        // this.form.get('branch').setValue(res.branch);
        this.form.get('loginID').setValue(res.login_id);
        this.form.get('bankID').setValue(res.id);
      }
    });
  }


  clearnUrl(name) {
    return this.configService.clearnUrl(name);
  }

  // submit edited bank details
  submit(){
    this.isLoading = true;
    this.updateError = null;
    const data = JSON.stringify(this.form.value);
    this.userManagerService.updateBankDetails(data).subscribe(res => {
      if (res && res.status === 'success') {
        alert('Success');
        this.successBank = 'Bank details updated successfully'
        this.getBank(res.login_id);
      } else {
        this.updateError = 'Oops! Something went wrong, please ensure there is no email duplicate';
      }
      this.isLoading = false;
    });
  }

  popAction(loginID, action) {
    if(action == 1) {
      const x = 'Are you sure you want to approve this POP?';
      if (confirm(x)) {
        this.isLoading = true;
        this.userManagerService.popAction(loginID, action).subscribe(res => {
          if (res && res.status === 'success') {
            this.successPOP = "You have Successfully approved this user"
          } else {
            this.errorPOP = "Oops! Something went wrong, we could not process your request."
            alert('Oops! Something went wrong, we could not process your request.');
          }
          this.isLoading = false;
        });
      }
    } else if(action == 0) {
      // const x = 'Are you sure you want to disapprove this POP?';
      // if (confirm(x)) {
      //   this.isLoading = true;
      //   this.userManagerService.popAction(loginID, action).subscribe(res => {
      //     if (res && res.status === 'success') {
      //       this.successPOP = "You have Successfully disapproved this user"
      //     } else {
      //       this.errorPOP = "Oops! Something went wrong, we could not process your request."
      //       alert('Oops! Something went wrong, we could not process your request.');
      //     }
      //     this.isLoading = false;
      //   });
      // }
    }
  }

  private seoUpdate() {
    this.seoService.updateTitle('User Details');
    this.seoService.updateDescription('User Details');
  }

  private getCurrency() {
    this.currencyService.getCurrency.subscribe(res => {
      if (res){
        this.currency = res;
      }
    });
  }

  private getReferrals(loginID) {
    this.userManagerService.referralTree(
      loginID
    )
    .subscribe(res => {
      if (res) {
        this.referrals = res.downlinesTree;
        this.earnings = res.earnings;
        this.balance = res.balance;
        this.withdrawn = res.withdrawn;
      }
    });
  }

}
