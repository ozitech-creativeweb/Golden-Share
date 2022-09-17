import { Component, OnInit, HostListener, AfterViewInit } from '@angular/core';
import { AuthService } from '../../../data/services/auth.service';
import { RoutingService } from '../../../data/helpers/routing.service';
import { GeneralSettingsService } from '../../../data/services/guest/general-settings.service';
import { SocialSettingsService } from '../../../data/services/guest/social-settings.service';
import { User } from '../../../data/model/user';
import { UserBankAccountService } from '../../../data/services/user/user-bank-account.service';
import { StorageService } from '../../../data/helpers/storage.service';
import { Subject } from 'rxjs';
import { WithdrawalsService } from '../../../data/services/user/withdrawals.service';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent implements OnInit, AfterViewInit {
  auth: any;
  secondNavCont;
  scrollUpBtn;
  html;
  favicon;
  userDropped;
  // toggle = false;
  donToggle = false;
  witToggle = false;
  setToggle = false;
  subDropdwn = false;
  expandH = 346;
  allSocail: any;
  webSet: any;
  logo: any;
  configuration: any;
  activeRoute: any;
  scrollEv;
  scrolltoTop = false;
  windowMouseMoveEv;
  fullscreen = false;
  accountsettings = false;

  userActivity;
  userInactive: Subject<any> = new Subject();

  role: any;

  constructor(
    private authService: AuthService,
    private routingService: RoutingService,
    private generalSettingsService: GeneralSettingsService,
    private socialService: SocialSettingsService,
    private userBankAccountService: UserBankAccountService,
    private storageService: StorageService,
    private withdrawalsService: WithdrawalsService,
  ) { }

  ngOnInit() {
    this.activeRoute = this.routingService.activeRoute;
    this.accountsettings = window.location.href.includes('profile') ? true : false;
    this.getConfiguration();
    this.getWebSettings();
    this.getSocialLink();
    this.getAuth();
    // this.setTimeout();
    // this.userInactive.subscribe(() => this.logout());
    this.updateActiveMenu();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const me = this;
      const html = document.getElementsByTagName('html')['0'];
      const header = document.querySelectorAll('header')['0'];
      this.scrollEv = cusScroll;
      // let userActivity = setTimeout(()=> this.logout(), 180000);
      window.addEventListener('scroll', cusScroll);
      window.addEventListener('mousemove', mouseMove);
      function cusScroll() {
        // clearInterval(userActivity);
        // userActivity = setTimeout(()=> me.logout(), 180000);
        // if (html.scrollTop >= 1) {
        //   header.classList.add('active');
        // } else {
        //   header.classList.remove('active');
        // }
        if (html.scrollHeight >= window.innerHeight * 2 && html.scrollTop >= window.innerHeight * 2) {
          me.scrolltoTop = true;
        } else {
          me.scrolltoTop = false;
        }
      }
      function mouseMove() {
        // clearInterval(userActivity);
        // userActivity = setTimeout(()=> me.logout(), 180000);
      }
    });
  }

  // setTimeout() {
  //   this.userActivity = setTimeout(() => this.userInactive.next(undefined), 180000);
  // }

  // @HostListener('window:mousemove') refreshUserState() {
  //   clearTimeout(this.userActivity);
  //   // this.setTimeout();
  // }

  private getAuth() {
    this.authService.user.subscribe(res => {
      if (res && res.login_id) {
        this.authService.authVerify(res.token).subscribe(data => {
          if (data) {
            this.auth = data;
            // this.storageService.storeString('userData', JSON.stringify(data));

            if (data.email_verify !== '1' && data.email_verify !== 1) {
              if (this.configuration && this.configuration.email_verify === 'Enabled') {
                this.routingService.replace(['/user/email-verification']);
                return;
              }
            }
            
            if (data.status !== 'Pending' && data.status !== 'Active') {
              this.logout();
              return;
            }
            // this.bankAccount();
            // this.getWithdrawals();
          }
        });
      } else {
        this.logout();
      }
    });
  }

  private bankAccount() {
    this.userBankAccountService.bankAccounts().subscribe(res => {
      if (!res || !res.account_name) {
        this.routingService.replace(['/user/bank-info']);
      }
    });
  }

  private getWebSettings() {
    this.generalSettingsService.getSettings.subscribe(res => {
      if (res) {
        this.webSet = res.generalSettings;
        if (this.webSet.logo_url) {
          this.logo = this.webSet.logo_url;
          this.favicon = this.webSet.favicon_url;
        }
      }
    });
  }

  private getConfiguration() {
    this.generalSettingsService.getConfiguration.subscribe(res => {
      this.configuration = res;
    });
  }
  scrollUp(): void {
    // console.log(document.querySelectorAll('html'));
    this.html.scrollTop = 0;
  }

  logout() {
    this.storageService.remove('userData');
    // this.authService.storeAuthData(null);
    window.location.reload();
  }

  private getSocialLink() {
    this.socialService.getSocial_settings.subscribe(res => {
      if (res) {
        this.allSocail = res.socialSettings;
      }
    });
  }


  toggle(role) {
    this.storageService.storeString('userNavMenu', role);
    this.role = (this.role === role) ? null : role;
  }

  private updateActiveMenu() {
    if (this.storageService.hasKey('userNavMenu')) {
      this.role = this.storageService.getString('userNavMenu');
    }
  }

  toggleUserDropdwn(owner) {
    const me = this;
    this.userDropped = this.userDropped == owner ? null : owner;
    if (me.userDropped != owner) {
      document.onclick = null;
      return;
    }
    setTimeout(() => {
      document.onclick = setAuxClick;
    });

    function setAuxClick(e) {
      let contdropped = false;
      for (let i = 0; i < e.path.length - 2; i++) {
        if (e.path[i].classList.contains('clickOrigin')) {
          document.onclick = null;
          return;
        }
        if (e.path[i].classList.contains('dropped')) {
          contdropped = true;
          break;
        }
      }
      if (!contdropped) {
        me.userDropped = null;
        document.onclick = null;
      }
    }
  }

  toggleFullscreen() {
    if (document.fullscreenEnabled) {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        return;
      }
      document.exitFullscreen();
    }
  }

  toggleLeftSidebar(head, icon) {
    const side = document.getElementsByTagName('aside')['0'];
    const main = document.getElementById('main');
    let headLeft = +getComputedStyle(head).paddingLeft.replace('px', '');
    if (window.innerWidth > 790) {
      if (headLeft > 20) {
        head.classList.add('full');
        main.classList.add('expand');
        side.classList.add('hide');
        icon.classList.remove('fe-align-left');
        icon.classList.add('fe-x');
      } else {
        head.classList.remove('full');
        main.classList.remove('expand');
        side.classList.remove('hide');
        icon.classList.remove('fe-x');
        icon.classList.add('fe-align-left');
      }
    } else {
      if (side.classList.contains('hide')) {
        side.classList.remove('hide');
      } else {
        side.classList.add('hide');
        setTimeout(()=>{
          document.onclick = setAuxClick;
        })
      }
    }
    function setAuxClick(e) {
      let aside = false;
      for (let i = 0; i < e.path.length; i++) {
        if (e.path[i].tagName == 'ASIDE') {
          aside = true;
          break;
        }
      }
      if (!aside) {
        side.classList.remove('hide');
        document.onclick = null;
      }
    }
  }
}
