import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllActivityComponent } from './components/all-activity/all-activity.component';
import { AddActivityComponent } from './components/add-activity/add-activity.component';
import { EditActivityComponent } from './components/edit-activity/edit-activity.component';

const routes: Routes = [
    { path: '', component: AllActivityComponent },
    { path: 'add-activity', component: AddActivityComponent },
    { path: 'edit/:id', component: EditActivityComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityManagerRoutingModule { }
