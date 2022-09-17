import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// tslint:disable-next-line: max-line-length
// tslint:disable-next-line: max-line-length
import { AngularEditorModule } from '@kolkov/angular-editor';

import { ActivityManagerRoutingModule } from './activity-manager-routing.module';
import { AddActivityComponent } from './components/add-activity/add-activity.component';
import { EditActivityComponent } from './components/edit-activity/edit-activity.component';
import { AllActivityComponent } from './components/all-activity/all-activity.component';
import { ActivityManagerMenuComponent } from './components/activity-manager-menu/activity-manager-menu.component';
import { AdminSharedModule } from '../admin-shared/admin-shared.module';

@NgModule({
  declarations: [
    AddActivityComponent,
    EditActivityComponent,
    AllActivityComponent,
    ActivityManagerMenuComponent
  ],

  imports: [
    CommonModule,
    AdminSharedModule,
    ActivityManagerRoutingModule,
    AngularEditorModule
  ]
})
export class ActivityManagerModule { }
