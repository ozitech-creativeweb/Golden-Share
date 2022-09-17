import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfigService } from '../../../../data/services/config.service';
import { WithdrawalManagerService } from '../../../../data/services/administrator/withdrawal-manager.service';
import { CurrencyService } from '../../../../data/services/currency.service';
import { UserManagerService } from '../../../../data/services/administrator/user-manager.service';
import { SEOService } from '../../../../data/services/seo.service';
import { AdminAuthService } from '../../../../data/services/admin-auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.component.html',
  styleUrls: ['./withdrawal.component.scss']
})
export class WithdrawalComponent implements OnInit {
  closeResult = '';
  isLoading = false;
  isRootAdmin = false;

  pageLimit = 20;
  currentPage = 1;
  withdrawals = [];
  currency: any;
  withdrawalsCounty = 0;
  isLoadMore = false;

  customers = [];
  customerCounts = 0;
  status = 'active';
  UserPageLimit = 1000;
  currPage = 1;
  searching = false;
  noResult = false;
  

  form = new FormGroup({
    loginID: new FormControl('', [
      Validators.required
    ]),
    amount: new FormControl('', [
      Validators.required
    ]),
  });
  

  isTableSearch = false;

  formTable = new FormGroup({
    searchkeywords: new FormControl('', [
      Validators.required
    ]),
  });

  get searchkeywords() {
    return this.formTable.get('searchkeywords');
  }

  constructor(
    private modalService: NgbModal,
    private configService: ConfigService,
    private withdrawalManagerService: WithdrawalManagerService,
    private currencyService: CurrencyService,
    private userManagerService: UserManagerService,
    private seoService: SEOService,
    private adminAuthService: AdminAuthService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const status = this.route.snapshot.paramMap.get('status');
    if (status) {
      this.status = status;
    }
    this.updateAuth();
    this.getWithdrawals();
    // this.getCustomers();
    this.getCurrency();
    this.seoUpdate();
  }

  private updateAuth() {
    this.adminAuthService.admin.subscribe(res => {
      if (res) {
        const data = this.configService.isRootAdmin(res);
        if (data) {
          this.isRootAdmin = true;
        }
      }
    });
  }

  private getCustomers() {
    this.userManagerService.getCustomers(
      'withdrawal', this.UserPageLimit, this.currPage
    ).subscribe(res => {
      if (res) {
        this.customers = res.data;
        this.customerCounts = res.counts;
      }
    });
  }

  searchUsers(el) {
    if (!el.value) {
      return;
    }
    this.searching = true;
    this.userManagerService.search(el.value).subscribe(res => {
      this.customers = res.data;
      if (res.counts < 1) {
        this.noResult = true;
      }
      this.customerCounts = res.counts;
      this.searching = false;
    })
  }
  

  checkClose(el) {
    if (!el.value) {
      this.customers = [];
      this.noResult = false;
    }
  }

  setId(val, id, el) {
    this.form.get('loginID').setValue(id);
    el.value = val;
    this.customers = [];
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  submit() {
    const data = JSON.stringify(this.form.value);
    this.withdrawalManagerService.addUser(data).subscribe(res => {
      if (res && res.status === 'success') {
        this.form.reset();
        alert('User added successfully!');
        this.getWithdrawals();
        this.modalService.dismissAll();
      } else {
        alert('Oops, Error in adding User!');
      }
    });
  }

  get adminUrl() {
    return this.configService.adminURL;
  }

  private getWithdrawals(isMore = false) {
    this.isLoading = true;
    this.withdrawalManagerService.getWithdrawals(
      this.status, this.pageLimit, this.currentPage
    ).subscribe(res => { 
      if (res) {
        if (isMore) {
          for (let i = 0; i < res.data.length; i++) {
            this.withdrawals.push(res.data[i]);
          }
        } else {
          this.withdrawals = res.data;
        }
        this.withdrawalsCounty = res.counts;
      }
      this.isLoadMore = false;
      this.isLoading = false;

    });
  }

  private getCurrency() {
    this.currencyService.getCurrency.subscribe(res => {
      this.currency = res;
    });
  }

  deleteWithdrawal(withID: number) {
    if (confirm('Are you sure you want to DELETE this withdrawal?')) {
      this.withdrawalManagerService.deleteWithdrawal(withID).subscribe(res => {
        this.getWithdrawals();
      });
    }
  }

  loadMore() {
    this.isLoadMore = true;
    if (this.withdrawalsCounty > this.withdrawals.length) {
      this.currentPage++;
      this.getWithdrawals(true);
    }
  }

  switchList(action) {
    this.withdrawalManagerService.switchList(action).subscribe(res => {
      if (res) {
        alert('Your request is processed successfully!');
      } else {
        alert('Oops! Something went wrong, please try it again.');
      }
      this.getWithdrawals();
    });
  }

  private seoUpdate() {
    this.seoService.updateTitle('Withdrawals');
    this.seoService.updateDescription('Withdrawals');
  }

  turnOff(withID: number) {
    if (confirm('Are you sure you want to OFF this user Auction?')) {
      this.withdrawalManagerService.onOffAction(withID, 'Off').subscribe(res => {
        this.getWithdrawals();
      });
    }
  }

  turnOn(withID: number) {
    if (confirm('Are you sure you want to ON this user Auction?')) {
      this.withdrawalManagerService.onOffAction(withID, 'On').subscribe(res => {
        this.getWithdrawals();
      });
    }
  }


  submitTable() {
    this.isTableSearch = true;
    const data = this.formTable.value.searchkeywords;
    this.withdrawalManagerService.search(data).subscribe(res => {
      if(res){
        this.withdrawals = res.data;
        this.withdrawalsCounty = res.counts;
      } else {
        this.withdrawals = [];
      }
      this.isTableSearch = false;
    })
  }

  resetAll(){
    this.ngOnInit();
  }


}
