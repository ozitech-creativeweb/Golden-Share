import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormGroup, FormControl } from '@angular/forms';
import { ConfigService } from '../../../../data/services/config.service';

import { ActivatedRoute } from '@angular/router';
import { HttpEventType } from '@angular/common/http';
import { RoutingService } from '../../../../data/helpers/routing.service';
import { FileUploadService } from '../../../../data/services/file-upload.service';
import { ActivitiesManagerService } from '../../../../data/services/administrator/activities-manager.service';

@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity.component.html',
  styleUrls: ['./edit-activity.component.scss']
})
export class EditActivityComponent implements OnInit {
  activityData: any;
  isLoading = false;

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
      actID: new FormControl('', []),
      title: new FormControl('', []),
      description: new FormControl('', []),
      act_photo: new FormControl('', []),
      status: new FormControl('', []),
    });


  constructor(
    private configService: ConfigService,
    private activityManager: ActivitiesManagerService,
    private route: ActivatedRoute,
    private fileUploadService: FileUploadService
  ) { }

  ngOnInit() {
    this.getActivityData();
  }

  get adminUrl() {
    return this.configService.adminURL;
  }

  private retrieveData(activityData: any) {
    this.form.get('actID').setValue(activityData.act_id);
    this.form.get('title').setValue(activityData.act_title);
    this.form.get('description').setValue(activityData.act_content);
    this.form.get('act_photo').setValue(activityData.act_photo);
    this.form.get('status').setValue(activityData.status);
  }

  private getActivityData() {
    const actID = parseInt(this.route.snapshot.paramMap.get('id'));
    this.activityManager.single(actID).subscribe(res => {
      if(res){
        this.activityData = res;
        this.retrieveData(res);
        this.isLoading = false;
      }
    });
  }


  submit() {
    this.isLoading = true;
    const data = JSON.stringify(this.form.value);
    this.activityManager.updateActivity(data).subscribe(res => {
      if (res) {
        this.getActivityData();
        alert('Your Request has been updated successfully!');
      } else {
        alert('Oops! we could not update your request.');
      }
      this.isLoading = false;
    });
  }


  // UPLOAD IMAGE
  addUserActImage(event, role) {
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
        fd, 'activity-images', this.getFileName(selectedFile), 0, width, height, mxW, mxH
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


}
