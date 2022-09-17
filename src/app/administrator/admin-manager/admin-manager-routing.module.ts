import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminListingComponent } from './components/admin-listing/admin-listing.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { AddAdminComponent } from './components/add-admin/add-admin.component';
import { AdminChangePasswordComponent } from './components/admin-change-password/admin-change-password.component';
import { EditAdminComponent } from './components/edit-admin/edit-admin.component';

const routes: Routes = [
    { path: '', component: AdminListingComponent },
    { path: 'profile', component: ProfileEditComponent },
    { path: 'add-admin', component: AddAdminComponent },
    { path: 'change-password', component: AdminChangePasswordComponent },
    { path: 'edit/:adm-id', component: EditAdminComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminManagerRoutingModule { }
