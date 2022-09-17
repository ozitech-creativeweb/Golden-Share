import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../../data/services/config.service';
import { ActivatedRoute } from '@angular/router';
import { RoutingService } from '../../../../data/helpers/routing.service';
import { SupportManagerService } from '../../../../data/services/administrator/support-manager.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SEOService } from '../../../../data/services/seo.service';

@Component({
  selector: 'app-reply-support',
  templateUrl: './reply-support.component.html',
  styleUrls: ['./reply-support.component.scss']
})
export class ReplySupportComponent implements OnInit {

  collapsed = true;
  supports: any;
  supportID: any;
  loginID: any;
  getById: any;

  form = new FormGroup({
    title: new FormControl('', [
      Validators.required
    ]),
    message: new FormControl('', [
      Validators.required
    ]),
    loginID: new FormControl('', [
      Validators.required
    ]),
  });

  constructor(
    private route: ActivatedRoute,
    private configService: ConfigService,
    private routingService: RoutingService,
    private supportManagerService: SupportManagerService,
    private seoService: SEOService
  ) { }

  ngOnInit() {
    this.getPage();
    this.seoUpdate()
  }

  get adminUrl() {
    return this.configService.adminURL;
  }


  private getPage() {
    const testID = parseInt(this.route.snapshot.paramMap.get('id'));
    this.supportManagerService.supportSingle(testID).subscribe(res => {
      if(res.status === 'success'){
        this.supports = res.data;
        if(this.supports && this.supports[0]){
          this.form.get('title').setValue(this.supports[0].title);
          this.form.get('loginID').setValue(this.supports[0].login_id);
        }
      } else {
        this.routingService.replace([
          '/' + this.adminUrl + '/support-manager'
        ]);
      }
    });
  }



  // private getPage(){
  //   this.supportManagerService.getMessagrTree.subscribe(res => {
  //     console.log('here' + res);
  //     if(res.status === 'success'){
  //       this.supports = res.data;
  //       this.loginID = res.data.login_id;
  //     } else {
  //       this.routingService.replace([
  //         '/' + this.adminUrl + '/support-manager'
  //       ]);
  //     }
  //   })
  // }


  submit() {
    const data = JSON.stringify(this.form.value);
    this.supportManagerService.replyChat(data).subscribe(res => {
      if (res && res.status === 'success') {
        this.form.get('message').setValue('');
        this.getPage();
      } else {
      }
    });
  }

  private seoUpdate() {
    this.seoService.updateTitle('Support');
    this.seoService.updateDescription('Support');
  }

}
