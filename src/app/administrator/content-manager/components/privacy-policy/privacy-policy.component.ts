import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormGroup, FormControl } from '@angular/forms';
import { SEOService } from '../../../../data/services/seo.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {

  privacyPolicy = new FormGroup({
    policy: new FormControl('', []),
  });

  submit(){
    console.log(this.privacyPolicy.value);
  }

  constructor(
    private seoService: SEOService
  ) { }

  ngOnInit() {
    this.seoUpdate()
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
    this.seoService.updateTitle('Privacy Policy');
    this.seoService.updateDescription('Privacy Policy');
  }

}
