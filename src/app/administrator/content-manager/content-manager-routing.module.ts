import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { HomeContentComponent } from './components/home-content/home-content.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { TermsAndConditionComponent } from './components/terms-and-condition/terms-and-condition.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { HomePageBannersComponent } from './components/home-page-banners/home-page-banners.component';
import { PagesComponent } from './components/pages/pages.component';
import { AddPageComponent } from './components/add-page/add-page.component';
import { EditPageComponent } from './components/edit-page/edit-page.component';
import { HomePageBannersEditComponent } from './components/home-page-banners-edit/home-page-banners-edit.component';
import { ManageMenuComponent } from './components/manage-menu/manage-menu.component';
import { EmailTemplatesComponent } from './components/email-templates/email-templates.component';
import { EmailTemplateEditComponent } from './components/email-template-edit/email-template-edit.component';
import { HowItWorkComponent } from './components/how-it-work/how-it-work.component';
import { BiggestAdvantageComponent } from './components/biggest-advantage/biggest-advantage.component';
import { SmsTemplateComponent } from './components/sms-template/sms-template.component';
import { EditSmsTemplateComponent } from './components/edit-sms-template/edit-sms-template.component';
import { LocalBanksComponent } from './components/local-banks/local-banks.component';

const routes: Routes = [
    // { path: '', component: HomeContentComponent },
    { path: '', component: HomePageBannersComponent },
    { path: 'home-banners', component: HomePageBannersComponent },
    { path: 'home-banners/:slide-id', component: HomePageBannersEditComponent },
    { path: 'pages', component: PagesComponent },
    { path: 'email-templates', component: EmailTemplatesComponent },
    { path: 'email-templates/:id', component: EmailTemplateEditComponent },
    { path: 'add-page', component: AddPageComponent },
    { path: 'edit/:page-id', component: EditPageComponent },
    { path: 'manage-menu', component: ManageMenuComponent },
    { path: 'how-it-works', component: HowItWorkComponent },
    { path: 'biggest-advantage', component: BiggestAdvantageComponent },
    { path: 'sms-template', component: SmsTemplateComponent },
    { path: 'sms-templates/:id', component: EditSmsTemplateComponent },
    { path: 'banks', component: LocalBanksComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentManagerRoutingModule { }
