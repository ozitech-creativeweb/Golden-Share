import { Component, OnInit } from '@angular/core';
import { RoutingService } from '../../data/helpers/routing.service';
import { AuthService } from '../../data/services/auth.service';
import { StorageService } from '../../data/helpers/storage.service';

@Component({
  selector: 'app-logout',
  template: ''
})
export class LogoutComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private routingService: RoutingService,
    private storageService: StorageService,
  ) {}

  ngOnInit() {
    this.storageService.remove('userData');
    window.location.reload();
  }

}
