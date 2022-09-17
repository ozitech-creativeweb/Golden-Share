import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { FeatureCategoriesComponent } from './components/feature-categories/feature-categories.component';
import { ProductVariationComponent } from './components/product-variation/product-variation.component';
import { InactiveProductsComponent } from './components/inactive-products/inactive-products.component';
import { FeatureCategoryEditComponent } from './components/feature-category-edit/feature-category-edit.component';

const routes: Routes = [
    { path: '', component: AllProductsComponent },
    { path: 'products', component: AllProductsComponent },
    { path: '/:category', component: AllProductsComponent },
    { path: 'add', component: AddProductComponent },
    { path: 'edit/:item-pid', component: EditProductComponent },
    { path: 'featured/:id', component: FeatureCategoryEditComponent },
    { path: 'manage-category', component: CategoriesComponent },
    { path: 'category-banner', component: CategoriesBannerComponent },
    { path: 'feature-categories', component: FeatureCategoriesComponent },
    { path: 'variation', component: ProductVariationComponent },
    { path: 'inactive-products', component: InactiveProductsComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductManagerRoutingModule { }
