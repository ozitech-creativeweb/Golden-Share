import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// tslint:disable-next-line: max-line-length
// tslint:disable-next-line: max-line-length
import { AllTestimonialComponent } from './components/all-testimonial/all-testimonial.component';
import { AddTestimonialComponent } from './components/add-testimonial/add-testimonial.component';
import { TestimonialManagerRoutingModule } from './testimonial-manager-routing.module';
import { TestimonialManagerMenuComponent } from './components/testimonial-manager-menu/testimonial-manager-menu.component';
import { EditTestimonyComponent } from './components/edit-testimony/edit-testimony.component';
import { AdminSharedModule } from '../admin-shared/admin-shared.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    AllTestimonialComponent,
    AddTestimonialComponent,
    TestimonialManagerMenuComponent,
    EditTestimonyComponent
  ],

  imports: [
    CommonModule,
    AdminSharedModule,
    TestimonialManagerRoutingModule,
    SharedModule
  ]
})
export class TestimonialManagerModule { }
