import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { AdminSharedModule } from '../admin-shared/admin-shared.module';
import { WithdrawalManagerRoutingModule } from './withdrawal-manager-routing.module';
import { WithdrawalComponent } from './components/withdrawal/withdrawal.component';
import { WithdrawalManagerMenuComponent } from './components/withdrawal-manager-menu/withdrawal-manager-menu.component';
import { WithdrawalHistoryComponent } from './components/withdrawal-history/withdrawal-history.component';

@NgModule({
  declarations: [
    WithdrawalComponent,
    WithdrawalManagerMenuComponent,
    WithdrawalHistoryComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    WithdrawalManagerRoutingModule,
    AdminSharedModule
  ]
})
export class WithdrawalManagerModule { }
