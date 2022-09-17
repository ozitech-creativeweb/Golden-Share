import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfigService } from '../../../../data/services/config.service';
import { OtherManagerService } from '../../../../data/services/administrator/other-manager.service';
import { FileUploadService } from '../../../../data/services/file-upload.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.scss']
})
export class PaymentGatewayComponent implements OnInit {
  paymentMethods: any;
  fileUploadError: any;
  uploadingProgress = 0;
  isAdding = false;

  form = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    type: new FormControl('', [
      Validators.required
    ]),
    gateway: new FormControl('', [
      Validators.required
    ]),
    mer_id: new FormControl('', []),
    mer_code: new FormControl('', []),
    bearer: new FormControl('', []),
    descr: new FormControl('', []),
    url: new FormControl('', []),
  });

  constructor(
    private configService: ConfigService,
    private otherManagerService: OtherManagerService,
    private fileUploadService: FileUploadService,
  ) { }

  get adminUrl() {
    return this.configService.adminURL;
  }

  ngOnInit() {
    this.getMethods();
  }

  submit() {
    this.isAdding = true;
    const data = JSON.stringify(this.form.value);
    this.otherManagerService.addPaymentMethod(data).subscribe(res => {
      if (res.status === 'success') {
        this.form.reset();
        this.getMethods();
      } else {
        alert('Oops! Something went wrong, please ensure no duplicate Gateway is selected.');
      }
      this.isAdding = false;
    });
  }

  private getMethods() {
    this.otherManagerService.paymentMethods().subscribe(res => {
      if (res.status === 'success') {
        this.paymentMethods = res.data;
      }
    });
  }

  delete(method) {
    const x = 'Are you sure you want to DELETE "' + method.name + '"?';
    if (confirm(x)) {
      this.otherManagerService.deletePaymentMethod(method.id)
      .subscribe(res => {
        if (res.status === 'success') {
          this.getMethods();
        } else {
          alert('Oops! Something went wrong, Please try it again.');
        }
      });
    }
  }

  // file upload
  onSelectFile(event) {
    this.fileUploadError = null;
    const selectedFile = <File>event.target.files[0];

    if (this.validateFile(selectedFile) === 'upload') {
      this.uploadingProgress = 1;
      this.fileUploadError = null;
      const fd = new FormData;
      fd.append('upload', selectedFile, selectedFile.name);

      this.fileUploadService.upload(
        fd, 'products', this.getFileName(selectedFile), 0, 219, 20
      ).subscribe(fielEvent => {
        if (fielEvent.type === HttpEventType.UploadProgress) {
          this.uploadingProgress = Math.round(fielEvent.loaded / fielEvent.total * 100 );
        } else if (fielEvent.type === HttpEventType.Response) {
          if (fielEvent.body.status === 'success') {
            this.form.get('url').setValue(fielEvent.body.data.original_url);
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

}
