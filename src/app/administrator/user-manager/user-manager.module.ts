import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagerRoutingModule } from './user-manager-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { UserListingComponent } from './components/user-listing/user-listing.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserEditDetailComponent } from './components/user-edit-detail/user-edit-detail.component';
import { UserAddAddressComponent } from './components/user-add-address/user-add-address.component';
import { UserEditAddressComponent } from './components/user-edit-address/user-edit-address.component';
import { UserManagerMenuComponent } from './components/user-manager-menu/user-manager-menu.component';
import { UserInfoShareComponent } from './components/user-info-share/user-info-share.component';
import { ActivationUserComponent } from './components/activation-user/activation-user.component';
import { AdminSharedModule } from '../admin-shared/admin-shared.module';

@NgModule({
  declarations: [
    UserListingComponent,
    UserDetailComponent,
    UserEditDetailComponent,
    UserAddAddressComponent,
    UserEditAddressComponent,
    UserManagerMenuComponent,
    UserInfoShareComponent,
    ActivationUserComponent
  ],
  imports: [
    CommonModule,
    UserManagerRoutingModule,
    SharedModule,
    AdminSharedModule
  ]
})
export class UserManagerModule { }
