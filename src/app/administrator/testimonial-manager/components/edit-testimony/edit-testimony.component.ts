import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpEventType } from '@angular/common/http';
import { ConfigService } from '../../../../data/services/config.service';
import { FormGroup, FormControl } from '@angular/forms';
import { TestimonialManagerService } from '../../../../data/services/administrator/testimonial-manager.service';
import { RoutingService } from '../../../../data/helpers/routing.service';
import { FileUploadService } from '../../../../data/services/file-upload.service';
import { SEOService } from '../../../../data/services/seo.service';

@Component({
  selector: 'app-edit-testimony',
  templateUrl: './edit-testimony.component.html',
  styleUrls: ['./edit-testimony.component.scss']
})
export class EditTestimonyComponent implements OnInit {
  status: any;

  uploadErr: string;
  uploadRole: string;
  isBusy = false;
  uploadProgress = 0;


  testimonialData: any;
  form: any;
  isLoading = false;

  editTestForm = new FormGroup ({
    testID: new FormControl('', []),
    testimony: new FormControl('', []),
    status: new FormControl('', []),
  });

  constructor(
    private route: ActivatedRoute,
    private testimonialManagerService: TestimonialManagerService,
    private configService: ConfigService,
    private routingService: RoutingService,
    private fileUploadService: FileUploadService,
    private seoService: SEOService

  ) { }

  ngOnInit() {
    this.getTestData();
    this.seoUpdate()
  }

  get adminUrl() {
    return this.configService.adminURL;
  }

  private retrieveData(testimonialData: any) {
    this.editTestForm.get('testID').setValue(testimonialData.test_id);
    this.editTestForm.get('testimony').setValue(testimonialData.testimony);
    this.editTestForm.get('status').setValue(testimonialData.status);
  }

  private getTestData() {
    const testID = parseInt(this.route.snapshot.paramMap.get('id'));
    this.testimonialManagerService.single(testID).subscribe(res => {
      if(res){
        this.testimonialData = res;
        this.retrieveData(res);
        this.isLoading = false;
      }
    });
  }


  submit() {
    this.isLoading = true;
    const data = JSON.stringify(this.editTestForm.value);
    this.testimonialManagerService.updateTestimonial(data).subscribe(res => {
      if (res) {
        this.getTestData();
        alert('Your Request has been updated successfully!');
      } else {
        alert('Oops! we could not update your request.');
      }
      this.isLoading = false;
    });
  }


  // SUBMIT IMAGE

  addUserTestImage(event, role) {
    this.uploadErr = null;
    this.uploadRole = role;
    const width = 150;
    const height = 150;
    const mxW = 400;
    const mxH = 400;

    const selectedFile = <File>event.target.files[0];
    this.uploadHandler(selectedFile, role, width, height, mxW, mxH);
  }

  private uploadHandler(selectedFile, role, width, height, mxW, mxH) {
    this.isBusy = true;
    if (this.validateFile(selectedFile) === 'upload') {
      this.uploadProgress = 1;
      const fd = new FormData;
      fd.append('upload', selectedFile, selectedFile.name);

      this.fileUploadService.upload(
        fd, 'testimonial-images', this.getFileName(selectedFile), 0, width, height, mxW, mxH
      ).subscribe(fielEvent => {
        if (fielEvent.type === HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(fielEvent.loaded / fielEvent.total * 100 );
        } else if (fielEvent.type === HttpEventType.Response) {
          if (fielEvent.body.status === 'success') {
            this.editTestForm.get(role).setValue(fielEvent.body.data.original_url);
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

  private seoUpdate() {
    this.seoService.updateTitle('Edit Testimony');
    this.seoService.updateDescription('Edit Testimony');
  }
}
