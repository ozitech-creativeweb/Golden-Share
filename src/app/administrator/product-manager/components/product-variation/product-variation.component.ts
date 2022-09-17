import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfigService } from '../../../../data/services/config.service';
import { CategoryService } from '../../../../data/services/guest/category.service';

@Component({
  selector: 'app-product-variation',
  templateUrl: './product-variation.component.html',
  styleUrls: ['./product-variation.component.scss']
})
export class ProductVariationComponent implements OnInit {
  isAdding = false;
  isLoading = false;
  categories: any;
  variations: any;
  addVariationError: string;

  form = new FormGroup({
    category: new FormControl('', [
      Validators.required
    ]),
    variationName: new FormControl('', [
      Validators.required
    ]),
    variationValues: new FormControl('', [
      Validators.required
    ]),
  });

  get adminUrl() {
    return this.configService.adminURL;
  }

  get category() {
    return this.form.get('category');
  }

  get variationName() {
    return this.form.get('variationName');
  }

  get variationValues() {
    return this.form.get('variationValues');
  }

  constructor(
    private configService: ConfigService,
    private categoryService: CategoryService,
  ) { }

  ngOnInit() {
    this.getCategories();
    this.getVariations();
  }

  private getCategories() {
    this.categoryService.getCategories.subscribe(res => {
      this.categories = res;
    });
  }

  submit() {
    this.addVariationError = null;
    this.isAdding = true;
    const data = JSON.stringify(this.form.value);
    this.categoryService.addVariation(data).subscribe(res => {
      if (res && res.status === 'success') {
        this.getVariations();
        this.form.reset();
      } else {
       this.addVariationError = 'You can not add same Variation name multiple times!';
      }
      this.isAdding = false;
    });
  }

  private getVariations() {
    this.categoryService.getVariations().subscribe(res => {
      this.variations = res;
    });
  }

  deleteVar(category, variationName = '') {
    const confrm = 'Are you sure you want to DELETE this Variations?';
    if (confirm(confrm)) {
      this.categoryService.deleteVaiation(category, variationName)
      .subscribe(res => {
        if (res && res.status === 'success') {
          this.getVariations();
        } else {
          alert('Oops! Something went wrong.');
        }
      });
    }
  }

}
