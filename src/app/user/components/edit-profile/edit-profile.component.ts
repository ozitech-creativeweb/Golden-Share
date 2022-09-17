import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../data/services/auth.service';
import { UserService } from '../../../data/services/user/user.service';
import { FileUploadService } from '../../../data/services/file-upload.service';
import { HttpEventType } from '@angular/common/http';
import { RoutingService } from '../../../data/helpers/routing.service';
import { SEOService } from '../../../data/services/seo.service';
import { UserBankAccountService } from '../../../data/services/user/user-bank-account.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  isLoading = true;
  isSubmitting = false;
  bankSubmitting = false;
  auth: any;
  successUpdate: any;
  allAccount;
  success;
  error;

  uploadingProgress = 0;
  fileUploadError: any;
  updateError: string;
  @Output() feeback: EventEmitter<string> = new EventEmitter();

  // for username
  form = new FormGroup({
    first_name: new FormControl('', [
      Validators.minLength(4),
      Validators.required,
    ]),
    last_name: new FormControl('', [
      Validators.required,
    ]),
    email: new FormControl('', [
      Validators.required,
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    photo: new FormControl('', []),
    loginID: new FormControl('', [
    ]),
  });

  get first_name() {
    return this.form.get('first_name');
  }
  get last_name() {
    return this.form.get('last_name');
  }
  get phone() {
    return this.form.get('phone');
  }
  

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private fileUploadService: FileUploadService,
    private seoService: SEOService,
    private userBankAccountService: UserBankAccountService,
  ) { }

  ngOnInit() {
    this.getAuth();
    this.seoUpdate();
  }

  private getAuth() {
    this.authService.user.subscribe(res => {
      if (res) {
        this.authService.authVerify(res.token).subscribe(data => {
          if (data) {
            this.auth = data;
            this.form.get('first_name').setValue(data.first_name);
            this.form.get('last_name').setValue(data.last_name);
            this.form.get('email').setValue(data.email);
            this.form.get('phone').setValue(data.phone);
            this.form.get('loginID').setValue(data.login_id);
          }
        });
      }
      this.isLoading = false;
    });
  }

  

  submit() {
    this.isSubmitting = true;
    const data = JSON.stringify(this.form.value);
    this.userService.updateAccount(data).subscribe(res => {
      if (res) {
        alert('Update successful');
        this.successUpdate = 'Profile Successful Updated';
        this.getAuth();
      }
      this.isSubmitting = false;
    });
  }

  // file upload
  onSelectedFile(event) {
    this.fileUploadError = null;
    const selectedFile = <File>event.target.files[0];

    if (this.validateFile(selectedFile) === 'upload') {
      this.uploadingProgress = 1;
      this.fileUploadError = null;
      const fd = new FormData;
      fd.append('upload', selectedFile, selectedFile.name);

      this.fileUploadService.guestUpload(
        fd, 'p2pusers', this.getFileName(selectedFile), 0, 120, 120, 400, 400
      ).subscribe(fielEvent => {
        if (fielEvent.type === HttpEventType.UploadProgress) {
          this.uploadingProgress = Math.round(fielEvent.loaded / fielEvent.total * 100 );
        } else if (fielEvent.type === HttpEventType.Response) {
          if (fielEvent.body.status === 'success') {
            this.form.get('photo').setValue(fielEvent.body.data.original_url);
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
  }

  private validateFile(selectedFile) {
    const name = selectedFile.name;
    const size = Number(selectedFile.size);
    const maxSize = 10000000;
    const ext = name.substring(name.lastIndexOf('.') + 1);

    if (ext.toLowerCase() !== 'png' &&
        ext.toLowerCase() !== 'jpeg' &&
        ext.toLowerCase() !== 'jpg' ) {
      this.fileUploadError = 'Selected file format is not supported';
      return this.fileUploadError;
    } else if (size > maxSize) {
      this.fileUploadError = 'Selected file Size exceeded the maximum required size of ' + maxSize;
      return this.fileUploadError;
    } else {
      return 'upload';
    }
  }

  private getFileName(selectedFile) {
    return selectedFile.name.split('.')[0];
  }

  sendFeedback(feedback: string) {
    this.feeback.emit(feedback);
  }

  private seoUpdate() {
    this.seoService.updateTitle('Edit Profile');
    this.seoService.updateDescription('Edit Profile');
  }

  allowNum(ev) {
    if (ev.key) {
      if (isNaN(ev.key)) {
        if (ev.key === "Backspace" ||
          ev.key === "Tab" ||
          ev.key === "Alt" ||
          ev.key.indexOf('Arrow') > -1 ||
          ev.key === "Control" ||
          ev.key === "Shift" ||
          ev.key === "+" ||
          ev.key === "End" ||
          ev.key === "Home") {
          return;
        }
        ev.preventDefault();
      }
    } else {
      setTimeout(()=>{
        let inputVal = ev.target.value;
        if (isNaN(inputVal)) {
          ev.target.value = "";
        }
      });
    }
  }

}
