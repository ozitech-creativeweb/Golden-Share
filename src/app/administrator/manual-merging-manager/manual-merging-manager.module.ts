import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { AdminSharedModule } from '../admin-shared/admin-shared.module';
import { ManualMergingManagerRoutingModule } from './manual-merging-manager-routing.module';
import { ManualMergingComponent } from './components/manual-merging/manual-merging.component';
import { ManualMergingMenuComponent } from './components/manual-merging-menu/manual-merging-menu.component';

@NgModule({
  declarations: [
    ManualMergingComponent,
    ManualMergingMenuComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ManualMergingManagerRoutingModule,
    AdminSharedModule
  ]
})
export class ManualMergingManagerModule { }
