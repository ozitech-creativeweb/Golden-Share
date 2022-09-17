import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfigService } from '../../../../data/services/config.service';
import { FileUploadService } from '../../../../data/services/file-upload.service';
import { HttpEventType } from '@angular/common/http';
import { HomeSliderService } from '../../../../data/services/guest/home-slider.service';
import { RoutingService } from '../../../../data/helpers/routing.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { SEOService } from '../../../../data/services/seo.service';
import { PagesService } from '../../../../data/services/administrator/pages.service';


@Component({
  selector: 'app-local-banks',
  templateUrl: './local-banks.component.html',
  styleUrls: ['./local-banks.component.scss']
})
export class LocalBanksComponent implements OnInit {
  banks: any;
  isUpdaing = false;

  form = new FormGroup({
    name: new FormControl('', [])
  });


  get adminUrl() {
    return this.configService.adminURL;
  }

  constructor(
    private configService: ConfigService,
    private seoService: SEOService,
    private pagesService: PagesService,
  ) { }

  ngOnInit() {
    this.getData();
    this.seoUpdate();
  }

  private getData() {
    this.pagesService.localBanks().subscribe(res => {
      if (res) {
        this.banks = res;
      }
    });
  }

  submit() {
    this.isUpdaing = true;
    const data = JSON.stringify(this.form.value);
    this.pagesService.addBank(data).subscribe(res => {
      if (res.status === 'success') {
        this.form.reset();
        this.getData();
      } else {
        alert('Oops! Something went wrong.');
      }
      this.isUpdaing = false;
    });
  }

  remove(id) {
    const x = 'Are you sure you want to DELETE this?';
    if (confirm(x)) {
      this.pagesService.deleteBank(id).subscribe(res => {
        if (res.status === 'success') {
          this.getData();
        } else {
          alert('Oops! Something went wrong.');
        }
      });
    }
  }

  private seoUpdate() {
    this.seoService.updateTitle('List of Banks');
    this.seoService.updateDescription('List of Banks');
  }

}
