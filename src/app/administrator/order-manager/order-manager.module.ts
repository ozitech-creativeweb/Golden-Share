import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderManagerRoutingModule } from './order-manager-routing.module';
import { AdminOrderListComponent } from './components/admin-order-list/admin-order-list.component';
import { OrderManagerMenuComponent } from './components/order-manager-menu/order-manager-menu.component';
import { AdminSharedModule } from '../admin-shared/admin-shared.module';
import { SharedModule } from '../../shared/shared.module';
import { AdminOrderDetailsComponent } from './components/admin-order-details/admin-order-details.component';

@NgModule({
  declarations: [
    AdminOrderListComponent,
    OrderManagerMenuComponent,
    AdminOrderDetailsComponent,
  ],
  imports: [
    CommonModule,
    OrderManagerRoutingModule,
    AdminSharedModule,
    SharedModule
  ]
})
export class OrderManagerModule { }
