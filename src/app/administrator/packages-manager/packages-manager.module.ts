import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackagesManagerRoutingModule } from './packages-manager-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { AddPackageComponent } from './components/add-package/add-package.component';
import { EditPackageComponent } from './components/edit-package/edit-package.component';
import { AdminPackagesComponent } from './components/admin-packages/admin-packages.component';
import { PackagesManagerMenuComponent } from './components/packages-manager-menu/packages-manager-menu.component';
import { AdminSharedModule } from '../admin-shared/admin-shared.module';

@NgModule({
  declarations: [
    AddPackageComponent,
    EditPackageComponent,
    AdminPackagesComponent,
    PackagesManagerMenuComponent
  ],
  imports: [
    CommonModule,
    PackagesManagerRoutingModule,
    AdminSharedModule,
    SharedModule
  ]
})
export class PackagesManagerModule { }
