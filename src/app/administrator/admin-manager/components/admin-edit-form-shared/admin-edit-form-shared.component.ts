import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfigService } from '../../../../data/services/config.service';
import { FileUploadService } from '../../../../data/services/file-upload.service';
import { AdminManagerService } from '../../../../data/services/administrator/admin-manager.service';
import { RoutingService } from '../../../../data/helpers/routing.service';
import { HttpEventType } from '@angular/common/http';
import { AdminAuthService } from '../../../../data/services/admin-auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-edit-form-shared',
  templateUrl: './admin-edit-form-shared.component.html',
  styleUrls: ['./admin-edit-form-shared.component.scss']
})
export class AdminEditFormSharedComponent implements OnInit {
  isLoading = false;
  isAdding = false;
  authAdmin: any;
  adm: any;
  admID: any;
  @Input() role: any;
  @Output() feeback: EventEmitter<string> = new EventEmitter();
  @Output() admInfo: EventEmitter<any> = new EventEmitter();

  uploadingProgress = 0;
  fileUploadError: any;
  updateError: string;

  form = new FormGroup({
    full_name: new FormControl('', [
      Validators.required
    ]),
    username: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', []),
    oldPass: new FormControl('', []),
    role: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.required
    ]),
    phone: new FormControl('', []),
    address: new FormControl('', []),
    city: new FormControl('', []),
    state: new FormControl('', []),
    country: new FormControl('', []),
    photo: new FormControl('', []),
    bio: new FormControl('', []),
    id: new FormControl('', []),
    status: new FormControl('', []),
    status_type: new FormControl('', []),
  });

  constructor(
    private configService: ConfigService,
    private fileUploadService: FileUploadService,
    private adminManagerService: AdminManagerService,
    private routingService: RoutingService,
    private adminAuthService: AdminAuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.updateAuth();
    this.getDetail();
  }

  get adminUrl() {
    return this.configService.adminURL;
  }

  private getDetail() {
    const admID = this.route.snapshot.paramMap.get('adm-id');
    if (admID) {
      this.admID = admID;
      this.adminManagerService.getSingle(admID).subscribe(res => {
        if (res.status === 'success') {
          this.adm = res.data;
          this.admInfo.emit(res.data);
          this.setValue(res.data);
        } else {
          this.routingService.replace([
            '/' + this.adminUrl + '/admin-manager'
          ]);
        }
      });
    } else {
      this.updateAuth();
    }
  }

  private updateAuth() {
    this.adminAuthService.admin.subscribe(res => {
      if (res) {
        this.adm = res;
        this.authAdmin = res;
        this.setValue(res);
      }
    });
  }

  private setValue(adm) {
    this.form.get('full_name').setValue(adm.full_name);
    this.form.get('username').setValue(adm.username);
    this.form.get('role').setValue(adm.role);
    this.form.get('email').setValue(adm.email);
    this.form.get('phone').setValue(adm.phone);
    this.form.get('oldPass').setValue(adm.password);
    this.form.get('address').setValue(adm.address);
    this.form.get('city').setValue(adm.city);
    this.form.get('state').setValue(adm.state);
    this.form.get('country').setValue(adm.country);
    this.form.get('photo').setValue(adm.photo);
    this.form.get('bio').setValue(adm.bio);
    this.form.get('id').setValue(adm.id);
    this.form.get('status_type').setValue(adm.status_type);
  }

  submit() {
    const data = JSON.stringify(this.form.value);
    this.adminManagerService.updateRecord(data, this.role).subscribe(res => {
      if (res.status === 'success') {
        this.updateError = null;
        this.sendFeedback('Updated Successfully!');
        if (this.role === 'profile') {
          this.adminAuthService.storeAdminAuthData(res.data);
        } else {
          this.routingService.replace([
            '/' + this.adminUrl + '/admin-manager'
          ]);
        }
      } else {
        this.sendFeedback(null);
        this.updateError = 'Oops! Something went wrong. Ensure there is no duplicate Username or Email';
      }
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

      this.fileUploadService.upload(
        fd, 'administrators', this.getFileName(selectedFile), 0, 120, 120, 600, 600
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
}
