import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminOrderListComponent } from './components/admin-order-list/admin-order-list.component';
import { AdminOrderDetailsComponent } from './components/admin-order-details/admin-order-details.component';

const routes: Routes = [
    { path: '', component: AdminOrderListComponent },
    { path: ':status', component: AdminOrderListComponent },
    { path: 'order/:order-number', component: AdminOrderDetailsComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderManagerRoutingModule { }
