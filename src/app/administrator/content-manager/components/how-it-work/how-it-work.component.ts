import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { OtherManagerService } from '../../../../data/services/administrator/other-manager.service';
import { ConfigService } from '../../../../data/services/config.service';
import { HowItWorksService } from '../../../../data/services/guest/how-it-works.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-how-it-work',
  templateUrl: './how-it-work.component.html',
  styleUrls: ['./how-it-work.component.scss']
})
export class HowItWorkComponent implements OnInit {
  more: FormArray;
  form: FormGroup;
  isAdding = false;
  success: any;

  // form = new FormGroup({
  //   id: new FormControl('', []),
  // });

  get moreFormGroup() {
    return this.form.get('main_title') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private configService: ConfigService,
    private howItWorkService: HowItWorksService,
  ) { }

  ngOnInit() {
    this.getBankDetails();
    this.formHandler();
  }

  get adminUrl() {
    return this.configService.adminURL;
  }

  createMore(): FormGroup {
    return this.fb.group({
      title: [null],
      content: [null],
      icon: [null],
    });
  }

  updateMore(obj): FormGroup {
    return this.fb.group({
      title: obj.title,
      content: obj.content,
      icon: obj.icon,
    });
  }

  addMore() {
    this.more.push(this.createMore());
  }

  remove(index) {
    const x = 'Are you sure you want to REMOVE this?';
    if (confirm(x)) {
      this.more.removeAt(index);
    }
  }

  private formHandler() {
    this.form = this.fb.group({
      main_title: this.fb.array([this.createMore()]),
      id: new FormControl('', []),
    });
    this.more = this.form.get('main_title') as FormArray;
    this.form.get('id').setValue('1');
  }

  submit() {
    this.isAdding = true;
    const data = JSON.stringify(this.form.value);
    this.howItWorkService.updateHowItWork(data)
    .subscribe(res => {
      console.log(res);
      if (res.status === 'success') {
        this.getBankDetails();
        this.success = 'Updated successfully!';
        alert('Success! your request has been updated successfully.');
      } else {
        this.success = null;
        alert('Oops! Something went wrong, we could not update your request');
      }
      this.isAdding = false;
    });
  }

  private getBankDetails() {
    this.howItWorkService.howItWorkByAdmin().subscribe(res => {
      if (res) {
        const data = JSON.parse(res.howWork.main_title);
        if (data && data.length > 0) {
          this.more.removeAt(0);
        }
        let i;
        for (i = 0; i < data.length; i++) {
          this.more.push(this.updateMore(data[i]));
        }
      }
    });
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

}
