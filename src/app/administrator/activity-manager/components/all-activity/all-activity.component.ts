import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../../data/services/config.service';
import { ActivitiesManagerService } from '../../../../data/services/administrator/activities-manager.service';
import { ActivatedRoute } from '@angular/router';
import { PaginationService } from '../../../../data/services/pagination.service';

@Component({
  selector: 'app-all-activity',
  templateUrl: './all-activity.component.html',
  styleUrls: ['./all-activity.component.scss']
})
export class AllActivityComponent implements OnInit {

  pageLimit = 20;
  currentPage = 1;
  activities: any;
  isPaginationLoading = false;
  isLoading = true;
  paginationLinks: any;
  ActivityCounts = 0;

  constructor(
    private configService: ConfigService,
    private activityManager: ActivitiesManagerService,
    private route: ActivatedRoute,
    private paginationService: PaginationService,
  ) { }

  ngOnInit() {
    this.getActivity();
    const currPage = parseInt(
      this.route.snapshot.paramMap.get('page-num')
    );

    if (currPage) { this.setCurrPage(currPage); }
  }

  setCurrPage(currentPage) {
    this.isPaginationLoading = true;
    this.currentPage = currentPage;
    this.getActivity();
  }

  private getActivity(){
    this.isLoading = true;
    this.activityManager.getActivities(
      this.pageLimit, this.currentPage
    ).subscribe(res => {
      if(res){
        console.log(res);
        this.activities = res.data;
        this.ActivityCounts = res.counts;
        this.paginationLinks = this.paginationService.links(
          res.counts, this.pageLimit, this.currentPage
        );
        this.isLoading = false;
        this.isPaginationLoading = false;
      }
    });
  }

  get adminUrl() {
    return this.configService.adminURL;
  }

  deleteActivity(actID: number) {
    if (confirm('Are you sure you want to DELETE this activity?') ) {
      this.activityManager.deleteActivity(actID).subscribe(res => {
        window.location.href = '/' + this.adminUrl + '/activity-manager';
        alert("Activity Deleted successfully");
      });
    }
  }
   

}
