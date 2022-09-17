import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfigService } from '../../../../data/services/config.service';
import { CategoryService } from '../../../../data/services/guest/category.service';
import { FileUploadService } from '../../../../data/services/file-upload.service';
import { HttpEventType } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-feature-category-edit',
  templateUrl: './feature-category-edit.component.html',
  styleUrls: ['./feature-category-edit.component.scss']
})
export class FeatureCategoryEditComponent implements OnInit {
  isAdding = false;
  isLoading = false;
  categories: any;
  featuredInfo: any;
  addFeaturedCatError: string;
  id: number;

  isBusy = false;
  uploadProgress = 0;
  uploadErr: string;
  uploadRole: string;

  form = new FormGroup({
    category: new FormControl('', [
      Validators.required
    ]),
    title: new FormControl('', [
      Validators.required
    ]),
    full_width_banner: new FormControl('', []),
    full_width_banner_link: new FormControl('', []),
    left_banner: new FormControl('', []),
    left_banner_link: new FormControl('', []),
    right_banner: new FormControl('', []),
    right_banner_link: new FormControl('', []),
    id: new FormControl('', []),
    page: new FormControl('', []),
  });

  get adminUrl() {
    return this.configService.adminURL;
  }

  constructor(
    private configService: ConfigService,
    private categoryService: CategoryService,
    private fileUploadService: FileUploadService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    // tslint:disable-next-line: radix
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.getFeaturedCats();
    this.getCategories();
  }

  submit() {
    this.isAdding = true;
    this.addFeaturedCatError = null;
    const data = JSON.stringify(this.form.value);
    this.categoryService.addHomeFeaturedCat(data).subscribe(res => {
      if (res && res.status === 'success') {
        this.form.reset();
        this.getFeaturedCats();
      } else {
       this.addFeaturedCatError = 'You can not add same category multiple times!';
      }
      this.isAdding = false;
    });
  }

  private getCategories() {
    this.categoryService.getCategories.subscribe(res => {
      this.categories = res;
    });
  }

  private getFeaturedCats() {
    const id = this.id;
    this.categoryService.homeFeaturedCats().subscribe(res => {
      const result = res.filter(item => item.id === id)[0];
      if (result) {
        this.featuredInfo = result;
        this.form.get('category').setValue(result.category);
        this.form.get('title').setValue(result.title);
        this.form.get('full_width_banner').setValue(result.full_width_banner);
        this.form.get('full_width_banner_link').setValue(result.full_width_banner_link);
        this.form.get('left_banner').setValue(result.left_banner);
        this.form.get('left_banner_link').setValue(result.left_banner_link);
        this.form.get('right_banner').setValue(result.right_banner);
        this.form.get('right_banner_link').setValue(result.right_banner_link);
        this.form.get('id').setValue(result.id);
        this.form.get('page').setValue('edit');
      }
    });
  }

  addFullBanner(event, role) {
    this.uploadErr = null;
    this.uploadRole = role;
    const width = 800;
    const height = 120;
    const mxW = 2000;
    const mxH = 400;
    const selectedFile = <File>event.target.files[0];
    this.uploadHandler(selectedFile, role, width, height, mxW, mxH);
  }

  addLeftRight(event, role) {
    this.uploadErr = null;
    this.uploadRole = role;
    const width = 1144;
    const height = 500;
    const selectedFile = <File>event.target.files[0];
    this.uploadHandler(selectedFile, role, width, height, width, height);
  }

  private uploadHandler(selectedFile, role, width, height, mxW, mxH) {
    this.isBusy = true;
    if (this.validateFile(selectedFile) === 'upload') {
      this.uploadProgress = 1;
      const fd = new FormData;
      fd.append('upload', selectedFile, selectedFile.name);

      this.fileUploadService.upload(
        fd, 'home-banners', this.getFileName(selectedFile), 0, width, height, mxW, mxH
      ).subscribe(fielEvent => {
        if (fielEvent.type === HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(fielEvent.loaded / fielEvent.total * 100 );
        } else if (fielEvent.type === HttpEventType.Response) {
          if (fielEvent.body.status === 'success') {
            this.form.get(role).setValue(fielEvent.body.data.original_url);
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

  remove(column) {
    const x = 'Are you sure you want to remove this photo?';
    if (confirm(x)) {
      this.form.get(column).setValue(null);
      this.featuredInfo[column] = null;
    }
  }

}
