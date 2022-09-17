import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductManagerRoutingModule } from './product-manager-routing.module';

import { AllProductsComponent } from './components/all-products/all-products.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
// tslint:disable-next-line: max-line-length
import { FeatureCategoriesComponent } from './components/feature-categories/feature-categories.component';
import { ProductVariationComponent } from './components/product-variation/product-variation.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// tslint:disable-next-line: max-line-length
import { ProductManagerMenuComponent } from './components/product-manager-menu/product-manager-menu.component';
import { AdminSharedModule } from '../admin-shared/admin-shared.module';
import { SharedModule } from '../../shared/shared.module';
import { InactiveProductsComponent } from './components/inactive-products/inactive-products.component';
import { FeatureCategoryEditComponent } from './components/feature-category-edit/feature-category-edit.component';

@NgModule({
  declarations: [
    AllProductsComponent,
    AddProductComponent,
    CategoriesComponent,
    CategoriesBannerComponent,
    EditProductComponent,
    FeatureCategoriesComponent,
    ProductVariationComponent,
    ProductManagerMenuComponent,
    InactiveProductsComponent,
    FeatureCategoryEditComponent
  ],
  imports: [
    CommonModule,
    ProductManagerRoutingModule,
    AdminSharedModule,
    HttpClientModule,
    AngularEditorModule,
    NgbModule,
    SharedModule
  ]
})
export class ProductManagerModule { }
