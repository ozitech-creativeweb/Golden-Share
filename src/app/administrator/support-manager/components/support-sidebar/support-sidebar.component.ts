import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../../data/services/config.service';
import { SupportManagerService } from '../../../../data/services/administrator/support-manager.service';
import { ActivatedRoute } from '@angular/router';
import { RoutingService } from '../../../../data/helpers/routing.service';

@Component({
  selector: 'app-support-sidebar',
  templateUrl: './support-sidebar.component.html',
  styleUrls: ['./support-sidebar.component.scss']
})
export class SupportSidebarComponent implements OnInit {
  supportID: any;
  pageLimit= 50;
  currPage = 1;
  supportsCounts = 0;
  supports: any;


  constructor(
    private configService: ConfigService,
    private supportManagerService: SupportManagerService,
    private route: ActivatedRoute,
    private routingService: RoutingService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getSupport();
    this.getID();
    // this.getPage(id)
    console.log(this.supportID);
  }

  get adminUrl() {
    return this.configService.adminURL;
  }

  private getSupport() {
    this.supportManagerService.getSupport(
       this.pageLimit, this.currPage
    ).subscribe(res => {
      if (res) {
        this.supports = res.data;
        this.supportsCounts = res.counts;
      }
    });
  }

  // private getPage(id){
  //   this.supportManagerService.supportSingle(id).subscribe(res => {
  //     if(res.status === 'success'){
  //       this.supports = res.data;
  //     } else {
  //       this.routingService.replace([
  //         '/' + this.adminUrl + '/support-manager'
  //       ]);
  //     }
  //   })
  // }
  
  private getID(){
    this.supportManagerService.getID.subscribe(res => {
      this.supportID = res;
      console.log(this.supportID)
    })
  }

  setID(id){
    console.log(id);
    this.supportManagerService.setID(id);
    // this.getPage(id)
  }

}
