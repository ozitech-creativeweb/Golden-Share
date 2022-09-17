import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpEventType } from '@angular/common/http';
import { GeneralSettingsService } from '../../../../data/services/guest/general-settings.service';
import { SEOService } from '../../../../data/services/seo.service';
import { FileUploadService } from '../../../../data/services/file-upload.service';
import { ConfigService } from '../../../../data/services/config.service';
import { AdminAuthService } from '../../../../data/services/admin-auth.service';
import { RoutingService } from '../../../../data/helpers/routing.service';

@Component({
  selector: 'app-website-settings',
  templateUrl: './website-settings.component.html',
  styleUrls: ['./website-settings.component.scss']
})
export class WebsiteSettingsComponent implements OnInit {
  generalSetting: any;
  isLoading = false;

  selectedFile: File = null;
  selectedFileName: string;
  uploadedFile: string;
  uploadingProgress = 0;
  logoUploadingProgress = 0;

  faviUploadError: string;
  logoUploadError: string;

  form = new FormGroup({
    id: new FormControl('', []),
    biz_name: new FormControl('', []),
    name: new FormControl('', []),
    title: new FormControl('', []),
    email: new FormControl('', []),
    description: new FormControl('', []),
    keywords: new FormControl('', []),
    url: new FormControl('', []),
    favicon_url: new FormControl('', []),
    logo_url: new FormControl('', []),
    address: new FormControl('', []),
    city: new FormControl('', []),
    state: new FormControl('', []),
    country: new FormControl('', []),
    phone: new FormControl('', []),
    chat_code: new FormControl('', []),
    copyright: new FormControl('', []),
    designed_by: new FormControl('', []),
  });

  constructor(
    private generalSettingsService: GeneralSettingsService,
    private seoService: SEOService,
    private fileUploadService: FileUploadService,
    private configService: ConfigService,
    private routingService: RoutingService,
    private adminAuthService: AdminAuthService,
  ) { }

  ngOnInit() {
    this.updateAuth();
    this.seoUpdate();
    this.getData();
  }

  get adminUrl() {
    return this.configService.adminURL;
  }
  
  private updateAuth() {
    this.adminAuthService.admin.subscribe(res => {
      if (res) {
        const data = this.configService.isRootAdmin(res);
        if (!data) {
          this.routingService.replace(['/' + this.adminUrl + '/dashboard']);
        }
      }
    });
  }


  submit() {
    this.isLoading = true;
    const data = JSON.stringify(this.form.value);
    this.generalSettingsService.updateSettings(data).subscribe(res => {
      if (res && res.status === 'success') {
        this.generalSettingsService.settings();
        alert('Updated successfully!');
      } else {
        alert('Oops! We could not update your request.');
      }
      this.isLoading = false;
    });
  }

  private getData() {
    this.generalSettingsService.getSettings.subscribe(res => {
      this.generalSetting = res.generalSettings;
      this.retrieveData(res.generalSettings);
    });
  }

  private retrieveData(res) {
    this.form.get('id').setValue(res.id);
    this.form.get('biz_name').setValue(res.biz_name);
    this.form.get('name').setValue(res.name);
    this.form.get('title').setValue(res.title);
    this.form.get('email').setValue(res.email);
    this.form.get('description').setValue(res.description);
    this.form.get('keywords').setValue(res.keywords);
    this.form.get('url').setValue(res.url);
    this.form.get('favicon_url').setValue(res.favicon_url);
    this.form.get('logo_url').setValue(res.logo_url);
    this.form.get('address').setValue(res.address);
    this.form.get('city').setValue(res.city);
    this.form.get('state').setValue(res.state);
    this.form.get('country').setValue(res.country);
    this.form.get('phone').setValue(res.phone);
    this.form.get('chat_code').setValue(res.chat_code);
    this.form.get('copyright').setValue(res.copyright);
    this.form.get('designed_by').setValue(res.designed_by);
  }

  private seoUpdate() {
    this.seoService.updateTitle('General Settings');
    this.seoService.updateDescription('General Settings');
  }

  faviconUpload(eventAlt) {
    this.uploadingProgress = 1;
    this.logoUploadingProgress = 0;
    const selectedFile = <File>eventAlt.target.files[0];
    //
    const reader = new FileReader();
    const img = new Image();
    img.src = window.URL.createObjectURL( selectedFile );
    reader.readAsDataURL(selectedFile);
    reader.onload = () => {
      const width = img.naturalWidth;
      const height = img.naturalHeight;
      this.uploadFile(selectedFile, 'favicon', 1, 1, 200, 200);
    };
  }

  logoUpload(eventAlt) {
    this.logoUploadingProgress = 1;
    this.uploadingProgress = 0;
    const selectedFile = <File>eventAlt.target.files[0];
    //
    const reader = new FileReader();
    const img = new Image();
    img.src = window.URL.createObjectURL( selectedFile );
    reader.readAsDataURL(selectedFile);
    reader.onload = () => {
      const width = img.naturalWidth;
      const height = img.naturalHeight;
      this.uploadFile(selectedFile, 'logo', 1, 1, 1000, 1000);
    };
  }

  private uploadFile(selectedFile, name, width, height, mxWidth, mxHeight) {
    const fd = new FormData;
    fd.append('upload', selectedFile, selectedFile.name);
    this.fileUploadService.upload(
      fd, 'assets', name, 0, width, height, mxWidth, mxHeight
    )
    .subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.uploadingProgress = Math.round(event.loaded / event.total * 100 );
        } else if (event.type === HttpEventType.Response) {
          if (event.body.status === 'success') {
            if (name === 'favicon') {
              this.form.get('favicon_url').setValue(event.body.data.original_url);
              this.generalSetting.favicon_url = event.body.data.original_url;
            } else {
              this.form.get('logo_url').setValue(event.body.data.original_url);
              this.generalSetting.logo_url = event.body.data.original_url;
            }
          }
          this.uploadingProgress = 0;
          this.logoUploadingProgress = 0;
        }
      },
      err => {
        console.log(err);
      }
    );
  }

}
