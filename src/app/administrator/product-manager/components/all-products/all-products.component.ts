import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../../data/services/config.service';
import { CategoryService } from '../../../../data/services/guest/category.service';
import { ProductService } from '../../../../data/services/guest/products.service';
import { CurrencyService } from '../../../../data/services/currency.service';
import { SEOService } from '../../../../data/services/seo.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {
  isLoading = false;
  currencyObj: any;
  products = [];
  productCounts = 0;
  sidebarCategory: any;
  categoryTitle: string;
  sidebarCategories: any;

  category = 'all';
  currentPage = 1;
  pageLimit = 12;

  constructor(
    private configService: ConfigService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private currencyService: CurrencyService,
    private seoService: SEOService,
  ) { }

  get adminUrl() {
    return this.configService.adminURL;
  }

  ngOnInit() {
    this.seoUpdate();
    this.getCurrency();
    this.getProducts();
  }

  private getProducts() {
    this.productService.getProductsAdmin(
      this.category, this.pageLimit, this.currentPage
    ).subscribe(res => {
      this.products = res.data;
      this.productCounts = res.count;
      this.categoryTitle = res.categoryTitle;
      this.sidebarCategories = res.sidebarCategories;
    });
  }

  private getCurrency() {
    this.currencyService.getCurrency.subscribe(res => {
      if (res) { this.currencyObj = res; }
    });
  }

  loadMore() {
    if (this.productCounts > this.products.length) {
      this.pageLimit = this.pageLimit * 2;
      this.getProducts();
    }
  }

  private seoUpdate() {
    this.seoService.updateTitle(this.categoryTitle || 'Products');
    this.seoService.updateDescription(this.categoryTitle || 'Products');
  }

  deleteItem(pid) {
    const confrm = 'Are you sure you want to DELETE this item?';
    if (confirm(confrm)) {
      this.productService.deleteItem(pid).subscribe(res => {
        if (res.status === 'success') {
          this.getProducts();
        } else {
          alert('Oops! Something went wrong, we coul not process your request.');
        }
      });
    }
  }

  cleanUrl(name) {
    return this.configService.clearnUrl(name);
  }

}
