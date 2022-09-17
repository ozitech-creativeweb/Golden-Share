import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OpenSupportComponent } from './components/open-support/open-support.component';
import { ReplySupportComponent } from './components/reply-support/reply-support.component';

const routes: Routes = [
    { path: '', component: OpenSupportComponent },
    { path: 'reply/:id', component: ReplySupportComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportManagerRoutingModule { }
