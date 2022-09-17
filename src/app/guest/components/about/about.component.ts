import { Component, OnInit, HostListener } from '@angular/core';
import { HomeSliderService } from '../../../data/services/guest/home-slider.service';
import { RoutingService } from '../../../data/helpers/routing.service';
import { SEOService } from '../../../data/services/seo.service';
import { AuthService } from '../../../data/services/auth.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  public items: Array<string>;
  aboutUs: any;
  auth: any;

  constructor(
    private homeSliderService: HomeSliderService,
    private routingService: RoutingService,
    private seoService: SEOService,
    private authService: AuthService
  ) {
    
  }

  ngOnInit() {
    this.getHomeSliders();
    this.seoUpdate();
    this.getAuth();
  }

  private getAuth() {
    this.authService.user.subscribe(res => {
      this.auth = res;
    });
  }

  private getHomeSliders(){
    this.homeSliderService.sliders().subscribe(res => {
      if(res){
        this.aboutUs = res.banners;
      }
    });
  }

  // Watch for clicks in our component
  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    this.routingService.urlLocator(event);
  }

  private seoUpdate() {
    this.seoService.updateTitle('About Us');
    // this.seoService.updateOgUrl('my title');
    this.seoService.updateDescription('About Us');
  }

}
