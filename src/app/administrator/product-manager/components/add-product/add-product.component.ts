import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ConfigService } from '../../../../data/services/config.service';
import { CategoryService } from '../../../../data/services/guest/category.service';
import { HttpEventType } from '@angular/common/http';
import { FileUploadService } from '../../../../data/services/file-upload.service';
import { StorageService } from '../../../../data/helpers/storage.service';
import { ProductService } from '../../../../data/services/guest/products.service';
import { SEOService } from '../../../../data/services/seo.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  isLoading = false;
  isAdding = false;
  validateError = false;
  adminUrl: string;
  imgupload_required: string;
  form: FormGroup;
  moreDescription: FormArray;
  moreVariation: FormArray;
  categories: any;
  selectedCategory: string;

  selectedFile: File = null;
  selectedFileName: string;
  tempFile: any;
  uploadingProgress = 0;

  addUploadingProgress = 0;

  itemImages: any[] = [];
  fileUploadError: any;

  // WYSIWYG
  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: 'auto',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'},
        {class: 'algerian', name: 'Algerian'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };

  get moreDescriptionFormGroup() {
    return this.form.get('moreDescriptions') as FormArray;
  }

  get moreVariationFormGroup() {
    return this.form.get('moreVariations') as FormArray;
  }

  constructor(
    private configService: ConfigService,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private fileUploadService: FileUploadService,
    private storageService: StorageService,
    private productService: ProductService,
    private seoService: SEOService,
  ) { }

  ngOnInit() {
    this.adminUrl = this.configService.adminURL;
    this.seoUpdate();
    this.formHandler();
    this.getCategories();
    this.getItemImages();
  }

  createMoreDescription(): FormGroup {
    return this.fb.group({
      AddproDescription: [null],
      img: [null],
    });
  }

  createMoreVariation(): FormGroup {
    return this.fb.group({
      variationName: [null],
      variationValues: [null],
    });
  }

  addDescription() {
    this.moreDescription.push(this.createMoreDescription());
  }

  removeDescription(index) {
    this.moreDescription.removeAt(index);
  }

  addVariation() {
    this.moreVariation.push(this.createMoreVariation());
  }

  removeVariation(index) {
    this.moreVariation.removeAt(index);
  }

  submit() {
    this.isAdding = true;
    if (this.validateFileds()) {
      this.isAdding = false;
      return;
    }

    if (this.itemImages.length < 1) {
      this.imgupload_required = 'Please upload at least one item photo!';
      this.isAdding = false;
      return;
    } else {
      this.imgupload_required = null;
      this.form.get('featuredFile').setValue(
        this.itemImages[0].resized_url
      );
    }

    const formData  = JSON.stringify(this.form.value);
    const imgData  = JSON.stringify(this.itemImages);
    this.storageService.storeString('productData', formData);
    this.productService.add(formData, imgData).subscribe(res => {
      if (res.status === 'success') {
        const cfm = confirm(`
          Item added Successfully!

          Do you want this item as copy to another Item?
        `);
        if (!cfm) {
          this.form.reset();
          this.selectedCategory = null;
          this.storageService.remove('itemImages');
        }
        this.itemImages = [];
      }
      this.isAdding = false;
    });
  }

  private validateFileds() {
    this.validateError = false;
    if ( this.form.value.title && this.form.value.title.length < 3 ||
      this.form.value.description && this.form.value.description.length < 50 ||
      this.form.value.sales_price < 1 ||
      this.form.value.overview && this.form.value.overview.length < 5 ||
      this.form.value.category && this.form.value.category.length < 3) {

      this.validateError = true;
      return true;
    }
  }

  private formHandler() {
    this.form = this.fb.group({
      role: [null],
      title:  [null, Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(100),
        Validators.required,
      ])],
      description:  [null, Validators.compose([
        Validators.minLength(50),
        Validators.required,
      ])],
      regular_price: [null],
      sales_price:  [null, Validators.compose([
        Validators.required,
      ])],
      overview:  [null, Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(750),
        Validators.required,
      ])],
      category: [null, Validators.compose([
        Validators.required,
      ])],
      uploadFile: [null],
      featuredFile: [null],
      brand: [null],
      tags: [null],
      est_delivery_date: [null],
      return_policy: [null],
      warranty: [null],
      moreDescriptions: this.fb.array([this.createMoreDescription()]),
      moreVariations: this.fb.array([this.createMoreVariation()])
    });
    this.moreDescription = this.form.get('moreDescriptions') as FormArray;
    this.moreVariation = this.form.get('moreVariations') as FormArray;

  }

  private getCategories() {
    this.categoryService.getCategories.subscribe(res => {
      this.categories = res;
    });
  }

  categoryChange(event: any) {
    const category = event.target.value.split(' and ').join('&').split('-').join(' ');
    this.selectedCategory = category;
  }

  // file upload
  async onSelectedFile(event) {
    this.fileUploadError = null;
    const selectedFile = <File>event.target.files[0];
    const sizeConfig = {
      minWidth: 220, maxWidth: 2500, minHeight: 220, maxHeight: 2500
    };

    if (this.validateFile(selectedFile) === 'upload') {
      this.uploadingProgress = 1;
      this.fileUploadError = null;
      const fd = new FormData;
      fd.append('upload', selectedFile, selectedFile.name);

      this.fileUploadService.upload(
        fd, 'products', this.getFileName(selectedFile), 1, 220, 220, 2500, 2500
      ).subscribe(fielEvent => {
        if (fielEvent.type === HttpEventType.UploadProgress) {
          this.uploadingProgress = Math.round(fielEvent.loaded / fielEvent.total * 100 );
        } else if (fielEvent.type === HttpEventType.Response) {
          if (fielEvent.body.status === 'success') {
            this.itemImages.push(fielEvent.body.data);
            this.storageService.storeString(
              'itemImages', JSON.stringify(this.itemImages)
            );
            this.form.get('uploadFile').setValue('');
          } else if (fielEvent.body.status === 'failed') {
            if (fielEvent.body.data) {
              this.fileUploadError = fielEvent.body.data;
            } else {
              this.fileUploadError = 'Oops! Something went wrong, we could not upload file';
            }
          }
          this.uploadingProgress = 0;
        }
      }, err => { console.log(err); }
      );
    }
  }

  private validateFile(selectedFile) {
    const name = selectedFile.name;
    const size = Number(selectedFile.size);
    const maxSize = 10000000;
    const ext = name.substring(name.lastIndexOf('.') + 1);

    if (ext.toLowerCase() !== 'png' &&
        ext.toLowerCase() !== 'jpeg' &&
        ext.toLowerCase() !== 'jpg' ) {
      this.fileUploadError = 'Selected file format is not supported';
      return this.fileUploadError;
    } else if (size > maxSize) {
      this.fileUploadError = 'Selected file Size exceeded the maximum required size of ' + maxSize;
      return this.fileUploadError;
    } else {
      return 'upload';
    }
  }

  private getFileName(selectedFile) {
    const name = selectedFile.name.split('.')[0];
    return (name.length < 2) ?
      'name-' + this.configService.clearnUrl(name) :
      this.configService.clearnUrl(name);
  }

  private getItemImages() {
    if (this.storageService.hasKey('itemImages')) {
      this.itemImages = JSON.parse(
        this.storageService.getString('itemImages')
      );
    }
  }

  removeImg(index, id) {
    const confrm = confirm('Are you sure you want to DELETE this file?');
    if (confrm) {
      // this.fileUploadService.delete(id).subscribe();
      this.itemImages.splice(index, 1);
      this.storageService.storeString(
        'itemImages', JSON.stringify(this.itemImages)
      );
    }
  }

  private seoUpdate() {
    this.seoService.updateTitle('Add New Item');
    this.seoService.updateDescription('Add New Item');
  }

  // Description image file upload
  async addFileUpload(event, index) {
    const selectedFile = <File>event.target.files[0];

    this.addUploadingProgress = 1;
      const fd = new FormData;
      fd.append('upload', selectedFile, selectedFile.name);

      this.fileUploadService.upload(
        fd, 'product-description-banner', this.getFileName(selectedFile), 0
      ).subscribe(fielEvent => {
        if (fielEvent.type === HttpEventType.UploadProgress) {
          this.addUploadingProgress = Math.round(fielEvent.loaded / fielEvent.total * 100 );
        } else if (fielEvent.type === HttpEventType.Response) {
          if (fielEvent.body.status === 'success') {
            this.form.value.moreDescriptions[index].img = fielEvent.body.data.original_url;
          } else {
            alert('Oops! Something went wrong, we could not process upload.');
          }
          this.addUploadingProgress = 0;
        }
      }, err => { console.log(err); }
      );
  }
}
