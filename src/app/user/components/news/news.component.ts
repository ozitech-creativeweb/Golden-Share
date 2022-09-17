import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserBankAccountService } from '../../../data/services/user/user-bank-account.service';
import { AuthService } from '../../../data/services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { FileUploadService } from '../../../data/services/file-upload.service';
import { HttpEventType } from '@angular/common/http';
import { UserService } from '../../../data/services/user/user.service';
import { GeneralSettingsService } from '../../../data/services/guest/general-settings.service';
import { RoutingService } from '../../../data/helpers/routing.service';
import { SEOService } from '../../../data/services/seo.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  newsList: any;
  isLoading = true;

  constructor(
    private userBankAccountservice: UserBankAccountService,
    private authService: AuthService,
    private fileUploadService: FileUploadService,
    private userService: UserService,
    private generalSettings: GeneralSettingsService,
    private routingService: RoutingService,
    private seoService: SEOService
  ) { }

  ngOnInit() {
    this.seoUpdate();
    this.getNews();
  }

  getNews() {
    this.userService.news().subscribe(res => {
      if (res) {
        this.newsList = res.data;
      }
      this.isLoading = false;
    });
  }

  private seoUpdate() {
    this.seoService.updateTitle('News');
    this.seoService.updateDescription('News');
  }

}
