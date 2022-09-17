import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { PagesService } from '../../../../data/services/administrator/pages.service';
import { ConfigService } from '../../../../data/services/config.service';
import { RoutingService } from '../../../../data/helpers/routing.service';
import { ActivatedRoute } from '@angular/router';
import { EmailTemplateManagerService } from '../../../../data/services/administrator/email-template-manager.service';
import { SEOService } from '../../../../data/services/seo.service';

@Component({
  selector: 'app-email-template-edit',
  templateUrl: './email-template-edit.component.html',
  styleUrls: ['./email-template-edit.component.scss']
})
export class EmailTemplateEditComponent implements OnInit {
  isAdding = false;
  success: string;
  template: any;

  form = new FormGroup({
    title: new FormControl('', [
      Validators.required
    ]),
    content: new FormControl('', [
      Validators.required
    ]),
    footer: new FormControl('', [
      Validators.required
    ]),
    id: new FormControl('', []),
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
    private emailTemplateManagerService: EmailTemplateManagerService,
    private configService: ConfigService,
    private routingService: RoutingService,
    private route: ActivatedRoute,
    private seoService: SEOService
  ) { }

  get adminUrl() {
    return this.configService.adminURL;
  }

  ngOnInit() {
    // tslint:disable-next-line: radix
    const id  = parseInt(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getEmailContent(id);
    } else {
      this.routingService.replace([
        '/' + this.adminUrl + '/content-manager/email-templates'
      ]);
    }
    this.seoUpdate()
  }

  private getEmailContent(id) {
    this.emailTemplateManagerService.getAll().subscribe(res => {
      if (res) {
        const data = res.filter(cont => cont.id === id)[0];

        if (data) {
          this.template = data;
          this.form.get('id').setValue(data.id);
          this.form.get('title').setValue(data.title);
          this.form.get('content').setValue(data.content);
          this.form.get('footer').setValue(data.footer);
        }
      }
    });
  }

  submit() {
    this.isAdding = true;
    const data =  JSON.stringify(this.form.value);
    if (this.form.value.content.length > 50) {
      this.emailTemplateManagerService.updateRecord(data).subscribe(res => {
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
    } else {
      alert('Minimum required character is 50');
      this.isAdding = false;
    }
  }

  private seoUpdate() {
    this.seoService.updateTitle('Edit Email Template');
    this.seoService.updateDescription('Edit Email Template');
  }

}
