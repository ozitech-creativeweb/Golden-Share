import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../data/services/auth.service';
import { GeneralSettingsService } from '../../../data/services/guest/general-settings.service';
import { DonationsService } from '../../../data/services/user/donations.service';
import { CurrencyService } from '../../../data/services/currency.service';
import { ActivatedRoute } from '@angular/router';
import { RoutingService } from '../../../data/helpers/routing.service';
import { FileUploadService } from '../../../data/services/file-upload.service';
import { HttpEventType } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { SEOService } from '../../../data/services/seo.service';

@Component({
  selector: 'app-donation-order',
  templateUrl: './donation-order.component.html',
  styleUrls: ['./donation-order.component.scss']
})
export class DonationOrderComponent implements OnInit {
  orders: any;
  auth: any;
  currency: any;
  isLoading = false;
  config: any;

  countFrom = new Date(2020, 6, 24, 10, 33, 30);
  filename = "No file choosen";
  resEvent;

  selectedFile: File = null;
  selectedFileName: string;
  tempFile: any;
  uploadingProgress = 0;
  fileUploadError: any;

  form = new FormGroup({
    id: new FormControl('', []),
    pop: new FormControl('', []),
  });

  constructor(
    private authService: AuthService,
    private generalSettings: GeneralSettingsService,
    private donationsService: DonationsService,
    private currencyService: CurrencyService,
    private route: ActivatedRoute,
    private routingService: RoutingService,
    private fileUploadService: FileUploadService,
    private seoService: SEOService
  ) { }

  ngOnInit() {
    // tslint:disable-next-line: radix
    const id = parseInt(this.route.snapshot.paramMap.get('order-id'));
    if (id) {
      this.getDonation(id);
    }
    this.getAuth();
    this.getAuth();
    this.getConfig();
    this.getCurrency();
    this.seoUpdate()
  }

  timerVal(time) {
    return new Date(time);
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

  private getDonation(id) {
    this.isLoading = true;
    this.donationsService.order(id).subscribe(res => {
      if (res && res.status === 'success') {
        this.orders = res.data;
      }
      this.isLoading = false;
    });
  }

  // file upload
  async onSelectedFile(event, orderID) {
    this.form.get('id').setValue(orderID);
    this.fileUploadError = null;
    const selectedFile = <File>event.target.files[0];
    this.uploadingProgress = 1;
    this.fileUploadError = null;
    const fd = new FormData;
    fd.append('upload', selectedFile, selectedFile.name);

    this.fileUploadService.guestUpload(
      fd, 'pop', this.getFileName(selectedFile), 0, 0, 0, 0, 0
    ).subscribe(fielEvent => {
      if (fielEvent.type === HttpEventType.UploadProgress) {
        this.uploadingProgress = Math.round(fielEvent.loaded / fielEvent.total * 100);
      } else if (fielEvent.type === HttpEventType.Response) {
        if (fielEvent.body.status === 'success') {
          this.form.get('pop').setValue(fielEvent.body.data.original_url);
          const data = JSON.stringify(this.form.value);
          this.uploadingProgress = 1;
          this.donationsService.pop(data).subscribe(res => {
            if (res.status === 'success') {
              this.ngOnInit();
              alert('File uploaded successfully!');
            } else {
              alert('Oops! Something went wrong, file not uploaded.');
            }
            this.uploadingProgress = 0;
          });
        } else if (fielEvent.body.status === 'failed') {
          if (fielEvent.body.data) {
            this.fileUploadError = fielEvent.body.data;
          } else {
            this.fileUploadError = 'Oops! Something went wrong, we could not upload file';
          }
        }
        this.uploadingProgress = 0;
      }
    }, err => { console.log(err); }
    );
  }

  private getFileName(selectedFile) {
    return selectedFile.name.split('.')[0];
  }

  private seoUpdate() {
    this.seoService.updateTitle('Donation Order');
    this.seoService.updateDescription('Donation Order');
  }

}
