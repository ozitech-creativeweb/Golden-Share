import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfigService } from '../../../../data/services/config.service';
import { CategoryService } from '../../../../data/services/guest/category.service';
import { PagesService } from '../../../../data/services/administrator/pages.service';
import { AdminAuthService } from '../../../../data/services/admin-auth.service';
import { SEOService } from '../../../../data/services/seo.service';

@Component({
  selector: 'app-manage-menu',
  templateUrl: './manage-menu.component.html',
  styleUrls: ['./manage-menu.component.scss']
})
export class ManageMenuComponent implements OnInit {
  admin: any;
  isLoading = false;
  isAdding = false;
  isPage = false;
  categories: any;
  pages: any;
  menus: any;

  categoryForm = new FormGroup({
    id: new FormControl('', [
      Validators.required
    ]),
    role: new FormControl('', []),
  });

  pageForm = new FormGroup({
    id: new FormControl('', [
      Validators.required
    ]),
    role: new FormControl('', []),
  });

  constructor(
    private configService: ConfigService,
    private categoryService: CategoryService,
    private pagesService: PagesService,
    private adminAuthService: AdminAuthService,
    private seoService: SEOService
  ) { }

  get adminUrl() {
    return this.configService.adminURL;
  }

  get category() {
    return this.categoryForm.get('id');
  }

  get page() {
    return this.pageForm.get('id');
  }

  ngOnInit() {
    this.admAuth();
    this.getCategories();
    this.getPages();
    this.getMenus();
    this.seoUpdate()
  }

  private getPages() {
    this.pagesService.getPages().subscribe(res => {
      if (res) {
        this.pages = res.data;
      }
    });
  }

  private getMenus() {
    this.pagesService.getMenus().subscribe(res => {
      if (res) {
        this.menus = res.data;
      }
    });
  }

  submit() {
    this.categoryForm.get('role').setValue('category');
    this.isAdding = true;
    const data = JSON.stringify(this.categoryForm.value);
    this.pagesService.addMenu(data).subscribe(res => {
      if (res.status === 'success') {
        this.categoryForm.reset();
        this.getMenus();
      } else {
        alert('Oops! Something went wrong, please avoid duplicate entery');
      }
      this.isAdding = false;
    });
  }

  submitPage() {
    this.pageForm.get('role').setValue('page');
    this.isPage = true;
    const data = JSON.stringify(this.pageForm.value);
    this.pagesService.addMenu(data).subscribe(res => {
      if (res.status === 'success') {
        this.pageForm.reset();
        this.getMenus();
      } else {
        alert('Oops! Something went wrong, please avoid duplicate entery');
      }
      this.isPage = false;
    });
  }

  private getCategories() {
    this.categoryService.getCategories.subscribe(res => {
      this.categories = res;
    });
  }

  delete(menuID, name) {
    const confrm = 'Are you sure you want to DELETE: "' + name + '"?';
    if (confirm(confrm)) {
      this.pagesService.deleteMenu(menuID).subscribe(res => {
        if (res.status === 'success') {
          this.getMenus();
        } else {
          alert('Oops! Something went wrong, we could not process your request.');
        }
      });
    }
  }

  private admAuth() {
    this.adminAuthService.admin.subscribe(res => {
      this.admin = res;
    });
  }

  private seoUpdate() {
    this.seoService.updateTitle('Manage Mega Menu');
    this.seoService.updateDescription('Manage Mega Menu');
  }

}
