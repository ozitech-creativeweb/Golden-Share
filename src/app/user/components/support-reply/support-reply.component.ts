import { Component, OnInit } from '@angular/core';
import { SupportService } from '../../../data/services/user/support.service';
import { ActivatedRoute } from '@angular/router';
import { RoutingService } from '../../../data/helpers/routing.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../data/services/auth.service';
import { SEOService } from '../../../data/services/seo.service';

@Component({
  selector: 'app-support-reply',
  templateUrl: './support-reply.component.html',
  styleUrls: ['./support-reply.component.scss']
})
export class SupportReplyComponent implements OnInit {
  isSubmitting = false;
  messageTrees: any;
  auth: any;

  form = new FormGroup({
    loginID: new FormControl('', []),
    title: new FormControl('', [
      Validators.required
    ]),
    message: new FormControl('', [
      Validators.required
    ]),
  });

  constructor(
    private supportService: SupportService,
    private route: ActivatedRoute,
    private routingService: RoutingService,
    private authService: AuthService,
    private seoService: SEOService
  ) { }

  ngOnInit() {
    this.getPage();
    this.getAuth();
    this.seoUpdate();
  }


  private getPage() {
    const testID = parseInt(this.route.snapshot.paramMap.get('id'));
    this.supportService.supportSingle(testID).subscribe(res => {
      if (res.status === 'success') {
        this.messageTrees = res.data;
        if (this.messageTrees && this.messageTrees[0]) {
          this.form.get('title').setValue(this.messageTrees[0].title);
        }
      } else {
        this.routingService.replace([
          '/user/support'
        ]);
      }
    });
  }

  private getAuth() {
    this.authService.user.subscribe(res => {
      if (res) {
        this.authService.authVerify(res.token).subscribe(data => {
          if (data) {
            this.auth = data;
            this.form.get('loginID').setValue(res.login_id);
          }
        });
      }
    });
  }

  submit() {
    const data = JSON.stringify(this.form.value);
    this.isSubmitting = true;
    this.supportService.sendMessage(data).subscribe(res => {
      if (res) {
        this.form.get('message').setValue('');
        this.getPage();
      }
      this.isSubmitting = false;
    });
  }

  private seoUpdate() {
    this.seoService.updateTitle('Support');
    this.seoService.updateDescription('Support');
  }

}
