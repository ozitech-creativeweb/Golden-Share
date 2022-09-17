import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../../data/services/config.service';
import { FileUploadService } from '../../../../data/services/file-upload.service';
import { HttpEventType } from '@angular/common/http';
import { RoutingService } from '../../../../data/helpers/routing.service';

@Component({
  selector: 'app-add-new-media',
  templateUrl: './add-new-media.component.html',
  styleUrls: ['./add-new-media.component.scss']
})
export class AddNewMediaComponent implements OnInit {
  selectedFile: File = null;
  selectedFileName: string;
  tempFile: any;
  uploadingProgress = 0;

  itemImages: any[] = [];
  fileUploadError: any;
  fileUploadSuccess = false;

  constructor(
    private configService: ConfigService,
    private fileUploadService: FileUploadService,
    private routingService: RoutingService
  ) { }

  get adminUrl() {
    return this.configService.adminURL;
  }

  ngOnInit() {
  }

  // file upload
  async onSelectedFile(event) {
    this.fileUploadError = null;
    const selectedFile = <File>event.target.files[0];
    const sizeConfig = {
      minWidth: 220, maxWidth: 2500, minHeight: 220, maxHeight: 2500
    };

    if (this.validateFile(selectedFile) === 'upload') {
      this.uploadingProgress = 1;
      this.fileUploadError = null;
      const fd = new FormData;
      fd.append('upload', selectedFile, selectedFile.name);

      this.fileUploadService.upload(
        fd, 'products', this.getFileName(selectedFile), 0
      ).subscribe(fielEvent => {
        if (fielEvent.type === HttpEventType.UploadProgress) {
          this.uploadingProgress = Math.round(fielEvent.loaded / fielEvent.total * 100 );
        } else if (fielEvent.type === HttpEventType.Response) {
          if (fielEvent.body.status === 'success') {
            this.routingService.replace(['/' + this.adminUrl + '/media-manager']);
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
