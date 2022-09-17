import { Component, OnInit } from '@angular/core';
import { StaticContentService } from '../../../data/services/guest/static-content.service';
import { SEOService } from '../../../data/services/seo.service';
import { PagesService } from '../../../data/services/administrator/pages.service';
import { ConfigService } from '../../../data/services/config.service';
import { RoutingService } from '../../../data/helpers/routing.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../data/services/auth.service';

@Component({
  selector: 'app-guest-terms-and-condition',
  templateUrl: './guest-terms-and-condition.component.html',
  styleUrls: ['./guest-terms-and-condition.component.scss']
})
export class GuestTermsAndConditionComponent implements OnInit {

  page: any;
  auth: any;

  constructor(
    private pagesService: PagesService,
    private configService: ConfigService,
    private routingService: RoutingService,
    private authService: AuthService,
    private seoService: SEOService
  ) { }

  ngOnInit() {
    this.getPage();
    this.getAuth();
    this.seoUpdate();
  }

  private getAuth() {
    this.authService.user.subscribe(res => {
      this.auth = res;
    });
  }

  private getPage() {
    this.pagesService.single(this.routingService.activeRoute).subscribe(res => {
      if (res.status === 'success') {
        this.page = res.data;
      } /* else {
        this.routingService.replace(['/']);
      } */
    });
  }

  private seoUpdate() {
    this.seoService.updateTitle('Terms and Conditions');
    // this.seoService.updateOgUrl('my title');
    this.seoService.updateDescription('Terms and Conditions');
  }
}
