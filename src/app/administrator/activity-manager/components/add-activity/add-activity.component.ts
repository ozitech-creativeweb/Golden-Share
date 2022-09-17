import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivityService } from '../../../../data/services/guest/activity.service';

import { FileUploadService } from '../../../../data/services/file-upload.service';
import { HttpEventType } from '@angular/common/http';
import { RoutingService } from '../../../../data/helpers/routing.service';
import { ConfigService } from '../../../../data/services/config.service';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.scss']
})
export class AddActivityComponent implements OnInit {
  activeSection: any;
  uploadErr: string;
  uploadRole: string;
  isBusy = false;
  uploadProgress = 0;

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

  
  form = new FormGroup({
    act_id: new FormControl('', []),
    title: new FormControl('', [
      Validators.required,
    ]),
    description: new FormControl('', [
      Validators.required,
    ]),
    act_photo: new FormControl('', [
      Validators.required
    ]),
  });

  sectionForm = new FormGroup({
    secID: new FormControl('', []),
    section_title: new FormControl('', [
    ]),
    section_detail: new FormControl('', [
    ]),
  });

  


  constructor(
    private activityService: ActivityService,
    private fileUploadService: FileUploadService,
    private routingService: RoutingService,
    private configService: ConfigService,
  ) { }

  ngOnInit() {
    this.activitySection();
  }

  get adminUrl() {
    return this.configService.adminURL;
  }

  // IMAGE SUBMIT PROCESSING
  addLeftBanner(event, role) {
    this.uploadErr = null;
    this.uploadRole = role;
    const width = 270;
    const height = 170;
    const mxW = 570;
    const mxH = 470;

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
        fd, 'activity-images', this.getFileName(selectedFile), 1, width, height, mxW, mxH
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
  // IMAGE SUBMIT PROCESSING

  private activitySection(){
    this.activityService.getActSection().subscribe(res => {
      if(res){
        this.activeSection = res;
        console.log(this.activeSection);
        this.retrieveData(res);
      }
    });
  }

  private retrieveData(res: any) {
    this.sectionForm.get('secID').setValue(res.sec_id);
    this.sectionForm.get('section_title').setValue(res.section_title);
    this.sectionForm.get('section_detail').setValue(res.section_detail);
  }

  get title() {
    return this.form.get('title');
  }
  get description() {
    return this.form.get('description');
  }
  get section_title() {
    return this.form.get('section_title');
  }

  get section_detail() {
    return this.form.get('section_detail');
  }

  submit() {
    const data = JSON.stringify(this.form.value);
    this.activityService.addActivity(data).subscribe(res => {
      console.log(res);
      if (res && res.status === 'success') {
        this.activityService.activity();
        this.form.reset();
        alert('Activity added successfully!');
      } else {
        alert('Oops, Error in adding activity!');
      }
    });
  }

  submitSection() {
    const data = JSON.stringify(this.sectionForm.value);
    this.activityService.updateActivitySection(data).subscribe(res => {
      if (res && res.status === 'success') {
        this.activityService.activity();
        this.form.reset();
        alert('Activity section successfully updated!');
      } else {
        alert('Oops, Error in updating activity!');
      }
    });
  }

  // submit(){
  //   console.log(this.form.value);
  // }

  

  

}
