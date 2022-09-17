import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNewsComponent } from './components/add-news/add-news.component';
import { AllNewsComponent } from './components/all-news/all-news.component';
import { EditNewsComponent } from './components/edit-news/edit-news.component';

const routes: Routes = [
    { path: '', component: AllNewsComponent },
    { path: 'add', component: AddNewsComponent },
    { path: 'edit', component: EditNewsComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsManagerRoutingModule { }
