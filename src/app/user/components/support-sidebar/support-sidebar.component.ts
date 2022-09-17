import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../data/services/config.service';
import { SupportService } from '../../../data/services/user/support.service';

@Component({
  selector: 'app-support-sidebar',
  templateUrl: './support-sidebar.component.html',
  styleUrls: ['./support-sidebar.component.scss']
})
export class SupportSidebarComponent implements OnInit {

  supports: any;
  isLoading = true;

  constructor(
    private configService: ConfigService,
    private supportService: SupportService,
  ) { }

  ngOnInit() {
    this.getSupports();
  }

  getSupports() {
    this.supportService.supports().subscribe(res => {
      if (res) {
        this.supports = res.data;
        this.isLoading = false;
      }
    });
  }

  cleanUrl(url) {
    return this.configService.clearnUrl(url);
  }

}
