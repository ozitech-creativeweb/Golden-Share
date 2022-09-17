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
  selector: 'app-edit-sms-template',
  templateUrl: './edit-sms-template.component.html',
  styleUrls: ['./edit-sms-template.component.scss']
})
export class EditSmsTemplateComponent implements OnInit {

  isAdding = false;
  success: string;
  template: any;

  form = new FormGroup({
    title: new FormControl('', [
      Validators.required
    ]),
    sms: new FormControl('', [
      Validators.required,
      Validators.minLength(10)
    ]),
    id: new FormControl('', []),
  });


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
        '/' + this.adminUrl + '/content-manager/sms-template'
      ]);
    }
    this.seoUpdate()
  }

  private getEmailContent(id) {
    this.emailTemplateManagerService.smsTemplate().subscribe(res => {
      if (res) {
        const data = res.filter(cont => cont.id === id)[0];

        if (data) {
          this.template = data;
          this.form.get('id').setValue(data.id);
          this.form.get('title').setValue(data.title);
          this.form.get('sms').setValue(data.sms);
        }
      }
    });
  }

  submit() {
    this.isAdding = true;
    const data =  JSON.stringify(this.form.value);
    this.emailTemplateManagerService.updatesms(data).subscribe(res => {
      if (res.status === 'success') {
        this.success = 'Successfully updated';
      } else if (res.status === 'failed') {
        alert("Updated Successfully");
        this.success = null;
      } else {
        this.success = null;
        alert('Oops! Something went wrong, we could not process your request.');
      }
      this.isAdding = false;
    });
    this.isAdding = false;
  }

  private seoUpdate() {
    this.seoService.updateTitle('Edit SMS Template');
    this.seoService.updateDescription('Edit SMS Template');
  }

}
