import { Component, OnInit, Input } from '@angular/core';
import { ConfigService } from '../../../../data/services/config.service';
import { UserManagerService } from '../../../../data/services/administrator/user-manager.service';
import { RoutingService } from '../../../../data/helpers/routing.service';

@Component({
  selector: 'app-user-info-share',
  templateUrl: './user-info-share.component.html',
  styleUrls: ['./user-info-share.component.scss']
})
export class UserInfoShareComponent implements OnInit {
  @Input() customer: any;

  constructor(
    private configService: ConfigService,
    private userManagerService: UserManagerService,
    private routingService: RoutingService,
  ) { }

  get adminUrl() {
    return this.configService.adminURL;
  }

  ngOnInit() {
  }

  accountAction(loginID, action: string) {
    let temp = action.split('ed')[0];
    if (action === 'Active') { temp = 'Activate'; }
    const x = 'Are you sure you want to ' + temp + ' this customer?';
    if (confirm(x)) {
      this.userManagerService.accountAction(loginID, action).subscribe(res => {
        if (res.login_id) {
          this.customer = res;
        } else if (res.status === 'success') {
          this.routingService.replace([
            '/' + this.adminUrl + '/user-manager'
          ]);
        } else {
          alert('Oops! Something went wrong, we could not process your request.');
        }
      });
    }
  }

}
