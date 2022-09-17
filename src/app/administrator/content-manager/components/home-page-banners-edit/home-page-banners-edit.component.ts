import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '../../../../data/services/config.service';
import { FileUploadService } from '../../../../data/services/file-upload.service';
import { HttpEventType } from '@angular/common/http';
import { HomeSliderService } from '../../../../data/services/guest/home-slider.service';
import { RoutingService } from '../../../../data/helpers/routing.service';
import { SEOService } from '../../../../data/services/seo.service';

@Component({
  selector: 'app-home-page-banners-edit',
  templateUrl: './home-page-banners-edit.component.html',
  styleUrls: ['./home-page-banners-edit.component.scss']
})
export class HomePageBannersEditComponent implements OnInit {
  slide: any;
  isUpdating = false;
  addSLideProgress = 0;
  uploadSLideError:  string;

  mainSlider = new FormGroup({
    id: new FormControl('', []),
    title: new FormControl('', []),
    url: new FormControl('', []),
    status: new FormControl('', []),
    banner: new FormControl('', [
      Validators.required
    ]),
    descr: new FormControl('', []),
  });

  get adminUrl() {
    return this.configService.adminURL;
  }

  constructor(
    private route: ActivatedRoute,
    private configService: ConfigService,
    private fileUploadService: FileUploadService,
    private homeSliderService: HomeSliderService,
    private routingService: RoutingService,
    private seoService: SEOService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('slide-id');
    if (id) {
      this.getSlides(id);
    } else {
      this.routingService.replace([
        this.adminUrl + '/content-manager/home-banners'
      ]);
    }
    this.seoUpdate()
  }

  private getSlides(id) {
    this.homeSliderService.singleSlide(id).subscribe(res => {
      if (res.status === 'success') {
        this.slide = res.data;
        this.mainSlider.get('id').setValue(res.data.id);
        this.mainSlider.get('title').setValue(res.data.title);
        this.mainSlider.get('status').setValue(
          res.data.status ? 'Active' : 'Inactive'
        );
        this.mainSlider.get('url').setValue(res.data.url);
        this.mainSlider.get('banner').setValue(res.data.banner);
        this.mainSlider.get('descr').setValue(res.data.descr);
      }
    });
  }

  submitMainSlider() {
    this.isUpdating = true;
    const data = JSON.stringify(this.mainSlider.value);
    this.homeSliderService.edit(data).subscribe(res => {
      if (res.status === 'success') {
        this.getSlides(this.slide.id);
        alert('Slide updated successfully!');
      } else {
        alert('Oops! An error occured, we could not process your request.');
      }
      this.isUpdating = false;
    });
  }

  addSlide(event) {
    this.uploadSLideError = null;
    const selectedFile = <File>event.target.files[0];

    if (this.validateFile(selectedFile) === 'upload') {
      this.addSLideProgress = 1;
      const fd = new FormData;
      fd.append('upload', selectedFile, selectedFile.name);

      this.fileUploadService.upload(
        fd, 'slides', this.getFileName(selectedFile), 0
      ).subscribe(fielEvent => {
        if (fielEvent.type === HttpEventType.UploadProgress) {
          this.addSLideProgress = Math.round(fielEvent.loaded / fielEvent.total * 100 );
        } else if (fielEvent.type === HttpEventType.Response) {
          if (fielEvent.body.status === 'success') {
            this.mainSlider.get('banner').setValue(fielEvent.body.data.original_url);
          } else if (fielEvent.body.status === 'failed') {
            this.uploadSLideError = fielEvent.body.data;
          } else {
            this.uploadSLideError = 'Oops! Something went wrong, we could not process upload.';
          }
          this.addSLideProgress = 0;
        }
      }, err => { console.log(err); }
      );
    } else {
      this.uploadSLideError = this.validateFile(selectedFile);
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
    this.seoService.updateTitle('Edit Home Page Banners');
    this.seoService.updateDescription('Edit Home Page Banners');
  }

}
