import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BankAccountInfoComponent } from './components/bank-account-info/bank-account-info.component';
import { PaymentGatewayComponent } from './components/payment-gateway/payment-gateway.component';
import { PaymentGatewayEditComponent } from './components/payment-gateway-edit/payment-gateway-edit.component';
import { ShippingMethodComponent } from './components/shipping-method/shipping-method.component';
import { ShippingMethodEditComponent } from './components/shipping-method-edit/shipping-method-edit.component';

const routes: Routes = [
    { path: 'bank-account-info', component: BankAccountInfoComponent },
    { path: 'payment-gateway', component: PaymentGatewayComponent },
    { path: 'payment-gateway/edit/:id', component: PaymentGatewayEditComponent },
    { path: 'shipping-method', component: ShippingMethodComponent },
    { path: 'shipping-method/edit/:id', component: ShippingMethodEditComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OtherManagerRoutingModule { }
