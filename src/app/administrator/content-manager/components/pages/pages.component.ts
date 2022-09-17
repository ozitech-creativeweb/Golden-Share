import { Component, OnInit } from '@angular/core';
import { PagesService } from '../../../../data/services/administrator/pages.service';
import { ConfigService } from '../../../../data/services/config.service';
import { RoutingService } from '../../../../data/helpers/routing.service';
import { SEOService } from '../../../../data/services/seo.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  pages: any;
  pageCounts = 0;

  constructor(
    private pagesService: PagesService,
    private configService: ConfigService,
    private routingService: RoutingService,
    private seoService: SEOService
  ) { }

  get adminUrl() {
    return this.configService.adminURL;
  }

  ngOnInit() {
    this.getPages();
    this.seoUpdate()
  }

  private getPages() {
    this.pagesService.getPages().subscribe(res => {
      if (res) {
        this.pages = res.data;
        this.pageCounts = res.count;
      }
    });
  }

  delete(page) {
    const x = 'Are you sure you want to delete "' + page.title + '"? ';
    if (confirm(x)) {
      this.pagesService.delete(page.id).subscribe(res => {
        if (res.status === 'success') {
          this.getPages();
        } else {
          alert('Oops! Something web wrong, we could not process your request');
        }
      });
    }
  }

  private seoUpdate() {
    this.seoService.updateTitle('List of Pages');
    this.seoService.updateDescription('List of Pages');
  }

}
