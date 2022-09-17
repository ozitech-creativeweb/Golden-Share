import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthService } from './data/services/auth.service';
import { AdminAuthService } from './data/services/admin-auth.service';
import { SEOService } from './data/services/seo.service';
import { GeneralSettingsService } from './data/services/guest/general-settings.service';
import { HomeSliderService } from './data/services/guest/home-slider.service';
import { CurrencyService } from './data/services/currency.service';
import { StaticContentService } from './data/services/guest/static-content.service';
import { SocialSettingsService } from './data/services/guest/social-settings.service';
import { UserBankAccountService } from './data/services/user/user-bank-account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  generalSettings: any;

  constructor(
    @Inject(DOCUMENT) private _document: HTMLDocument,
    private authService: AuthService,
    private adminAuthService: AdminAuthService,
    private seoService: SEOService,
    private generalSettingsService: GeneralSettingsService,
    private homeSliderService: HomeSliderService,
    private currencyService: CurrencyService,
    private staticContentService: StaticContentService,
    private socialService: SocialSettingsService,
    private userBankAccountService: UserBankAccountService,
  ) {}

  ngOnInit() {
    this.checkAuth();
    this.getCurrency();
    this.loadSettings();
    this.seoUpdate();
    this.homeItems();
    this.getPageContents();
  }

  private checkAuth() {
    this.authService.autoLogin().subscribe();
  }

  private loadSettings() {
    // this.generalSettingsService.settings().subscribe();
    this.generalSettingsService.settings().subscribe(res => {
      if (res) {
        this.generalSettings = res.generalSettings;
        // Set favicon
        this._document.getElementById('appFavicon').setAttribute('href', res.generalSettings.favicon_url);
      }
      this.generalSettingsService.configuration().subscribe();
      this.socialService.settings().subscribe();
      this.seoUpdate();
    });
  }

  private seoUpdate() {
    const title = this.generalSettings ?
      this.generalSettings.title : 'Welcome';

    const description = this.generalSettings ?
      this.generalSettings.description : 'Welcome';

    const keywords = this.generalSettings ?
      this.generalSettings.keywords : 'Welcome';

    this.seoService.updateTitle('Welcome');
    // this.seoService.updateOgUrl('my title');
    this.seoService.updateDescription('Welcome');
    this.seoService.updateKeyword(keywords);
  }

  private homeItems() {
    this.homeSliderService.sliders().subscribe();
    this.userBankAccountService.bankAccounts().subscribe();
  }

  private getCurrency() {
    this.currencyService.currencyDefault().subscribe();
  }

  private getPageContents() {
    this.staticContentService.contents().subscribe();
  }

}
