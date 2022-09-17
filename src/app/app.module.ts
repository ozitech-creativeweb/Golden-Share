import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LazyLoadImageModule, scrollPreset } from 'ng-lazyload-image';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AuthGuard } from './data/services/auth.guard';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatSelectModule,
  MatSliderModule,
  MatSlideToggleModule
} from '@angular/material';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { Angular4PaystackModule } from 'angular4-paystack';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    Angular4PaystackModule.forRoot('pk_live_1a7f7d43ac210f5e1af7ce8c7dfd802de853d200'),
    CommonModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    SharedModule,
    NgbModule,
    LazyLoadImageModule.forRoot({
      preset: scrollPreset // <-- tell LazyLoadImage that you want to use scrollPreset
    }),
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    DeviceDetectorModule.forRoot(),
    ReactiveFormsModule
  ],
  exports: [
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
