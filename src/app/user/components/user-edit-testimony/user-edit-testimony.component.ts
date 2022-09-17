import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../data/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserTestimonialManagerService } from '../../../data/services/user/user-testimonial-manager.service';
import { RoutingService } from '../../../data/helpers/routing.service';
import { SEOService } from '../../../data/services/seo.service';

@Component({
  selector: 'app-user-edit-testimony',
  templateUrl: './user-edit-testimony.component.html',
  styleUrls: ['./user-edit-testimony.component.scss']
})
export class UserEditTestimonyComponent implements OnInit {

  auth: any;
  testimon: any;
  isLoading: any;
  successPost: string;

  form = new FormGroup({
    testimony: new FormControl('', [
      Validators.required
    ]),
    loginID: new FormControl('', []),
    testID: new FormControl('', [])
  });

  get testimony() {
    return this.form.get('testimony');
  }

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private userTestimonyService: UserTestimonialManagerService,
    private routingService: RoutingService,
    private seoService: SEOService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getTestimony(id);
    this.getAuth();
    this.seoUpdate()
  }


  private getAuth() {
    this.authService.user.subscribe(res => {
      this.auth = res;
      this.authService.authVerify(res.token).subscribe(data => {
        if (data) {
          this.auth = data;
          this.form.get('loginID').setValue(data.login_id);
        }
      });
    });
  }

  private getTestimony(id) {
    this.userTestimonyService.testimony(id).subscribe(res => {
      if (res) {
        this.testimon = res;
        this.form.get('testimony').setValue(res.testimony);
        this.form.get('testID').setValue(res.test_id);
      }
    });
  }


  submit() {
    this.isLoading = true;
    const data = JSON.stringify(this.form.value);
    this.userTestimonyService.edit(data).subscribe(res => {
      if (res) {
        alert('Successfully Updated');
        this.successPost = 'Testimony successfully Updated';
      }
      this.isLoading = false;
    });
  }

  private seoUpdate() {
    this.seoService.updateTitle('Edit Testimony');
    this.seoService.updateDescription('Edit Testimony');
  }


}
