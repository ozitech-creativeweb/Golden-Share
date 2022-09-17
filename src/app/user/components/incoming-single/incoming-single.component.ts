import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../data/services/auth.service';
import { GeneralSettingsService } from '../../../data/services/guest/general-settings.service';
import { DonationsService } from '../../../data/services/user/donations.service';
import { CurrencyService } from '../../../data/services/currency.service';
import { ActivatedRoute } from '@angular/router';
import { RoutingService } from '../../../data/helpers/routing.service';
import { FileUploadService } from '../../../data/services/file-upload.service';
import { HttpEventType } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { WithdrawalsService } from '../../../data/services/user/withdrawals.service';
import { SEOService } from '../../../data/services/seo.service';

@Component({
  selector: 'app-incoming-single',
  templateUrl: './incoming-single.component.html',
  styleUrls: ['./incoming-single.component.scss']
})
export class IncomingSingleComponent implements OnInit {
  orders: any;
  auth: any;
  currency: any;
  isLoading = false;
  approving: any;
  config: any;

  selectedFile: File = null;
  selectedFileName: string;
  tempFile: any;
  uploadingProgress = 0;
  fileUploadError: any;

  constructor(
    private authService: AuthService,
    private generalSettings: GeneralSettingsService,
    private currencyService: CurrencyService,
    private route: ActivatedRoute,
    private fileUploadService: FileUploadService,
    private withdrawalsService: WithdrawalsService,
    private seoService: SEOService,
    private routingService: RoutingService
  ) { }

  ngOnInit() {
    // tslint:disable-next-line: radix
    const id = parseInt(this.route.snapshot.paramMap.get('order-id'));
    if (id) {
      this.getWithdrawal(id);
    }
    this.getAuth();
    this.getAuth();
    this.getConfig();
    this.getCurrency();
    this.seoUpdate()
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

  private getWithdrawal(id) {
    this.isLoading = true;
    this.withdrawalsService.order(id).subscribe(res => {
      console.log(res);
      if (res && res.status === 'success') {
        this.orders = res.data;
      } else {
        // this.routingService.replace(['/user/incoming-orders']);
      }
      this.isLoading = false;
    });
  }

  approve(id) {
    const x = 'Are you sure you want to approve this payment?';
    if (confirm(x)) {
      this.approving = id;
      this.withdrawalsService.approvePOP(id).subscribe(res => {
        if (res && res.status === 'success') {
          this.ngOnInit();
          alert('Payment Approved successfully!');
        } else {
          alert('Oops! Something went wrong, we could not process your request.');
        }
        this.approving = null;
      });
    }
  }

  private seoUpdate() {
    this.seoService.updateTitle('Withdrawal History');
    this.seoService.updateDescription('Withdrawal History');
  }

}
