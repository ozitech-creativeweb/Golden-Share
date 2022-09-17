import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { SupportManagerRoutingModule } from './support-manager-routing.module';
import { OpenSupportComponent } from './components/open-support/open-support.component';
import { ReplySupportComponent } from './components/reply-support/reply-support.component';
import { SupportManagerMenuComponent } from './components/support-manager-menu/support-manager-menu.component';
import { AdminSharedModule } from '../admin-shared/admin-shared.module';
import { SupportSidebarComponent } from './components/support-sidebar/support-sidebar.component';

@NgModule({
  declarations: [
    OpenSupportComponent,
    ReplySupportComponent,
    SupportManagerMenuComponent,
    SupportSidebarComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    SupportManagerRoutingModule,
    AdminSharedModule
  ]
})
export class SupportManagerModule { }
