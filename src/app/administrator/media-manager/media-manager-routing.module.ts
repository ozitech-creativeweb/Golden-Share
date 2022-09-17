import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LibraryComponent } from './components/library/library.component';
import { AddNewMediaComponent } from './components/add-new-media/add-new-media.component';

const routes: Routes = [
    { path: '', component: LibraryComponent },
    { path: 'library', component: LibraryComponent },
    { path: 'add-new', component: AddNewMediaComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MediaManagerRoutingModule { }
