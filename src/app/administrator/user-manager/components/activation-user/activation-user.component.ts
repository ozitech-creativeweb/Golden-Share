import { Component, OnInit } from '@angular/core';
import { UserManagerService } from '../../../../data/services/administrator/user-manager.service';
import { ConfigService } from '../../../../data/services/config.service';

@Component({
  selector: 'app-activation-user',
  templateUrl: './activation-user.component.html',
  styleUrls: ['./activation-user.component.scss']
})
export class ActivationUserComponent implements OnInit {

  activeUsers: any;
  limit = 50;
  currPage = 1;

  constructor(
    private userManagerService: UserManagerService,
    private configService: ConfigService
  ) { }

  ngOnInit() {
    this.activatedUsers();
  }

  get adminUrl() {
    return this.configService.adminURL;
  }

  private activatedUsers() {
    this.userManagerService.activatedUser(
      this.limit, this.currPage
    ).subscribe(res => {
      if (res) {
        this.activeUsers = res;
      }
    });
  }

}
