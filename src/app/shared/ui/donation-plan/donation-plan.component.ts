import { Component, OnInit, AfterViewInit, Input, EventEmitter, Output } from '@angular/core';
import { UserBankAccountService } from '../../../data/services/user/user-bank-account.service';
import { AuthService } from '../../../data/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FileUploadService } from '../../../data/services/file-upload.service';
import { HttpEventType } from '@angular/common/http';
import { UserService } from '../../../data/services/user/user.service';
import { GeneralSettingsService } from '../../../data/services/guest/general-settings.service';
import { CurrencyService } from '../../../data/services/currency.service';
import { RoutingService } from '../../../data/helpers/routing.service';
import { DonationsService } from '../../../data/services/user/donations.service';

@Component({
  selector: 'app-donation-plan',
  templateUrl: './donation-plan.component.html',
  styleUrls: ['./donation-plan.component.scss']
})
export class DonationPlanComponent implements OnInit {
  @Input() package;
  @Input() refCount;
  @Input() donationSum;
  @Input() isSubmitting = true;
  // @Input() activeId;
  @Input() form;
  activeId;
  isBidding = false;

  @Output() submitEv: EventEmitter<any> = new EventEmitter();
  // test = "This is a test";

  currency: any;
  durationArray: any;
  myString: any;
  

  constructor(
    private userBankAccountservice: UserBankAccountService,
    private authService: AuthService,
    private userService: UserService,
    private generalSettings: GeneralSettingsService,
    private routingService: RoutingService,
    private currencyService: CurrencyService,
    private donationsService: DonationsService,
  ) { }

  ngOnInit() {
    // this.getConfig();
    this.getCurrency();
    
    this.myString = this.package.duration;
    this.durationArray = this.myString.split(',');
  }

  private getCurrency() {
    this.currencyService.getCurrency.subscribe(res => {
      if (res) {
        this.currency = res;
      }
    });
  }

  submitAmount(plan) {
    this.submitEv.emit(plan);
  }

  submit() {
    this.activeId = this.package.id;
    this.form.get('id').setValue(this.package.id);
    this.form.get('min_amount').setValue(this.package.min_amount);
    this.form.get('max_amount').setValue(this.package.max_amount);
    this.form.get('duration').setValue(this.package.duration);
    this.submitEv.emit(this.form.value);
    this.form.reset();
    const targetDrop = document.querySelectorAll('.outPutEl');
    for (let i = 0; i < targetDrop.length; i++) {
      targetDrop[i.toString()].innerHTML = "Select Duration";
    }
    // this.activeId = -1;
  }

  prevHeight;

  toggleDropDwn(el) {
    let actEl;
    if (el.className == "targetDrop") {
      actEl = el.nextElementSibling;
    } else {
      actEl = el.parentElement.nextElementSibling;
    }
    const elH = +getComputedStyle(actEl).height.replace('px', '');
    const superPar = document.querySelectorAll('.auction')['0'];
    if (elH == 0) {
      const superParH = +getComputedStyle(superPar).height.replace('px', '');
      this.prevHeight = superParH;
      let totalH = 200;
      actEl.style.height = totalH + "px";
      superPar.style.height = `${superParH + totalH}px`;
      actEl.parentElement.parentElement.parentElement.parentElement.parentElement.style.zIndex = "20000";
    } else {
      actEl.style.height = "0px";
      actEl.parentElement.parentElement.parentElement.parentElement.parentElement.style.zIndex = "";
      superPar.style.height = `${this.prevHeight}px`;
      setTimeout(() => {
        superPar.style.height = "";
      }, 400);
    }
    
    // console.log(actEl.parentElement.parentElement.parentElement.parentElement.parentElement.offsetTop);
    // console.log(document.body.scrollHeight);
    // const footer = document.querySelector('footer');
    // const footerH = +getComputedStyle(footer).height.replace('px','');
    // const superParPadB = +getComputedStyle(superPar).paddingBottom.replace('px','');
  }

  // submit() {
  //   console.log(this.form.value);
  // }

  setOutput(el) {
    if (el.innerHTML != 'Select Duration') {
      this.form.get('duration').setValue(el.innerHTML);
    } else {
      return;
    }
    let prevEl = el.parentElement.previousElementSibling;
    let output = prevEl.children['0'];
    output.innerHTML = el.innerHTML;
    this.toggleDropDwn(prevEl);
  }

}
