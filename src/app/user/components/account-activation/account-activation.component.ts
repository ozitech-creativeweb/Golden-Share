import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserBankAccountService } from '../../../data/services/user/user-bank-account.service';
import { AuthService } from '../../../data/services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { FileUploadService } from '../../../data/services/file-upload.service';
import { HttpEventType } from '@angular/common/http';
import { UserService } from '../../../data/services/user/user.service';
import { GeneralSettingsService } from '../../../data/services/guest/general-settings.service';
import { RoutingService } from '../../../data/helpers/routing.service';
import { CurrencyService } from '../../../data/services/currency.service';
import { SEOService } from '../../../data/services/seo.service';

@Component({
  selector: 'app-account-activation',
  templateUrl: './account-activation.component.html',
  styleUrls: ['./account-activation.component.scss']
})
export class AccountActivationComponent implements OnInit, AfterViewInit {
  accountDetails: any;
  auth: any;
  isLoading: any;
  successUpdate: string;
  config: any;
  currency: any;
  uplineInfo: any;

  // UPLOAD
  uploadErr: string;
  uploadRole: string;
  isBusy = false;
  uploadProgress = 0;

  form = new FormGroup ({
    loginID: new FormControl('', []),
    pop: new FormControl('', []),
  });
  get pop() {
    return this.form.get('pop');
  }


  constructor(
    private userBankAccountservice: UserBankAccountService,
    private authService: AuthService,
    private fileUploadService: FileUploadService,
    private userService: UserService,
    private generalSettingsService: GeneralSettingsService,
    private routingService: RoutingService,
    private currencyService: CurrencyService,
    private seoService: SEOService
  ) { }

  ngOnInit() {
    this.getAuth();
    this.getCurrency();
    this.getConfig();
    this.getAccount();
    this.seoUpdate();
  }

  private getAuth() {
    this.authService.user.subscribe(res => {
      if (res) {
        this.authService.authVerify(res.token).subscribe(data => {
          if (data) {
            this.auth = data;
            this.form.get('loginID').setValue(res.login_id);
            this.getUplineInfo();
          }
        });
      }
    });
  }

  private getUplineInfo() {
    this.userBankAccountservice.uplineInfo().subscribe(res => {
      if (res && res.status === 'success') {
        this.uplineInfo = res.data;
      }
    });
  }
  private getAccount() {
    this.userBankAccountservice.bankAccounts().subscribe(res => {
      if (res) {
        this.accountDetails = res.id;
      }
    });
  }

  private getCurrency() {
    this.currencyService.getCurrency.subscribe(res => {
      if (res) {
        this.currency = res;
      }
    });
  }

  // FILE UPLOAD
  addLeftBanner(event, role) {
    this.uploadErr = null;
    this.uploadRole = role;

    const selectedFile = <File>event.target.files[0];
    this.uploadHandler(selectedFile, role);
  }

  private uploadHandler(selectedFile, role) {
    this.isBusy = true;
    if (this.validateFile(selectedFile) === 'upload') {
      this.uploadProgress = 1;
      const fd = new FormData;
      fd.append('upload', selectedFile, selectedFile.name);

      this.fileUploadService.guestUpload(
        fd, 'p2p-pop', this.getFileName(selectedFile), 0
      ).subscribe(fielEvent => {
        if (fielEvent.type === HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(fielEvent.loaded / fielEvent.total * 100 );
        } else if (fielEvent.type === HttpEventType.Response) {
          if (fielEvent.body.status === 'success') {
            this.form.get(role).setValue(fielEvent.body.data.original_url);
          } else if (fielEvent.body.status === 'failed') {
            this.uploadErr = fielEvent.body.data;
          } else {
            this.uploadErr = 'Oops! Something went wrong, we could not process upload.';
          }
          this.isBusy = false;
          this.uploadProgress = 0;
        }
      }, err => { console.log(err); }
      );
    } else {
      this.uploadErr = this.validateFile(selectedFile);
    }
  }

  private validateFile(selectedFile) {
    const name = selectedFile.name;
    const size = Number(selectedFile.size);
    const maxSize = 10000000;
    const ext = name.substring(name.lastIndexOf('.') + 1);

    if (ext.toLowerCase() !== 'png' &&
        ext.toLowerCase() !== 'gif' &&
        ext.toLowerCase() !== 'jpeg' &&
        ext.toLowerCase() !== 'jpg' ) {
      return 'Selected file format is not supported';
    } else if (size > maxSize) {
      return 'Selected file Size exceeded the maximum required size of ' + maxSize;
    } else {
      return 'upload';
    }
  }

  private getFileName(selectedFile) {
    return selectedFile.name.split('.')[0];
  }

  submit() {
    this.isLoading = true;
    const data = JSON.stringify(this.form.value);
    this.userService.proveOfPayment(data).subscribe(res => {
      if (res) {
        this.form.reset();
        // this.authService.storeAuthData(res);
        this.getAuth();
        alert('Upload successful');
        this.successUpdate = 'Prove of payment successfully uploaded';
      }
      this.isLoading = false;
    });
  }

  private getConfig() {
    this.generalSettingsService.getConfiguration.subscribe(res => {
      this.config = res;
      if (res && res.activation_fee < 1) {
        this.routingService.replace(['/user/dashboard']);
        return;
      }
    });
  }


  ngAfterViewInit(): void {
    const getWrapper = document.getElementById('custom-width');
    const getList = document.getElementsByClassName('allList');
  }

  private seoUpdate() {
    this.seoService.updateTitle('Acount Activation');
    this.seoService.updateDescription('Acount Activation');
  }


}
