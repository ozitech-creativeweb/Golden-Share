import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../data/services/auth.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { TestimonialService } from '../../../data/services/guest/testimonial.service';
import { UserTestimonialManagerService } from '../../../data/services/user/user-testimonial-manager.service';
import { RoutingService } from '../../../data/helpers/routing.service';
import { SEOService } from '../../../data/services/seo.service';
import { WithdrawalsService } from '../../../data/services/user/withdrawals.service';
import { CurrencyService } from '../../../data/services/currency.service';

@Component({
  selector: 'app-post-testimony',
  templateUrl: './post-testimony.component.html',
  styleUrls: ['./post-testimony.component.scss']
})
export class PostTestimonyComponent implements OnInit {
  auth: any;
  isLoading: any;
  withdrawals: any;
  successPost: string;
  currency: any;

  form = new FormGroup({
    testimony: new FormControl('', [
      Validators.required
    ]),
    order_id: new FormControl('', [
      Validators.required
    ]),
    loginID: new FormControl('', [])
  });

  get testimony() {
    return this.form.get('testimony');
  }

  get order_id() {
    return this.form.get('order_id');
  }

  constructor(
    private authService: AuthService,
    private userTestimonyService: UserTestimonialManagerService,
    private routingService: RoutingService,
    private seoService: SEOService,
    private withdrawalsService: WithdrawalsService,
    private currencyService: CurrencyService
  ) { }

  ngOnInit() {
    this.getAuth();
    this.getCurrency();
    this.seoUpdate();
  }
  
  private getCurrency() {
    this.currencyService.getCurrency.subscribe(res => {
      if (res) {
        this.currency = res;
      }
    });
  }

  private getAuth() {
    this.authService.user.subscribe(res => {
      this.auth = res;
      this.authService.authVerify(res.token).subscribe(data => {
        if (data) {
          this.auth = data;
          this.form.get('loginID').setValue(data.login_id);
          this.getWithdrawals();
        }
      });
    });
  }

  private getWithdrawals() {
    this.withdrawalsService.testWithdrawChecks().subscribe(res => {
      if (res) {
        this.withdrawals = res;
      }
    });
  }

  submit() {
    this.isLoading = true;
    const data = JSON.stringify(this.form.value);
    this.userTestimonyService.add(data).subscribe(res => {
      if (res) {
        this.form.get('testimony').reset();
        alert('Successful Posted');
        this.successPost = 'Testimony successfuly posted';
        window.location.reload();
      }
      this.isLoading = false;
    });
  }

  private seoUpdate() {
    this.seoService.updateTitle('Post Testimony');
    this.seoService.updateDescription('Post Testimony');
  }

}
