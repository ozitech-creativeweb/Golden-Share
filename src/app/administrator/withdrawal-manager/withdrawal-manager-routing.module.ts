import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WithdrawalComponent } from './components/withdrawal/withdrawal.component';
import { WithdrawalHistoryComponent } from './components/withdrawal-history/withdrawal-history.component';

const routes: Routes = [
    { path: '', component:  WithdrawalComponent},
    { path: ':status', component:  WithdrawalComponent},
    { path: 'history/:id', component:  WithdrawalHistoryComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WithdrawalManagerRoutingModule { }
