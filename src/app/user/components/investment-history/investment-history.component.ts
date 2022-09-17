import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../data/services/auth.service';
import { RoutingService } from '../../../data/helpers/routing.service';
import { User } from '../../../data/model/user';

@Component({
  selector: 'app-investment-history',
  templateUrl: './investment-history.component.html',
  styleUrls: ['./investment-history.component.scss']
})
export class InvestmentHistoryComponent implements OnInit {
  auth: User;

  constructor(
    private authService: AuthService,
    private routingService: RoutingService,
  ) { }

  ngOnInit() {
    this.getAuth();
  }

  private getAuth() {
    this.authService.user.subscribe(res => {
      if (res) {
        this.authService.authVerify(res.token).subscribe(data => {
          if (data) {
            this.auth = data;
          }
        });
      }
    });
  }

}
