import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../../data/services/config.service';
import { NewsManagerService } from '../../../../data/services/administrator/news-manager.service';
import { ActivatedRoute } from '@angular/router';
import { PaginationService } from '../../../../data/services/pagination.service';
import { SEOService } from '../../../../data/services/seo.service';

@Component({
  selector: 'app-all-news',
  templateUrl: './all-news.component.html',
  styleUrls: ['./all-news.component.scss']
})
export class AllNewsComponent implements OnInit {

  pageLimit = 20;
  currentPage = 1;
  news = [];
  isLoading = true;
  newsCounty = 0;
  isLoadMore = false;

  constructor(
    private configService: ConfigService,
    private newsManagerService: NewsManagerService,
    private seoService: SEOService
  ) { }

  ngOnInit() {
    this.getActivity();
    this.seoUpdate()
  }

  get adminUrl() {
    return this.configService.adminURL;
  }

  setCurrPage(currentPage) {
    this.currentPage = currentPage;
    this.getActivity();
  }


  private getActivity(isMore = false) {
    this.isLoading = true;
    this.newsManagerService.getNews(
      this.pageLimit, this.currentPage
    ).subscribe(res => {
      if (res) {
        if (isMore) {
          for (let i = 0; i < res.data.length; i++) {
            this.news.push(res.data[i]);            
          }
        } else {
          this.news = res.data;
        }  
        this.newsCounty = res.counts;
      }
      this.isLoadMore = false;
      this.isLoading = false;
      
    });
  }

  deleteNews(newsID: number) {
    if (confirm('Are you sure you want to DELETE this news?') ) {
      this.newsManagerService.deleteNews(newsID).subscribe(res => {
        this.getActivity();
      });
    }
  }

  private seoUpdate() {
    this.seoService.updateTitle('All News');
    this.seoService.updateDescription('All News');
  }

  loadMore(){
    this.isLoadMore = true;
    if (this.newsCounty > this.news.length) {
      this.currentPage++;
      this.getActivity(true);
    }
  }

}
