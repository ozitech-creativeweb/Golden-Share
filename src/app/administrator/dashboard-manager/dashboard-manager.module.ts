import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { DashboardManagerRoutingModule } from './dashboard-manager-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AdminSharedModule } from '../admin-shared/admin-shared.module';

@NgModule({
  declarations: [AdminDashboardComponent],
  imports: [
    CommonModule,
    SharedModule,
    DashboardManagerRoutingModule,
    AdminSharedModule
  ]
})
export class DashboardManagerModule { }
