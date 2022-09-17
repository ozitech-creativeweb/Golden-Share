import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfigService } from '../../../../data/services/config.service';
import { FileUploadService } from '../../../../data/services/file-upload.service';
import { HttpEventType } from '@angular/common/http';
import { HomeSliderService } from '../../../../data/services/guest/home-slider.service';
import { RoutingService } from '../../../../data/helpers/routing.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { SEOService } from '../../../../data/services/seo.service';


@Component({
  selector: 'app-home-page-banners',
  templateUrl: './home-page-banners.component.html',
  styleUrls: ['./home-page-banners.component.scss']
})
export class HomePageBannersComponent implements OnInit {

  get adminUrl() {
    return this.configService.adminURL;
  }

  constructor(
    private configService: ConfigService,
    private fileUploadService: FileUploadService,
    private homeSliderService: HomeSliderService,
    private routingService: RoutingService,
    private seoService: SEOService
  ) { }
  sliders: any;
  banners: any;
  isAddingSlide = false;
  isUpdaing = false;
  isBusy = false;
  uploadProgress = 0;
  uploadErr: string;
  uploadRole: string;

  mainSlider = new FormGroup({
    title: new FormControl('', []),
    url: new FormControl('', []),
    banner: new FormControl('', [
      Validators.required
    ]),
    descr: new FormControl('', []),
  });

  form = new FormGroup({
    id: new FormControl('', []),
    slide_left: new FormControl('', [
      Validators.required
    ]),
    slide_left_link: new FormControl('', []),
    about_title: new FormControl('', []),
    about_sub_title: new FormControl('', []),
    about_content: new FormControl('', []),
  });




  // WYSIWYG
  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: 'auto',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'},
        {class: 'algerian', name: 'Algerian'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };

  ngOnInit() {
    this.getSlides();
    this.seoUpdate();
  }

  private getSlides() {
    this.homeSliderService.slidersByAdmin().subscribe(res => {
      if (res) {
        this.sliders = res.slides;
        this.banners = res.banners;
      }
      this.setBannerValue(res.banners);
    });
  }

  private setBannerValue(banner) {
    if (banner) {
      this.form.get('id').setValue(banner.id);
      this.form.get('slide_left').setValue(banner.slide_left);
      this.form.get('slide_left_link').setValue(banner.slide_left_link);
      this.form.get('about_title').setValue(banner.about_title);
      this.form.get('about_sub_title').setValue(banner.about_sub_title);
      this.form.get('about_content').setValue(banner.about_content);
    }
  }

  submitMainSlider() {
    this.isAddingSlide = true;
    const data = JSON.stringify(this.mainSlider.value);
    this.homeSliderService.addSlide(data).subscribe(res => {
      if (res.status === 'success') {
        this.mainSlider.reset();
        this.getSlides();
      } else {
        alert('Oops! An error occured, we could not process your request.');
      }
      this.isAddingSlide = false;
    });
  }

  submit() {
    this.isUpdaing = true;
    const data = JSON.stringify(this.form.value);
    this.homeSliderService.updateHomeBanner(data).subscribe(res => {
      if (res.status === 'success') {
        this.getSlides();
        alert('Update is successful');
      } else {
        alert('Oops! Something went wrong.');
      }
      this.isUpdaing = false;
    });
  }

  addSlide(event, role) {
    this.uploadErr = null;
    this.uploadRole = role;
    const width = 500;
    const height = 500;
    const mxW = 5000;
    const mxH = 5000;

    const selectedFile = <File>event.target.files[0];
    this.uploadHandler(selectedFile, role, width, height, mxW, mxH);
  }

  addLeftBanner(event, role) {
    this.uploadErr = null;
    this.uploadRole = role;
    const width = 300;
    const height = 301;
    const mxW = 800;
    const mxH = 804;

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
        fd, 'home-banners', this.getFileName(selectedFile), 0, width, height, mxW, mxH
      ).subscribe(fielEvent => {
        if (fielEvent.type === HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(fielEvent.loaded / fielEvent.total * 100 );
        } else if (fielEvent.type === HttpEventType.Response) {
          if (fielEvent.body.status === 'success') {
            if (role === 'banner') {
              this.mainSlider.get('banner').setValue(fielEvent.body.data.original_url);
            } else {
              this.form.get(role).setValue(fielEvent.body.data.original_url);
            }
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

  delete(id) {
    const x = 'Are you sure you want to DELETE this slide?';
    if (confirm(x)) {
      this.homeSliderService.delete(id).subscribe(res => {
        if (res) {
          this.getSlides();
        } else {
          alert('Oops! Something went wrong, we could not process your request.');
        }
      });
    }
  }

  edit(id) {
    this.routingService.replace([
      this.adminUrl + '/content-manager/home-banners/' + id
    ]);
  }

  removeBanner(role) {
    this.banners[role] = null;
    this.form.get(role).setValue('');
  }

  private seoUpdate() {
    this.seoService.updateTitle('Home Page Banners');
    this.seoService.updateDescription('Home Page Banners');
  }

}
