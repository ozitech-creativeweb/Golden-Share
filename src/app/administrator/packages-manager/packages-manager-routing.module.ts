import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPackagesComponent } from './components/admin-packages/admin-packages.component';
import { AddPackageComponent } from './components/add-package/add-package.component';
import { EditPackageComponent } from './components/edit-package/edit-package.component';

const routes: Routes = [
    { path: '', component: AdminPackagesComponent },
    { path: 'add-package', component: AddPackageComponent },
    { path: 'edit-package/:id', component: EditPackageComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PackagesManagerRoutingModule { }
