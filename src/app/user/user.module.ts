import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BankInfoComponent } from './components/bank-info/bank-info.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { InvestmentHistoryComponent } from './components/investment-history/investment-history.component';
import { PostTestimonyComponent } from './components/post-testimony/post-testimony.component';
import { UserTestimonialsComponent } from './components/user-testimonials/user-testimonials.component';
import { UserEditTestimonyComponent } from './components/user-edit-testimony/user-edit-testimony.component';
import { AccountActivationComponent } from './components/account-activation/account-activation.component';
import { ReferralsComponent } from './components/referrals/referrals.component';
import { NewsSingleComponent } from './components/news-single/news-single.component';
import { NewsComponent } from './components/news/news.component';
import { SupportSidebarComponent } from './components/support-sidebar/support-sidebar.component';
import { SupportReplyComponent } from './components/support-reply/support-reply.component';
import { SupportOpenComponent } from './components/support-open/support-open.component';
import { VerifySMSComponent } from './components/verify-sms/verify-sms.component';
import { ReservedOrdersComponent } from './components/reserved-orders/reserved-orders.component';
import { IncomingOrdersComponent } from './components/incoming-orders/incoming-orders.component';
import { ReservedSingleComponent } from './components/reserved-single/reserved-single.component';
import { IncomingSingleComponent } from './components/incoming-single/incoming-single.component';
import { AuctionComponent } from './components/auction/auction.component';
import { AuctionSingleComponent } from './components/aution-single/auction-single.component';

// import { LogoutComponent } from './logout/logout.component';
// import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    // LogoutComponent
    DashboardComponent,
    BankInfoComponent,
    EditProfileComponent,
    ChangePasswordComponent,
    VerifyEmailComponent,
    InvestmentHistoryComponent,
    PostTestimonyComponent,
    UserTestimonialsComponent,
    UserEditTestimonyComponent,
    AccountActivationComponent,
    ReferralsComponent,
    NewsComponent,
    NewsSingleComponent,
    SupportSidebarComponent,
    SupportReplyComponent,
    SupportOpenComponent,
    VerifySMSComponent,
    ReservedOrdersComponent,
    IncomingOrdersComponent,
    ReservedSingleComponent,
    IncomingSingleComponent,
    AuctionComponent,
    AuctionSingleComponent,
  ],
  imports: [
    // BrowserModule,
    NgbModule,
    CommonModule,
    UserRoutingModule,
    SharedModule,
    AngularEditorModule,
  ],
  exports: [
  ],
  providers: [
  ]
})
export class UserModule { }
