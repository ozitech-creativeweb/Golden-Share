import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './data/services/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import(
      './guest/guest.module'
    ).then(mod => mod.GuestModule)
  },

  {
    path: 'user',
    loadChildren: () => import(
      './user/user.module'
    ).then(mod => mod.UserModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'administrator',
    loadChildren: () => import(
      './administrator/administrator.module'
    ).then(mod => mod.AdministratorModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
