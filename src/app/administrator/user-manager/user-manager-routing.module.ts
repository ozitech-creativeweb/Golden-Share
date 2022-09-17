import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListingComponent } from './components/user-listing/user-listing.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserEditDetailComponent } from './components/user-edit-detail/user-edit-detail.component';
import { UserAddAddressComponent } from './components/user-add-address/user-add-address.component';
import { UserEditAddressComponent } from './components/user-edit-address/user-edit-address.component';
import { ActivationUserComponent } from './components/activation-user/activation-user.component';

const routes: Routes = [
    { path: '', component: UserListingComponent },
    { path: ':status', component: UserListingComponent },
    { path: 'profile/:login-id', component: UserDetailComponent },
    { path: 'profile/edit/:login-id', component: UserEditDetailComponent },
    { path: 'user-address/add', component: UserAddAddressComponent },
    { path: 'user-address/edit', component: UserEditAddressComponent },
    { path: 'activation/users', component: ActivationUserComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagerRoutingModule { }
