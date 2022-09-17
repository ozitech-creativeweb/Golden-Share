import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfigService } from '../../../../data/services/config.service';
import { FileUploadService } from '../../../../data/services/file-upload.service';
import { HttpEventType } from '@angular/common/http';
import { AdminManagerService } from '../../../../data/services/administrator/admin-manager.service';
import { RoutingService } from '../../../../data/helpers/routing.service';
import { SEOService } from '../../../../data/services/seo.service';
import { AdminAuthService } from '../../../../data/services/admin-auth.service';


@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent implements OnInit {
  isLoading = false;
  isAdding = false;

  uploadingProgress = 0;
  fileUploadError: any;

  form = new FormGroup({
    full_name: new FormControl('', [
      Validators.required
    ]),
    username: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required
    ]),
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
    biography: new FormControl('', []),
  });

  constructor(
    private configService: ConfigService,
    private fileUploadService: FileUploadService,
    private adminManagerService: AdminManagerService,
    private routingService: RoutingService,
    private seoService: SEOService,
    private adminAuthService: AdminAuthService,
  ) { }

  ngOnInit() {
    this.updateAuth();
    this.seoUpdate();
  }

  get adminUrl() {
    return this.configService.adminURL;
  }
  
  private updateAuth() {
    this.adminAuthService.admin.subscribe(res => {
      if (res) {
        const data = this.configService.isRootAdmin(res);
        if (!data) {
          this.routingService.replace(['/' + this.adminUrl + '/dashboard']);
        }
      }
    });
  }

  submit() {
    this.isAdding = true;
    const data = JSON.stringify(this.form.value);
    this.adminManagerService.createAdmin(data).subscribe(res => {
      console.log(res);
      if (res.status === 'success') {
        this.form.reset();
        alert('Account created successfully!');
        this.routingService.replace([
          '/' + this.adminUrl + '/admin-manager'
        ]);
      } else {
        alert('Oops! Something went wrong. Ensure there is no duplicate Username or Email');
      }
      this.isAdding = false;
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

  private seoUpdate() {
    this.seoService.updateTitle('Add Admin');
    this.seoService.updateDescription('Add Admin');
  }

}
