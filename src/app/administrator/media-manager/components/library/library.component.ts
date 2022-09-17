import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewMediaModalComponent } from '../view-media-modal/view-media-modal.component';
import { FileUploadService } from '../../../../data/services/file-upload.service';
import { ConfigService } from '../../../../data/services/config.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  uploads: any;
  uploadCounts = 0;

  constructor(
    private modalService: NgbModal,
    private fileUploadService: FileUploadService,
    private configService: ConfigService,
  ) { }

  get adminUrl() {
    return this.configService.adminURL;
  }

  ngOnInit() {
    this.getUploadedFiles();
  }

  getUploadedFiles() {
    this.fileUploadService.getUploads().subscribe();
    this.fileUploadService.uploads.subscribe(res => {
      if (res) {
        this.uploads = res.data;
        this.uploadCounts = res.count;
      }
    });
  }

  openViewMedia(upload) {
    const  modalRef = this.modalService.open(
      ViewMediaModalComponent, { size: 'xl', scrollable: true }
    );
    modalRef.componentInstance.upload = upload;
  }
}
