import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { BankAccountInfoComponent } from './components/bank-account-info/bank-account-info.component';
import { PaymentGatewayComponent } from './components/payment-gateway/payment-gateway.component';
import { PaymentGatewayEditComponent } from './components/payment-gateway-edit/payment-gateway-edit.component';
import { ShippingMethodComponent } from './components/shipping-method/shipping-method.component';
import { ShippingMethodEditComponent } from './components/shipping-method-edit/shipping-method-edit.component';
import { AdminSharedModule } from '../admin-shared/admin-shared.module';
import { OtherManagerRoutingModule } from './other-manager-routing.module';
import { OtherManagerMenuComponent } from './components/other-manager-menu/other-manager-menu.component';


@NgModule({
  declarations: [
    BankAccountInfoComponent,
    PaymentGatewayComponent,
    PaymentGatewayEditComponent,
    ShippingMethodComponent,
    ShippingMethodEditComponent,
    OtherManagerMenuComponent
  ],
  imports: [
    CommonModule,
    OtherManagerRoutingModule,
    SharedModule,
    AdminSharedModule
  ]
})
export class OtherManagerModule { }
