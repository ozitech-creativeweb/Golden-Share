import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadService } from '../../../../data/services/file-upload.service';

@Component({
  selector: 'app-view-media-modal',
  templateUrl: './view-media-modal.component.html',
  styleUrls: ['./view-media-modal.component.scss']
})
export class ViewMediaModalComponent implements OnInit {
  @Input() upload: any;

  constructor(
    private modalService: NgbModal,
    private fileUploadService: FileUploadService
  ) { }

  ngOnInit() {
  }

  closeViewMedia() {
    this.modalService.dismissAll();
  }

  delete(upload) {
    const x = 'Are you sure you want to DELETE this uploaded file?';
    if (confirm(x)) {
      this.fileUploadService.delete(upload.id).subscribe(res => {
        if (res.status === 'success') {
          this.fileUploadService.getUploads().subscribe();
          this.closeViewMedia();
        } else {
          alert('Oops! Something went wrong, we could not process your request.');
        }
      });
    }
  }

}
