import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../../data/services/config.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NewsManagerService } from '../../../../data/services/administrator/news-manager.service';
import { SEOService } from '../../../../data/services/seo.service';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.scss']
})
export class AddNewsComponent implements OnInit {

  form = new FormGroup({
    title: new FormControl('', [
      Validators.required
    ]),
    content: new FormControl('', [
      Validators.required
    ]),
  });

  constructor(
    private configService: ConfigService,
    private newsManagerService: NewsManagerService,
    private seoService: SEOService
  ) { }

  ngOnInit() {
    this.seoUpdate()
  }

  get adminUrl() {
    return this.configService.adminURL;
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

  submit() {
    const data = JSON.stringify(this.form.value);
    this.newsManagerService.createNews(data).subscribe(res => {
      console.log(res);
      if (res && res.status === 'success') {
        // this.newsManagerService.activity();
        this.form.reset();
        alert('News added successfully!');
      } else {
        alert('Oops, Error in adding News!');
      }
    });
  }

  private seoUpdate() {
    this.seoService.updateTitle('Add News');
    this.seoService.updateDescription('Add News');
  }

}
