import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfigService } from '../../../../data/services/config.service';
import { FileUploadService } from '../../../../data/services/file-upload.service';
import { HttpEventType } from '@angular/common/http';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { BiggestAdvantageService } from '../../../../data/services/guest/biggest-advantage-service';
import { SEOService } from '../../../../data/services/seo.service';

@Component({
  selector: 'app-biggest-advantage',
  templateUrl: './biggest-advantage.component.html',
  styleUrls: ['./biggest-advantage.component.scss']
})
export class BiggestAdvantageComponent implements OnInit {

  advantages: any;
  isAddingSlide = false;
  isUpdaing = false;
  isBusy = false;
  uploadProgress = 0;
  uploadErr: string;
  uploadRole: string;


  form = new FormGroup({
    id: new FormControl('', []),
    adv_img: new FormControl('', [
      Validators.required
    ]),
    // slide_left_link: new FormControl('', []),

    main_title: new FormControl('', []),
    sub_title: new FormControl('', []),
    content: new FormControl('', []),

  });

  get adminUrl() {
    return this.configService.adminURL;
  }

  constructor(
    private configService: ConfigService,
    private fileUploadService: FileUploadService,
    private biggestAdvantageservice: BiggestAdvantageService,
    private seoService: SEOService
  ) { }

  ngOnInit() {
    this.getSlides();
    this.seoUpdate()
  }

  private getSlides() {
    this.biggestAdvantageservice.biggestAdvantageByAdmin().subscribe(res => {
      if (res) {
        this.advantages = res.advantage;
      }
      this.setBannerValue(res.advantage);
    });
  }

  private setBannerValue(advantage) {
    if (advantage) {
      this.form.get('id').setValue(advantage.id);
      this.form.get('main_title').setValue(advantage.main_title);
      
      this.form.get('sub_title').setValue(advantage.sub_title);
      this.form.get('adv_img').setValue(advantage.adv_img);
      this.form.get('content').setValue(advantage.content);
    }
  }


  submit() {
    this.isUpdaing = true;
    const data = JSON.stringify(this.form.value);
    this.biggestAdvantageservice.updateBiggestAdvantage(data).subscribe(res => {
      if (res.status === 'success') {
        alert('Successfully Updated.');
        this.getSlides();
      } else {
        alert('Oops! Something went wrong.');
      }
      this.isUpdaing = false;
    });
  }

  addLeftBanner(event, role) {
    this.uploadErr = null;
    this.uploadRole = role;
    const width = 700;
    const height = 489;
    const mxW = 2000;
    const mxH = 2000;

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
        fd, 'p2p-advantage', this.getFileName(selectedFile), 0, width, height, mxW, mxH
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

  private seoUpdate() {
    this.seoService.updateTitle('Biggest Advantage');
    this.seoService.updateDescription('Biggest Advantage');
  }

}
