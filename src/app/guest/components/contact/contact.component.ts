import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SEOService } from '../../../data/services/seo.service';
import { ContactUsService } from '../../../data/services/guest/contact-us.service';
import { AuthService } from '../../../data/services/auth.service';
import { GeneralSettingsService } from '../../../data/services/guest/general-settings.service';
import { SocialSettingsService } from 'src/app/data/services/guest/social-settings.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactInfo: any;
  webSet: any;
  auth: any;
  settings: any;
  socialMedia: any;

  isLoading = false;

  form = new FormGroup({
    first_name: new FormControl('', [
      Validators.required,
    ]),
    last_name: new FormControl('', [
      Validators.required,
    ]),
    email: new FormControl('', [
      Validators.required,
    ]),
    subject: new FormControl('', [
      Validators.required,
    ]),
    message: new FormControl('', [
      Validators.required,
    ]),
  });

  get first_name() {
    return this.form.get('first_name');
  }
  get last_name() {
    return this.form.get('last_name');
  }
  get email() {
    return this.form.get('email');
  }
  get subject() {
    return this.form.get('subject');
  }
  get message() {
    return this.form.get('message');
  }


  constructor(
    private contactService: ContactUsService,
    private seoService: SEOService,
    private authService: AuthService,
    private generalSettingsService: GeneralSettingsService,
    private socialSettingsService: SocialSettingsService
  ) { }

  ngOnInit() {
    this.seoUpdate();
    this.getAuth();
    this.getSiteDetails();
    this.getSocials();
  }

  private getAuth() {
    this.authService.user.subscribe(res => {
      this.auth = res;
    });
  }

  private getSiteDetails() {
    this.generalSettingsService.settings().subscribe(res => {
      this.settings = res.generalSettings;
    });
  }
 
  private getSocials() {
    this.socialSettingsService.settings().subscribe(res => {
      this.socialMedia = res.socialSettings;
      console.log(this.socialMedia);
    });
  }

  onSubmit() {
    this.isLoading = true;
    const data = JSON.stringify(this.form.value);
    this.contactService.sendContactMssg(data).subscribe(res => {
      console.log(res);
      if (res && res.status === 'success') {
        this.form.reset();
        alert('Message send successfully!');
      } else {
        alert('Oops, Error in sending message!');
      }

      this.isLoading = false;
    });
  }


  private seoUpdate() {
    this.seoService.updateTitle('Contact Us');
    // this.seoService.updateOgUrl('my title');
    this.seoService.updateDescription('Contact Us');
  }


}
