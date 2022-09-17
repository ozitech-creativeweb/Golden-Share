import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DonationComponent } from './components/donation/donation.component';
import { DonationHistoryComponent } from './components/donation-history/donation-history.component';
import { MergedOrdersComponent } from './components/merged-orders/merged-orders.component';
import { MergedOrderComponent } from './components/merged-order/merged-order.component';

const routes: Routes = [
    { path: '', component:  DonationComponent},
    { path: 'history/:id', component:  DonationHistoryComponent},
    { path: 'merged-orders', component:  MergedOrdersComponent},
    { path: 'merged-orders/approved', component:  MergedOrdersComponent},
    { path: 'merged-orders/pending', component:  MergedOrdersComponent},
    { path: 'merged-orders/all', component:  MergedOrdersComponent},
    { path: 'merged-orders/:id', component:  MergedOrderComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DonationManagerRoutingModule { }
