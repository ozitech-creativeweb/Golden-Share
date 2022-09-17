import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminManagerRoutingModule } from './admin-manager-routing.module';
import { AddAdminComponent } from './components/add-admin/add-admin.component';
// tslint:disable-next-line: max-line-length
import { AdminChangePasswordComponent } from './components/admin-change-password/admin-change-password.component';
import { AdminListingComponent } from './components/admin-listing/admin-listing.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { EditAdminComponent } from './components/edit-admin/edit-admin.component';
import { AdminManagerMenuComponent } from './components/admin-manager-menu/admin-manager-menu.component';
import { SharedModule } from '../../shared/shared.module';
// tslint:disable-next-line: max-line-length
import { AdminEditFormSharedComponent } from './components/admin-edit-form-shared/admin-edit-form-shared.component';
import { AdminSharedModule } from '../admin-shared/admin-shared.module';



@NgModule({
  declarations: [
    AddAdminComponent,
    AdminChangePasswordComponent,
    AdminListingComponent,
    EditAdminComponent,
    ProfileEditComponent,
    AdminManagerMenuComponent,
    AdminEditFormSharedComponent
  ],
  imports: [
    CommonModule,
    AdminManagerRoutingModule,
    AdminSharedModule,
    SharedModule
  ]
})
export class AdminManagerModule { }
