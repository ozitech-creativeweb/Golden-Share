import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { NewsManagerRoutingModule } from './news-manager-routing.module';
import { AllNewsComponent } from './components/all-news/all-news.component';
import { EditNewsComponent } from './components/edit-news/edit-news.component';
import { AddNewsComponent } from './components/add-news/add-news.component';
import { NewsManagerMenuComponent } from './components/news-manager-menu/news-manager-menu.component';
import { AdminSharedModule } from '../admin-shared/admin-shared.module';

@NgModule({
  declarations: [
    AllNewsComponent,
    EditNewsComponent,
    AddNewsComponent,
    NewsManagerMenuComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NewsManagerRoutingModule,
    AdminSharedModule
  ]
})
export class NewsManagerModule { }
