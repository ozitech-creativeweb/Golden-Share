import { StorageService } from '../../../data/helpers/storage.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../../../data/services/auth.service';
import { HomeSliderService } from '../../../data/services/guest/home-slider.service';
import { TestimonialService } from '../../../data/services/guest/testimonial.service';
import { HowItWorksService } from '../../../data/services/guest/how-it-works.service';
import { BiggestAdvantageService } from '../../../data/services/guest/biggest-advantage-service';
import { SEOService } from '../../../data/services/seo.service';
import { GeneralSettingsService } from '../../../data/services/guest/general-settings.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactUsService } from '../../../data/services/guest/contact-us.service';
import { StaticContentService } from 'src/app/data/services/guest/static-content.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  testimonies: any;
  howWorks: any;
  noTestimony: any;
  aboutUs: any;
  advantage: any;
  auth: any;
  homeSlides: any;
  webSet: any;
  firstBanner: any;
  secondBanner: any;
  isSubmitting = false;
  newBanner: any;

  allUser: any;
  orderNum: any;
  withNum: any;
  


	constructor(
    private authService: AuthService,
    private homeSliderService: HomeSliderService,
    private testimonialService: TestimonialService,
    private route: ActivatedRoute,
    private storageservice: StorageService,
    private howItWorkService: HowItWorksService,
    private biggestAdvantageservice: BiggestAdvantageService,
    private seoService: SEOService,
    private generalSettingsService: GeneralSettingsService,
    private contactService: ContactUsService,
    private staticContentService: StaticContentService
  ) { }

	ngOnInit(): void {
    const refID = this.route.snapshot.paramMap.get('referralID');
    if(refID){
      this.storageservice.storeString('refID', refID);
    }
    this.seoUpdate();
    this.getWebSettings();
    this.getAuth();
    this.getHomeSliders();
    this.getAllTest();
    this.getHowItWork();
    this.getAdvantage();
    this.getInfo();
  }

  private getAuth() {
    this.authService.user.subscribe(res => {
      this.auth = res;
    });
  }
  
  private getHomeSliders() {
    this.homeSliderService.sliders().subscribe(res => {
      if (res) {
        this.homeSlides = res.slides;
        this.aboutUs = res.banners;

        this.firstBanner = this.homeSlides.filter(cont => cont.id === parseInt('1'))[0]; 
        this.secondBanner = this.homeSlides.filter(cont => cont.id === parseInt('2'))[0];
        this.newBanner = this.secondBanner.banner; 
      } else {
        this.homeSlides = 'not available';
      }
    });
  }

  getUrl(){
    return "url(" + this.newBanner + ")";
  }

  private getAllTest() {
    this.testimonialService.allTestimony().subscribe(res => {
      if (res) {
        this.testimonies = res;
      } else {
        this.noTestimony = 'No Testimony Available';
      }
    });
  }
  
  private getInfo() {
    this.staticContentService.indexInfo().subscribe(res => {
      if (res) {
        this.allUser = res.allUser;
        this.orderNum = res.numOrder;
        this.withNum = res.numWith;
      } else {
        this.noTestimony = 'No Testimony Available';
      }
    });
  }

  private getWebSettings() {
    this.generalSettingsService.getSettings.subscribe(res => {
      if (res) {
        this.webSet = res.generalSettings;
        if (this.webSet.logo_url) {
        }
      }
    });
  }

  private getHowItWork() {
    this.howItWorkService.howItWorks().subscribe(res => {
      if (res) {
        this.howWorks = JSON.parse(res.howWork.main_title);
      }
    });
  }

  private getAdvantage() {
    this.biggestAdvantageservice.biggestAdvantage().subscribe(res => {
      if (res) {
        this.advantage = res.bigAdvantage;
      }
    });
  }

  private seoUpdate() {
    this.seoService.updateTitle('Welcome');
    this.seoService.updateDescription('Welcome');
  }


  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
    ]),
    full_name: new FormControl('', [
      Validators.required,
    ]),
    message: new FormControl('', [
      Validators.required,
    ]),
  });

  get email() {
    return this.form.get('email');
  }
  get full_name() {
    return this.form.get('full_name');
  }
  get message() {
    return this.form.get('message');
  }
  
  

  onSubmit() {
    this.isSubmitting = true;
    const data = JSON.stringify(this.form.value);
    this.contactService.sendContactMssg(data).subscribe(res => {
      if (res && res.status === 'success') {
        this.form.reset();
        alert('Message send successfully!');
      } else {
        alert('Oops, Error in sending message!');
      }

      this.isSubmitting = false;
    });
  }


}

