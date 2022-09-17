import { Component, OnInit } from '@angular/core';
import { TestimonialService } from '../../../data/services/guest/testimonial.service';
import { ActivatedRoute } from '@angular/router';
import { PaginationService } from '../../../data/services/pagination.service';
import { SEOService } from '../../../data/services/seo.service';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit {

  pageLimit = 2;
  currentPage = 1;
  testimonies = [];
  testimonyCounts = 0;
  isPaginationLoading = false;
  isLoading = true;
  paginationLinks: any;

  isLoadMore = false;


  constructor(
    private route: ActivatedRoute,
    private testimonialService: TestimonialService,
    private paginationService: PaginationService,
    private seoService: SEOService,
  ) { }

  ngOnInit() {
    this.getTestimony();
    this.seoUpdate();
  }

  private getTestimony(isMore = false) {
    this.testimonialService.getTest(
      this.pageLimit, this.currentPage
    ).subscribe(res => {
      console.log(res);
      if (res) {
        if (isMore) {
          for (let i = 0; i < res.length; i++) {
            this.testimonies.push(res[i]);            
          }
        } else {
          this.testimonies = res;
        }        
        this.testimonyCounts = res.length;
      }
      this.isLoadMore = false;
      this.isLoading = false;
    });
  }

  loadMore(){
    this.isLoadMore = true;
    if (this.testimonyCounts > this.pageLimit) {
      this.currentPage++;
      this.getTestimony(true);
    }
  }

  private seoUpdate() {
    this.seoService.updateTitle('Testimonials');
    // this.seoService.updateOgUrl('my title');
    this.seoService.updateDescription('Testimonials');
  }

}