import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManualMergingComponent } from './components/manual-merging/manual-merging.component';

const routes: Routes = [
    { path: '', component:  ManualMergingComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManualMergingManagerRoutingModule { }
