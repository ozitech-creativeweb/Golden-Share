import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../../data/services/auth.service';
import { SEOService } from '../../../data/services/seo.service';
import { ActivatedRoute } from '@angular/router';
import { RoutingService } from '../../../data/helpers/routing.service';
import { StorageService } from '../../../data/helpers/storage.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {
  success = false;
  failed = false;
  isLoading = true;

  form = new FormGroup({
    email: new FormControl('', []),
  });

  constructor(
    private authService: AuthService,
    private seoService: SEOService,
    private route: ActivatedRoute,
    private routingService: RoutingService,
    private storageService: StorageService,
  ) { }

  ngOnInit() {
    this.seoUpdate();
    const verifyCode = this.route.snapshot.paramMap.get('verify-code');
    const passwordReset = this.route.snapshot.paramMap.get('password-reset');
    if (verifyCode) {
      this.verify(verifyCode, passwordReset);
    } else {
      this.routingService.replace(['/']);
    }
  }

  private verify(code, role) {
    this.authService.verifyCode(code).subscribe(res => {
      if (res.status === 'success') {
        this.success = true;
        this.failed = false;
        if (role && (role !== null || role !== undefined ) ) {
          const data = JSON.stringify(res);
          this.storageService.storeString('verifiedData', data);
          this.routingService.replace(['/login/change-password']);
          if(role === 'password-reset'){
            this.routingService.replace(['/reset-password/' + code]);
          }
        }
      } else {
        this.failed = true;
        this.success = false;
      }
      this.isLoading = false;
    });
  }

  private seoUpdate() {
    this.seoService.updateTitle('Verification');
    // this.seoService.updateOgUrl('my title');
    this.seoService.updateDescription('Verification');
  }

}
