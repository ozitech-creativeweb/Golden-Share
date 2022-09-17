import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { GuestTermsAndConditionComponent } from './components/guest-terms-and-condition/guest-terms-and-condition.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { InvestmentComponent } from './components/investment/investment.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LogoutComponent } from './components/logout.component';
import { VerificationComponent } from './components/verification/verification.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

const routes: Routes = [
    { path: '', component: HomeComponent, },
    { path: 'ref/:referralID', component: RegisterComponent, },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'testimonial', component: TestimonialsComponent },
    { path: ':testimonial/page/:page-num', component: TestimonialsComponent },
    { path: 'page/terms-and-conditions', component: GuestTermsAndConditionComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'investment', component: InvestmentComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'verification', component: VerificationComponent },
    { path: 'verification/:verify-code', component: VerificationComponent },
    { path: 'verification/:verify-code/:password-reset', component: VerificationComponent },
    { path: 'reset-password/:verify-code', component: ResetPasswordComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuestRoutingModule { }
