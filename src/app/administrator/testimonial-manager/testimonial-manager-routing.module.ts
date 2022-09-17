import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllTestimonialComponent } from './components/all-testimonial/all-testimonial.component';
import { AddTestimonialComponent } from './components/add-testimonial/add-testimonial.component';
import { EditTestimonyComponent } from './components/edit-testimony/edit-testimony.component';

const routes: Routes = [
    { path: '', component: AllTestimonialComponent },
    { path: 'add-testimonial', component: AddTestimonialComponent },
    { path: 'edit/:id', component: EditTestimonyComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestimonialManagerRoutingModule { }
