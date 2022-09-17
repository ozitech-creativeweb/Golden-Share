import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfigService } from '../../../../data/services/config.service';
import { CategoryService } from '../../../../data/services/guest/category.service';
import { FileUploadService } from '../../../../data/services/file-upload.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-categories-banner',
  templateUrl: './categories-banner.component.html',
  styleUrls: ['./categories-banner.component.scss']
})
export class CategoriesBannerComponent implements OnInit {
  isAdding = false;
  isLoading = false;
  categories: any;
  bannerAds: any;
  addBannerError: string;

  uploadProgress = 0;
  uploadErr: any;

  form = new FormGroup({
    category: new FormControl('', [
      Validators.required
    ]),
    title: new FormControl('', []),
    banner: new FormControl('', [
      Validators.required
    ]),
    link: new FormControl('', []),
  });

  get adminUrl() {
    return this.configService.adminURL;
  }

  constructor(
    private configService: ConfigService,
    private categoryService: CategoryService,
    private fileUploadService: FileUploadService,
  ) { }

  ngOnInit() {
    this.getCategories();
    this.getBannerAds();
  }

  submit() {
    this.isAdding = true;
    const data = JSON.stringify(this.form.value);
    this.categoryService.addBannerAd(data).subscribe(res => {
      if (res && res.status === 'success') {
        this.addBannerError = null;
        this.getBannerAds();
        this.form.reset();
        alert('Banner ad added successfully!');
      } else {
        this.addBannerError = 'Oops! It seems the selected category already exist, you can delete and add it again.';
      }
      this.isAdding = false;
    });
  }

  private getCategories() {
    this.categoryService.getCategories.subscribe(res => {
      this.categories = res;
    });
  }

  private getBannerAds() {
    this.categoryService.bannerAds().subscribe(res => {
      this.bannerAds = res;
    });
  }

  deleteCategory(ad) {
    const x = 'Are you sure you want to DELETE: ' + ad.title + '?';
    if (confirm(x)) {
      this.categoryService.deleteBannerAd(ad.id).subscribe(res => {
        if (res && res.status === 'success') {
          this.getBannerAds();
        } else {
          alert('Oops! Something went wrong.');
        }
      });
    }
  }

  addBanner(event) {
    this.uploadErr = null;
    const width = 1000;
    const height = 250;

    const selectedFile = <File>event.target.files[0];

    if (this.validateFile(selectedFile) === 'upload') {
      this.uploadProgress = 1;
      const fd = new FormData;
      fd.append('upload', selectedFile, selectedFile.name);

      this.fileUploadService.upload(
        fd, 'category-banners', this.getFileName(selectedFile), 0, width, height
      ).subscribe(fielEvent => {
        if (fielEvent.type === HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(fielEvent.loaded / fielEvent.total * 100 );
        } else if (fielEvent.type === HttpEventType.Response) {
          if (fielEvent.body.status === 'success') {
            this.form.get('banner').setValue(fielEvent.body.data.original_url);
          } else if (fielEvent.body.status === 'failed') {
            this.uploadErr = fielEvent.body.data;
          } else {
            this.uploadErr = 'Oops! Something went wrong, we could not process upload.';
          }
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

}
