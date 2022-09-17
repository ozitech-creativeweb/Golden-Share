import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { PagesService } from '../../../../data/services/administrator/pages.service';
import { ConfigService } from '../../../../data/services/config.service';
import { RoutingService } from '../../../../data/helpers/routing.service';
import { ActivatedRoute } from '@angular/router';
import { SEOService } from '../../../../data/services/seo.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {
  isAdding = false;
  success: string;
  page: any;

  form = new FormGroup({
    title: new FormControl('', [
      Validators.required
    ]),
    type: new FormControl('', [
      Validators.required
    ]),
    contents: new FormControl('', [
      Validators.required
    ]),
    id: new FormControl('', []),
    url: new FormControl('', []),
    status: new FormControl('', []),
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

  constructor(
    private pagesService: PagesService,
    private configService: ConfigService,
    private routingService: RoutingService,
    private route: ActivatedRoute,
    private seoService: SEOService
  ) { }

  get adminUrl() {
    return this.configService.adminURL;
  }

  ngOnInit() {
    const id  = this.route.snapshot.paramMap.get('page-id');
    if (id) {
      this.getPage(id);
    } else {
      this.routingService.replace([
        '/' + this.adminUrl + '/content-manager/pages'
      ]);
    }
    this.seoUpdate()
  }

  private getPage(id) {
    this.pagesService.single(id).subscribe(res => {
      if (res.status === 'success') {
        this.page = res.data;
        this.form.get('id').setValue(res.data.id);
        this.form.get('type').setValue(res.data.type);
        this.form.get('title').setValue(res.data.title);
        this.form.get('contents').setValue(res.data.contents);
        this.form.get('url').setValue(res.data.url);
        this.form.get('status').setValue(
          res.data.status ? 'Active' : 'Inactive'
        );
      }
    });
  }

  submit() {
    this.isAdding = true;
    const data =  JSON.stringify(this.form.value);
    this.pagesService.edit(data).subscribe(res => {
      if (res.status === 'success') {
        this.success = 'Successfully updated';
      } else if (res.status === 'failed') {
        alert(data);
        this.success = null;
      } else {
        this.success = null;
        alert('Oops! Something went wrong, we could not process your request.');
      }
      this.isAdding = false;
    });
  }

  private seoUpdate() {
    this.seoService.updateTitle('Update Biggest Advantage');
    this.seoService.updateDescription('Update Biggest Advantage');
  }

}
