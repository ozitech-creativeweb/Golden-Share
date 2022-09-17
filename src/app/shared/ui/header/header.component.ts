import { Component, OnDestroy, OnInit } from '@angular/core';
import { GeneralSettingsService } from '../../../data/services/guest/general-settings.service';
import { AuthService } from '../../../data/services/auth.service';
import { RoutingService } from '../../../data/helpers/routing.service';
import { UserService } from '../../../data/services/user/user.service';
import { SocialSettingsService } from '../../../data/services/guest/social-settings.service';
import { Route, Router } from '@angular/router';
import { StorageService } from '../../../data/helpers/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  title = 'PeertoPeerInvestment';
  secondNavCont;
  scrollUpBtn;
  html;
  toggle = false;
  allSocail: any;

  webSet: any;
  logo: any;
  auth: any;
  activeRoute: any;
  scrollEv;
  scrolltoTop = false;
  dropped = false;

  constructor(
    private generalSettingsService: GeneralSettingsService,
    private authService: AuthService,
    private routingService: RoutingService,
    private userService: UserService,
    private socialService: SocialSettingsService,
    private router: Router,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.getWebSettings();
    this.getAuth();
    this.getSocialLink();
  }

  ngOnDestroy() {
    const me = this;
    window.removeEventListener('scroll', me.scrollEv);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const me = this;
      const html = document.getElementsByTagName('html')['0'];
      const header = document.querySelectorAll('header')['0'];
      this.scrollEv = cusScroll;
      window.addEventListener('scroll', cusScroll);
      function cusScroll() {
        if (html.scrollTop >= 1) {
          header.classList.add('active');
        } else {
          header.classList.remove('active');
        }
        if (html.scrollHeight >= window.innerHeight * 2 && html.scrollTop >= window.innerHeight * 2) {
          me.scrolltoTop = true;
        } else {
          me.scrolltoTop = false;
        }
      }
    });
  }

  scrollUp(): void {
    // console.log(document.querySelectorAll('html'));
    this.html.scrollTop = 0;
  }

  private getWebSettings() {
    this.generalSettingsService.getSettings.subscribe(res => {
      if (res) {
        this.webSet = res.generalSettings;
        if (this.webSet.logo_url) {
          this.logo = this.webSet.logo_url;
        }
      }
    });
  }

  private getSocialLink() {
    this.socialService.settings().subscribe(res => {
      if (res) {
        this.allSocail = res.socialSettings;
      }
    });
  }

  logout() {
    this.storageService.remove('userData');
    // this.authService.storeAuthData(null);
    window.location.reload();
  }

  private getAuth() {
    this.authService.user.subscribe(res => {
      this.auth = res;
    });
  }

  openMobileNav() {
    const getSidebar = document.querySelectorAll('.mobileSidebar');
    for (let i = 0; i < getSidebar.length; i++) {
      getSidebar[i.toString()].style.left = "0px";
    }
  }

  closeMobileNav() {
    const getSidebar = document.querySelectorAll('.mobileSidebar');
    for (let i = 0; i < getSidebar.length; i++) {
      getSidebar[i.toString()].style.left = "-500px";
    }
  }

  viewElement(getDiv: any, getDevice) {
    if (getDevice === 'mobile') {
      this.closeMobileNav()
    }
    if (window.location.href.split('/')[window.location.href.split('/').length - 1] != '') {
      this.router.navigateByUrl('/');
      setTimeout(() => {
        let element = document.getElementById(getDiv);
        element.scrollIntoView();
      });
      return;
    }
    let element = document.getElementById(getDiv);
    element.scrollIntoView();
  }

}
