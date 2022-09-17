import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestRoutingModule } from './guest-routing.module';
import { SharedModule } from '../shared/shared.module';


import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { GuestTermsAndConditionComponent } from './components/guest-terms-and-condition/guest-terms-and-condition.component';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { InvestmentComponent } from './components/investment/investment.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LogoutComponent } from './components/logout.component';
import { VerificationComponent } from './components/verification/verification.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

@NgModule({
  declarations: [
    AboutComponent,
    ContactComponent,
    HomeComponent,
    TestimonialsComponent,
    GuestTermsAndConditionComponent,
    LoginComponent,
    RegisterComponent,
    InvestmentComponent,
    ForgotPasswordComponent,
    LogoutComponent,
    VerificationComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    GuestRoutingModule,
    SharedModule,
  ],
  exports: [
  ],
  providers: [
  ]

})
export class GuestModule { }
