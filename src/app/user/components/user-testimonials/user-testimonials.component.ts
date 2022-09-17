import { Component, OnInit } from '@angular/core';
import { UserTestimonialManagerService } from '../../../data/services/user/user-testimonial-manager.service';
import { User } from '../../../data/model/user';
import { RoutingService } from '../../../data/helpers/routing.service';
import { AuthService } from '../../../data/services/auth.service';
import { SEOService } from '../../../data/services/seo.service';

@Component({
  selector: 'app-user-testimonials',
  templateUrl: './user-testimonials.component.html',
  styleUrls: ['./user-testimonials.component.scss']
})
export class UserTestimonialsComponent implements OnInit {
  auth: User;
  isLoading = true;
  testimonies: any;
  status: any;

  constructor(
    private userTestimonyService: UserTestimonialManagerService,
    private authService: AuthService,
    private routingService: RoutingService,
    private seoService: SEOService
  ) { }

  ngOnInit() {
    this.getAuth();
    this.getTestimony();
    this.seoUpdate();
  }

  private getAuth() {
    this.authService.user.subscribe(res => {
      this.authService.authVerify(res.token).subscribe(data => {
        if (data) {
          this.auth = data;
        }
      });
    });
  }

  private getTestimony() {
    this.isLoading = true;
    this.userTestimonyService.testimonials().subscribe(res => {
      setTimeout(() => {
        if (res) {
          this.testimonies = res;
        }
        this.isLoading = false;
      }, 1500);
    });
  }

  deleteTest(id, index) {
    const x = 'Are you sure you want to DELETE this Testimony?';
    if (confirm(x)) {
      this.userTestimonyService.delete(id).subscribe(res => {
        if (res && res.status === 'success') {
          this.testimonies.splice(index, 1);
        } else {
          alert('Oops! Something went wrong, we could not process your request.');
        }
      });
    }
  }

  private seoUpdate() {
    this.seoService.updateTitle('Testimony');
    this.seoService.updateDescription('Testimony');
  }

}
