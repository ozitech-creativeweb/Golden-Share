import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';

import { CategoryService } from '../../../data/services/guest/category.service';
import { ConfigService } from '../../../data/services/config.service';
import { ActivatedRoute } from '@angular/router';

import { HomeSliderService } from '../../../data/services/guest/home-slider.service';
import { GeneralSettingsService } from '../../../data/services/guest/general-settings.service';
import { SocialSettingsService } from '../../../data/services/guest/social-settings.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, AfterViewInit {
  webSet: any;
  currYear: number;

  socialLink: any;

  constructor(
    private generalSettingsService: GeneralSettingsService,
    private socialSettingsService: SocialSettingsService
  ) { }

  ngOnInit() {
    this.updateSettings();
    this.getSocialLink();

    const date = new Date();
    this.currYear = date.getFullYear();
  }

  ngAfterViewInit() {
    const allEl = document.querySelectorAll('*');
    // console.log(allEl);
    for (let i = 0; i < allEl.length; i++) {
      if (allEl[i].getAttribute('data-background')) {
        allEl[i.toString()].style.backgroundImage = `url('${allEl[i].getAttribute('data-background')}')`;
      }
    }
  }

  private updateSettings() {
    this.generalSettingsService.getSettings.subscribe(res => {
      this.webSet = res.generalSettings;
      // console.log(this.webSet);
    });
  }


  private getSocialLink() {
    this.socialSettingsService.settings().subscribe(res => {
      this.socialLink = res.socialSettings;
    });
  }

}
