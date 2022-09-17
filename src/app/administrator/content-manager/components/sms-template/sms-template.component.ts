import { Component, OnInit } from '@angular/core';
import { PagesService } from '../../../../data/services/administrator/pages.service';
import { ConfigService } from '../../../../data/services/config.service';
import { RoutingService } from '../../../../data/helpers/routing.service';
import { EmailTemplateManagerService } from '../../../../data/services/administrator/email-template-manager.service';
import { SEOService } from '../../../../data/services/seo.service';


@Component({
  selector: 'app-sms-template',
  templateUrl: './sms-template.component.html',
  styleUrls: ['./sms-template.component.scss']
})
export class SmsTemplateComponent implements OnInit {

  templates: any;
  pageCounts = 0;

  constructor(
    private emailTemplateManagerService: EmailTemplateManagerService,
    private configService: ConfigService,
    private routingService: RoutingService,
    private seoService: SEOService
  ) { }

  get adminUrl() {
    return this.configService.adminURL;
  }

  ngOnInit() {
    this.getTemplates();
    this.seoUpdate()
  }

  private getTemplates() {
    this.emailTemplateManagerService.smsTemplate().subscribe(res => {
      if (res) {
        this.templates = res;
      }
    });
  }

  private seoUpdate() {
    this.seoService.updateTitle('Email Templates');
    this.seoService.updateDescription('Email Templates');
  }

}
