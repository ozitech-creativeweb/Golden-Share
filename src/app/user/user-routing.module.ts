import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BankInfoComponent } from './components/bank-info/bank-info.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { PostTestimonyComponent } from './components/post-testimony/post-testimony.component';
import { UserTestimonialsComponent } from './components/user-testimonials/user-testimonials.component';
import { UserEditTestimonyComponent } from './components/user-edit-testimony/user-edit-testimony.component';
import { AccountActivationComponent } from './components/account-activation/account-activation.component';
import { ReferralsComponent } from './components/referrals/referrals.component';
import { NewsComponent } from './components/news/news.component';
import { NewsSingleComponent } from './components/news-single/news-single.component';
import { SupportOpenComponent } from './components/support-open/support-open.component';
import { SupportReplyComponent } from './components/support-reply/support-reply.component';
import { VerifySMSComponent } from './components/verify-sms/verify-sms.component';
import { ReservedOrdersComponent } from './components/reserved-orders/reserved-orders.component';
import { IncomingOrdersComponent } from './components/incoming-orders/incoming-orders.component';
import { IncomingSingleComponent } from './components/incoming-single/incoming-single.component';
import { ReservedSingleComponent } from './components/reserved-single/reserved-single.component';
import { AuctionComponent } from './components/auction/auction.component';
import { AuctionSingleComponent } from './components/aution-single/auction-single.component';
// import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  { path: '', redirectTo: '/user/account', pathMatch: 'full' },
  // { path: 'account', component:  UserAccountComponent},
  { path: 'email-verification', component:  VerifyEmailComponent},
  { path: 'sms-verification', component:  VerifySMSComponent},
  { path: 'activation', component:  AccountActivationComponent},
  { path: 'dashboard', component:  DashboardComponent},
  { path: 'referrals', component:  ReferralsComponent},
  { path: 'support', component:  SupportOpenComponent},
  { path: 'support/:id/:subject', component:  SupportReplyComponent},
  { path: 'news', component:  NewsComponent},
  { path: 'news/:newsID', component: NewsSingleComponent},
  { path: 'profile/bank-info', component:  BankInfoComponent},
  { path: 'profile/edit', component:  EditProfileComponent},
  { path: 'profile/change-password', component:  ChangePasswordComponent},
  { path: 'testimonials', component:  UserTestimonialsComponent},
  { path: 'testimonials/edit/:id', component:  UserEditTestimonyComponent},
  { path: 'testimonials/post', component:  PostTestimonyComponent},
  { path: 'reserved-orders', component:  ReservedOrdersComponent },
  { path: 'reserved-orders/:order-id', component:  ReservedSingleComponent},
  { path: 'incoming-orders/:order-id', component:  IncomingSingleComponent},
  { path: 'incoming-orders', component:  IncomingOrdersComponent},

  { path: 'auction', component:  AuctionComponent},
  { path: 'auction/reserve/:auction-id', component:  AuctionSingleComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
