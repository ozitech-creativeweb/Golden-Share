import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentManagerRoutingModule } from './content-manager-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { HomeContentComponent } from './components/home-content/home-content.component';

import { AboutUsComponent } from './components/about-us/about-us.component';
// tslint:disable-next-line: max-line-length
import { TermsAndConditionComponent } from './components/terms-and-condition/terms-and-condition.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HomePageBannersComponent } from './components/home-page-banners/home-page-banners.component';
import { PagesComponent } from './components/pages/pages.component';
import { AddPageComponent } from './components/add-page/add-page.component';
import { EditPageComponent } from './components/edit-page/edit-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module';
// tslint:disable-next-line: max-line-length
import { ContentManagerMenuComponent } from './components/content-manager-menu/content-manager-menu.component';
// tslint:disable-next-line: max-line-length
import { HomePageBannersEditComponent } from './components/home-page-banners-edit/home-page-banners-edit.component';
import { ManageMenuComponent } from './components/manage-menu/manage-menu.component';
import { EmailTemplatesComponent } from './components/email-templates/email-templates.component';
// tslint:disable-next-line: max-line-length
import { EmailTemplateEditComponent } from './components/email-template-edit/email-template-edit.component';
import { HowItWorkComponent } from './components/how-it-work/how-it-work.component';
import { BiggestAdvantageComponent } from './components/biggest-advantage/biggest-advantage.component';
import { SmsTemplateComponent } from './components/sms-template/sms-template.component';
import { EditSmsTemplateComponent } from './components/edit-sms-template/edit-sms-template.component';
import { LocalBanksComponent } from './components/local-banks/local-banks.component';
import { AdminSharedModule } from '../admin-shared/admin-shared.module';


@NgModule({
  declarations: [
    // HomeContentComponent,
    AboutUsComponent,
    TermsAndConditionComponent,
    PrivacyPolicyComponent,
    HomePageBannersComponent,
    PagesComponent,
    AddPageComponent,
    EditPageComponent,
    ContentManagerMenuComponent,
    HomePageBannersEditComponent,
    ManageMenuComponent,
    EmailTemplatesComponent,
    EmailTemplateEditComponent,
    HowItWorkComponent,
    BiggestAdvantageComponent,
    SmsTemplateComponent,
    EditSmsTemplateComponent,
    LocalBanksComponent
  ],
  imports: [
    CommonModule,
    ContentManagerRoutingModule,
    HttpClientModule,
    AdminSharedModule,
    AngularEditorModule,
    NgbModule,
    SharedModule
  ]
})
export class ContentManagerModule { }
