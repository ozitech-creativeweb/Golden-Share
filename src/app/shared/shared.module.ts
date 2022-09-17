import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './ui/header/header.component';
import { FooterComponent } from './ui/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { SummaryPipe } from './summary.pipe';
import { SafePipe } from './safe.pipe';
// import {TimeAgoPipe} from 'time-ago-pipe';
import { LoadingIndicatorComponent } from './ui/loading-indicator/loading-indicator.component';
import { UserHeaderComponent } from './ui/user-header/user-header.component';
import { TestmonialCarouselComponent } from './ui/testmonial-carousel/testmonial-carousel.component';
import { InnerLoadingComponent } from './ui/inner-loading/inner-loading.component';
import { TopBannerSliderComponent } from './ui/top-banner-slider/top-banner-slider.component';
import { CountDownComponent } from './ui/count-down/count-down.component';
import { DonationPlanComponent } from './ui/donation-plan/donation-plan.component';
import { OrderCountDownTimerComponent } from './ui/order-count-down-timer/order-count-down-timer.component';
import { CountDownStringComponent } from './ui/count-down-string/count-down-string.component';
@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SummaryPipe,
    SafePipe,
    // TimeAgoPipe,
    LoadingIndicatorComponent,
    UserHeaderComponent,
    TestmonialCarouselComponent,
    InnerLoadingComponent,
    TopBannerSliderComponent,
    CountDownComponent,
    DonationPlanComponent,
    OrderCountDownTimerComponent,
    CountDownStringComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    LazyLoadImageModule,
  ],
  exports: [
    HeaderComponent,
    UserHeaderComponent,
    FooterComponent,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    LazyLoadImageModule,
    SummaryPipe,
    SafePipe,
    // TimeAgoPipe,
    LoadingIndicatorComponent,
    TestmonialCarouselComponent,
    InnerLoadingComponent,
    TopBannerSliderComponent,
    CountDownComponent,
    DonationPlanComponent,
    OrderCountDownTimerComponent,
    CountDownStringComponent
  ],
  entryComponents: [
  ]
})
export class SharedModule { }
