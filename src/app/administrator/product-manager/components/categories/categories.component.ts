import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfigService } from '../../../../data/services/config.service';
import { CategoryService } from '../../../../data/services/guest/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  isLoading = false;
  isAdding = false;
  categories: any;

  constructor(
    private configService: ConfigService,
    private categoryService: CategoryService,
  ) { }

  form = new FormGroup({
    category: new FormControl('', [
      Validators.required
    ]),
    parentCategory: new FormControl('', [
      Validators.required
    ]),
    mobile_icon: new FormControl('', []),
    web_icon: new FormControl('', []),
  });

  get adminUrl() {
    return this.configService.adminURL;
  }

  get category() {
    return this.form.get('category');
  }

  get parentCategory() {
    return this.form.get('parentCategory');
  }

  ngOnInit() {
    this.getCategories();
  }

  submit() {
    this.isAdding = true;
    const data = JSON.stringify(this.form.value);
    this.categoryService.add(data).subscribe(res => {
      if (res && res.status === 'success') {
        this.categoryService.Categories().subscribe();
        this.form.reset();
      }
      this.isAdding = false;
    });
  }

  private getCategories() {
    this.categoryService.getCategories.subscribe(res => {
      this.categories = res;
    });
  }

  deleteCategory(categoryObj) {
    let catID, category;
    if (categoryObj.level === 1) {
      catID = categoryObj.cat_id;
      category = categoryObj.cat_name;
    } else if (categoryObj.level === 2) {
      catID = categoryObj.subcat_id;
      category = categoryObj.subcat_name;
    } else {
      catID = categoryObj.sub_subcat_id;
      category = categoryObj.sub_subcat_name;
    }
    const confrm = 'Are you sure you want to DELETE: "' + category + '"?';
    if (confirm(confrm)) {
      this.categoryService.delete(catID, categoryObj.level)
      .subscribe(res => {
        if (res && res.status === 'success') {
          this.categoryService.Categories().subscribe();
        }
      });
    }
  }

}
