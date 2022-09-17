import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TestimonialService } from '../../../../data/services/guest/testimonial.service';

import { FileUploadService } from '../../../../data/services/file-upload.service';
import { HttpEventType } from '@angular/common/http';
import { RoutingService } from '../../../../data/helpers/routing.service';
import { ConfigService } from '../../../../data/services/config.service';
import { UserManagerService } from '../../../../data/services/administrator/user-manager.service';
import { TestimonialManagerService } from '../../../../data/services/administrator/testimonial-manager.service';
import { SEOService } from '../../../../data/services/seo.service';


@Component({
  selector: 'app-add-testimonial',
  templateUrl: './add-testimonial.component.html',
  styleUrls: ['./add-testimonial.component.scss']
})
export class AddTestimonialComponent implements OnInit {

  uploadErr: string;
  uploadRole: string;
  isBusy = false;
  uploadProgress = 0;
  isLoading: any;

  customerStatus: any;
  pageLimit: any;
  customers: any;
  currPage: any;
  customerCounts: any;

  form = new FormGroup({
    loginID: new FormControl('', [
      Validators.required
    ]),
    testimony: new FormControl('', [
      Validators.required
    ]),
  });

  // submit(){
  //   console.log(this.form.value);
  // }

  constructor(
    private testimonialService: TestimonialService,
    private fileUploadService: FileUploadService,
    private routingService: RoutingService,
    private configService: ConfigService,
    private userManagerService: UserManagerService,
    private testimonialManagerService: TestimonialManagerService,
    private seoService: SEOService
  ) { }

  ngOnInit() {
    this.getCustomers();
    this.seoUpdate()
  }

  private getCustomers() {
    this.userManagerService.getCustomers(
      this.customerStatus, this.pageLimit, this.currPage
    ).subscribe(res => {
      if (res) {
        this.customers = res.data;
        this.customerCounts = res.counts;
      }
    });
  }
  
  get adminUrl() {
    return this.configService.adminURL;
  }

  // addLeftBanner(event, role) {
  //   this.uploadErr = null;
  //   this.uploadRole = role;
  //   const width = 150;
  //   const height = 150;
  //   const mxW = 400;
  //   const mxH = 400;

  //   const selectedFile = <File>event.target.files[0];
  //   this.uploadHandler(selectedFile, role, width, height, mxW, mxH);
  // }

  // private uploadHandler(selectedFile, role, width, height, mxW, mxH) {
  //   this.isBusy = true;
  //   if (this.validateFile(selectedFile) === 'upload') {
  //     this.uploadProgress = 1;
  //     const fd = new FormData;
  //     fd.append('upload', selectedFile, selectedFile.name);

  //     this.fileUploadService.upload(
  //       fd, 'testimonial-images', this.getFileName(selectedFile), 1, width, height, mxW, mxH
  //     ).subscribe(fielEvent => {
  //       if (fielEvent.type === HttpEventType.UploadProgress) {
  //         this.uploadProgress = Math.round(fielEvent.loaded / fielEvent.total * 100 );
  //       } else if (fielEvent.type === HttpEventType.Response) {
  //         if (fielEvent.body.status === 'success') {
  //           this.form.get(role).setValue(fielEvent.body.data.original_url);
  //         } else if (fielEvent.body.status === 'failed') {
  //           this.uploadErr = fielEvent.body.data;
  //         } else {
  //           this.uploadErr = 'Oops! Something went wrong, we could not process upload.';
  //         }
  //         this.isBusy = false;
  //         this.uploadProgress = 0;
  //       }
  //     }, err => { console.log(err); }
  //     );
  //   } else {
  //     this.uploadErr = this.validateFile(selectedFile);
  //   }
  // }

  // private validateFile(selectedFile) {
  //   const name = selectedFile.name;
  //   const size = Number(selectedFile.size);
  //   const maxSize = 10000000;
  //   const ext = name.substring(name.lastIndexOf('.') + 1);

  //   if (ext.toLowerCase() !== 'png' &&
  //       ext.toLowerCase() !== 'gif' &&
  //       ext.toLowerCase() !== 'jpeg' &&
  //       ext.toLowerCase() !== 'jpg' ) {
  //     return 'Selected file format is not supported';
  //   } else if (size > maxSize) {
  //     return 'Selected file Size exceeded the maximum required size of ' + maxSize;
  //   } else {
  //     return 'upload';
  //   }
  // }

  // private getFileName(selectedFile) {
  //   return selectedFile.name.split('.')[0];
  // }

  get loginID() {
    return this.form.get('loginID');
  }

  get testimony() {
    return this.form.get('testimony');
  }

  // submit() {
  //   const data = JSON.stringify(this.form.value);
  //   // console.log(data);
  //   this.testimonialService.addTestimony(data).subscribe(res => {
  //     console.log(res);
  //     if (res && res.status === 'success') {
  //       this.testimonialService.testimonial();
  //       this.form.reset();
  //       alert('Testimony added successfully!');
  //     } else {
  //       alert('Oops, Error inadding testimony!');
  //     }
  //   });
  // }


  submit() {
    this.isLoading = true;
    const data = JSON.stringify(this.form.value);
    this.testimonialManagerService.addTestimony(data).subscribe(res => {
      if (res) {
        alert('Testimonial Successfully Posted');
        this.form.reset();
      } else {
        alert('Oops! we could not update your request.');
      }
      this.isLoading = false;
    });
  }

  private seoUpdate() {
    this.seoService.updateTitle('Add Testimony');
    this.seoService.updateDescription('Add Testimony');
  }

}
