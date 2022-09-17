import { Component, OnInit, Input } from '@angular/core';
import { AdminAuthService } from '../../../../data/services/admin-auth.service';
import { ConfigService } from '../../../../data/services/config.service';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit {
  @Input() menuObj: any;

  show1 = false;
  show2 = false;
  show3 = false;
  show4 = false;
  show5 = false;
  show6 = false;
  show7 = false;
  show8 = false;
  buttonName1: any = 'fa fa-angle-right';
  buttonName2: any = 'fa fa-angle-right';
  buttonName3: any = 'fa fa-angle-right';
  buttonName4: any = 'fa fa-angle-right';
  buttonName5: any = 'fa fa-angle-right';
  buttonName6: any = 'fa fa-angle-right';
  buttonName7: any = 'fa fa-angle-right';
  buttonName8: any = 'fa fa-angle-right';

  constructor(
    private adminAuthService: AdminAuthService,
    private configService: ConfigService
  ) { }

  get adminUrl() {
    return this.configService.adminURL;
  }

  ngOnInit() {
  }

  toggle1() {
    this.show1 = !this.show1;
    this.show2 = false;
    this.show3 = false;
    this.show4 = false;
    this.show5 = false;
    this.show6 = false;
    this.show7 = false;
    this.show8 = false;
    if (this.show1) {
      this.buttonName1 = 'fa fa-angle-down',
      this.buttonName2 = 'fa fa-angle-right',
      this.buttonName3 = 'fa fa-angle-right',
      this.buttonName4 = 'fa fa-angle-right',
      this.buttonName5 = 'fa fa-angle-right',
      this.buttonName6 = 'fa fa-angle-right',
      this.buttonName7 = 'fa fa-angle-right',
      this.buttonName8 = 'fa fa-angle-right';
    } else {
      this.buttonName1 = 'fa fa-angle-right';
    }
  }

  toggle2() {
    this.show2 = !this.show2;
    this.show1 = false;
    this.show3 = false;
    this.show4 = false;
    this.show5 = false;
    this.show6 = false;
    this.show7 = false;
    this.show8 = false;
    if (this.show2) {
      this.buttonName2 = 'fa fa-angle-down',
      this.buttonName1 = 'fa fa-angle-right',
      this.buttonName3 = 'fa fa-angle-right',
      this.buttonName4 = 'fa fa-angle-right',
      this.buttonName5 = 'fa fa-angle-right',
      this.buttonName6 = 'fa fa-angle-right',
      this.buttonName7 = 'fa fa-angle-right',
      this.buttonName8 = 'fa fa-angle-right';
    } else {
      this.buttonName2 = 'fa fa-angle-right';
    }
  }

  toggle3() {
    this.show3 = !this.show3;
    this.show2 = false;
    this.show1 = false;
    this.show4 = false;
    this.show5 = false;
    this.show6 = false;
    this.show7 = false;
    this.show8 = false;
    if (this.show3) {
      this.buttonName3 = 'fa fa-angle-down',
      this.buttonName2 = 'fa fa-angle-right',
      this.buttonName4 = 'fa fa-angle-right',
      this.buttonName1 = 'fa fa-angle-right',
      this.buttonName5 = 'fa fa-angle-right',
      this.buttonName6 = 'fa fa-angle-right',
      this.buttonName7 = 'fa fa-angle-right',
      this.buttonName8 = 'fa fa-angle-right';
    } else {
      this.buttonName3 = 'fa fa-angle-right';
    }
  }

  toggle4() {
    this.show4 = !this.show4;
    this.show2 = false;
    this.show1 = false;
    this.show3 = false;
    this.show5 = false;
    this.show6 = false;
    this.show7 = false;
    this.show8 = false;
    if (this.show4) {
      this.buttonName4 = 'fa fa-angle-down',
      this.buttonName2 = 'fa fa-angle-right',
      this.buttonName3 = 'fa fa-angle-right',
      this.buttonName1 = 'fa fa-angle-right',
      this.buttonName5 = 'fa fa-angle-right',
      this.buttonName6 = 'fa fa-angle-right',
      this.buttonName7 = 'fa fa-angle-right',
      this.buttonName8 = 'fa fa-angle-right';
    } else {
      this.buttonName4 = 'fa fa-angle-right';
    }
  }

  toggle5() {
    this.show5 = !this.show5;
    this.show2 = false;
    this.show1 = false;
    this.show3 = false;
    this.show4 = false;
    this.show6 = false;
    this.show7 = false;
    this.show8 = false;
    if (this.show5) {
      this.buttonName5 = 'fa fa-angle-down',
      this.buttonName2 = 'fa fa-angle-right',
      this.buttonName3 = 'fa fa-angle-right',
      this.buttonName1 = 'fa fa-angle-right',
      this.buttonName4 = 'fa fa-angle-right',
      this.buttonName6 = 'fa fa-angle-right',
      this.buttonName7 = 'fa fa-angle-right',
      this.buttonName8 = 'fa fa-angle-right';
    } else {
      this.buttonName5 = 'fa fa-angle-right';
    }
  }

  toggle6() {
    this.show6 = !this.show6;
    this.show2 = false;
    this.show1 = false;
    this.show3 = false;
    this.show4 = false;
    this.show5 = false;
    this.show7 = false;
    this.show8 = false;
    if (this.show6) {
      this.buttonName6 = 'fa fa-angle-down',
      this.buttonName2 = 'fa fa-angle-right',
      this.buttonName3 = 'fa fa-angle-right',
      this.buttonName1 = 'fa fa-angle-right',
      this.buttonName4 = 'fa fa-angle-right',
      this.buttonName5 = 'fa fa-angle-right',
      this.buttonName7 = 'fa fa-angle-right',
      this.buttonName8 = 'fa fa-angle-right';
    } else {
      this.buttonName6 = 'fa fa-angle-right';
    }
  }


  toggle7() {
    this.show7 = !this.show7;
    this.show2 = false;
    this.show1 = false;
    this.show3 = false;
    this.show4 = false;
    this.show5 = false;
    this.show6 = false;
    this.show8 = false;
    if (this.show7) {
      this.buttonName7 = 'fa fa-angle-down',
      this.buttonName2 = 'fa fa-angle-right',
      this.buttonName3 = 'fa fa-angle-right',
      this.buttonName1 = 'fa fa-angle-right',
      this.buttonName4 = 'fa fa-angle-right',
      this.buttonName5 = 'fa fa-angle-right',
      this.buttonName6 = 'fa fa-angle-right',
      this.buttonName8 = 'fa fa-angle-right';
    } else {
      this.buttonName7 = 'fa fa-angle-right';
    }
  }

  toggle8() {
    this.show8 = !this.show8;
    this.show2 = false;
    this.show1 = false;
    this.show3 = false;
    this.show4 = false;
    this.show5 = false;
    this.show6 = false;
    this.show7 = false;
    if (this.show8) {
      this.buttonName8 = 'fa fa-angle-down',
      this.buttonName2 = 'fa fa-angle-right',
      this.buttonName3 = 'fa fa-angle-right',
      this.buttonName1 = 'fa fa-angle-right',
      this.buttonName4 = 'fa fa-angle-right',
      this.buttonName5 = 'fa fa-angle-right',
      this.buttonName6 = 'fa fa-angle-right',
      this.buttonName7 = 'fa fa-angle-right'
    } else {
      this.buttonName8 = 'fa fa-angle-right';
    }
  }


  logout() {
    this.adminAuthService.logout();
  }

}
