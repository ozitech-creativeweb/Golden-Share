import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { DonationManagerRoutingModule } from './donation-manager-routing.module';
import { DonationComponent } from './components/donation/donation.component';
// tslint:disable-next-line: max-line-length
import { DonationManagerMenuComponent } from './components/donation-manager-menu/donation-manager-menu.component';
import { DonationHistoryComponent } from './components/donation-history/donation-history.component';
import { MergedOrdersComponent } from './components/merged-orders/merged-orders.component';
import { AdminSharedModule } from '../admin-shared/admin-shared.module';
import { MergedOrderComponent } from './components/merged-order/merged-order.component';

@NgModule({
  declarations: [
    DonationComponent,
    DonationManagerMenuComponent,
    DonationHistoryComponent,
    MergedOrdersComponent,
    MergedOrderComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    DonationManagerRoutingModule,
    AdminSharedModule
  ]
})
export class DonationManagerModule { }
