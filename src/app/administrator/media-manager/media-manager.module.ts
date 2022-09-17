import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaManagerRoutingModule } from './media-manager-routing.module';
import { LibraryComponent } from './components/library/library.component';
import { AddNewMediaComponent } from './components/add-new-media/add-new-media.component';
import { ViewMediaModalComponent } from './components/view-media-modal/view-media-modal.component';
import { AdminSharedModule } from '../admin-shared/admin-shared.module';
import { EditMediaModalComponent } from './components/edit-media-modal/edit-media-modal.component';



@NgModule({
  declarations: [
  LibraryComponent,
  AddNewMediaComponent,
  ViewMediaModalComponent,
  EditMediaModalComponent
],
  imports: [
    CommonModule,
    MediaManagerRoutingModule,
    AdminSharedModule
  ],
  exports: [
    ViewMediaModalComponent,
    EditMediaModalComponent
  ],
  entryComponents: [
    ViewMediaModalComponent,
    EditMediaModalComponent
  ]
})
export class MediaManagerModule { }
