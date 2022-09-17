import { ActivatedRoute } from '@angular/router';
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
  selector: 'app-news-single',
  templateUrl: './news-single.component.html',
  styleUrls: ['./news-single.component.scss']
})
export class NewsSingleComponent implements OnInit {

  newsDetails: any;
  isLoading = true;

  constructor(
    private userBankAccountservice: UserBankAccountService,
    private authService: AuthService,
    private fileUploadService: FileUploadService,
    private userService: UserService,
    private generalSettings: GeneralSettingsService,
    private routingService: RoutingService,
    private route: ActivatedRoute,
    private seoService: SEOService
  ) { }

  ngOnInit() {
    const newsID = this.route.snapshot.paramMap.get('newsID');
    this.getNews(newsID);
    this.seoUpdate();
  }

  getNews(newsID) {
    this.userService.singleNews(newsID).subscribe(res => {
      if (res) {
        this.newsDetails = res.data;
      }
      this.isLoading = false;
    });
  }

  private seoUpdate() {
    this.seoService.updateTitle('News');
    this.seoService.updateDescription('News');
  }

}
