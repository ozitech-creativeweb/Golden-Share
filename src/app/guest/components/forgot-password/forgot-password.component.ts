import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { SEOService } from '../../../data/services/seo.service';
import { AuthService } from '../../../data/services/auth.service';
import { RoutingService } from '../../../data/helpers/routing.service';
import { GeneralSettingsService } from 'src/app/data/services/guest/general-settings.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  webSet: any;
  error: any;
  success: any;
  isLoading = false;

  form = new FormGroup({
    email: new FormControl('', [
      Validators.required
    ]),
  });

  get email(){
    return this.form.get('email')
  }

  constructor(
    private seoService: SEOService,
    private authService: AuthService,
    private generalSettingsService: GeneralSettingsService,
  ) { }

  ngOnInit() {
    this.getWebSettings()
  }

  private getWebSettings() {
    this.generalSettingsService.getSettings.subscribe(res => {
      if (res) {
        this.webSet = res.generalSettings;
      }
    });
  }


  onSubmit() {
    this.isLoading = true;
    this.error = null;
    this.success = null;
    const data = JSON.stringify(this.form.value.email);
    this.authService.resetPass(data).subscribe(res => {
      if (res && res.status === "success") {
        this.success = "Successful! A link has been sent to your email, Click on the link to reset your password";
        this.form.reset();
      } else {
        this.error = 'Oops! There is no record found with this Email';
      }
      this.isLoading = false;
    });
  }


  private seoUpdate() {
    this.seoService.updateTitle('Forgot Password');
    // this.seoService.updateOgUrl('my title');
    this.seoService.updateDescription('Forgot Password');
  }

}
