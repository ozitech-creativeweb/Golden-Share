import { Component, OnInit } from '@angular/core';
import { TestimonialService } from '../../../../data/services/guest/testimonial.service';
import { ActivatedRoute } from '@angular/router';
import { PaginationService } from '../../../../data/services/pagination.service';
import { ConfigService } from '../../../../data/services/config.service';
import { TestimonialManagerService } from '../../../../data/services/administrator/testimonial-manager.service';
import { RoutingService } from '../../../../data/helpers/routing.service';
import { SEOService } from '../../../../data/services/seo.service';

@Component({
  selector: 'app-all-testimonial',
  templateUrl: './all-testimonial.component.html',
  styleUrls: ['./all-testimonial.component.scss']
})
export class AllTestimonialComponent implements OnInit {
  isLoadMore = false;
  pageLimit = 20;
  currentPage = 1;
  testimonies = [];
  isPaginationLoading = false;
  isLoading = true;
  paginationLinks: any;
  TestCounts = 0;

  status: number;

  form: any;

  constructor(
    private route: ActivatedRoute,
    private testimonialService: TestimonialService,
    private paginationService: PaginationService,
    private configService: ConfigService,
    private testimonialManagerService: TestimonialManagerService,
    private routingService: RoutingService,
    private seoService: SEOService
  ) { }

  get adminUrl() {
    return this.configService.adminURL;
  }

  ngOnInit() {
    this.seoUpdate()
    this.getTestimony();
    const currPage = parseInt(
      this.route.snapshot.paramMap.get('page-num')
    );

    if (currPage) { this.setCurrPage(currPage); }
  }

  setCurrPage(currentPage) {
    this.isPaginationLoading = true;
    this.currentPage = currentPage;
    this.getTestimony();
  }

  private getTestimony(isMore = false) {
    this.isLoading = true;
    this.testimonialManagerService.getTestimonials(
      this.pageLimit, this.currentPage
    ).subscribe(res => {
      if (res) {
        if (isMore) {
          for (let i = 0; i < res.data.length; i++) {
            this.testimonies.push(res.data[i]);            
          }
        } else {
          this.testimonies = res.data;
        }  
        this.TestCounts = res.counts;
      }
      this.isLoadMore = false;
      this.isLoading = false;
      
    });
  }

  deleteTestimony(testID: number) {
    if (confirm('Are you sure you want to DELETE this testimony?') ) {
      this.testimonialManagerService.deleteTestimonial(testID).subscribe(res => {
        window.location.href = '/' + this.adminUrl + '/testimonial-manager';
        alert("Deleted successfully");
      });
    }
  }

  private seoUpdate() {
    this.seoService.updateTitle('List of Testimonies');
    this.seoService.updateDescription('List of Testimonies');
  }

  loadMore(){
    this.isLoadMore = true;
    if (this.TestCounts > this.testimonies.length) {
      this.currentPage++;
      this.getTestimony(true);
    }
  }


}
