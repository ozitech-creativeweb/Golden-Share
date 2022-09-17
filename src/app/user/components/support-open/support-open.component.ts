import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfigService } from '../../../data/services/config.service';
import { SupportService } from '../../../data/services/user/support.service';
import { AuthService } from '../../../data/services/auth.service';
import { SEOService } from '../../../data/services/seo.service';

@Component({
  selector: 'app-support-open',
  templateUrl: './support-open.component.html',
  styleUrls: ['./support-open.component.scss']
})
export class SupportOpenComponent implements OnInit {

  closeResult = '';
  supports: any;
  auth: any;
  isSubmitting = false;
  isLoading = true;

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
    private modalService: NgbModal,
    private configService: ConfigService,
    private supportService: SupportService,
    private authService: AuthService,
    private seoService: SEOService
    ) { }

  ngOnInit() {
    this.getAuth();
    this.getSupports();
    this.seoUpdate();
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

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  submit() {
    const data = JSON.stringify(this.form.value);
    this.isSubmitting = true;
    this.supportService.sendMessage(data).subscribe(res => {
      if (res.status === 'success') {
        this.form.reset();
        this.modalService.dismissAll();
        window.location.reload();
      }
      this.isSubmitting = false;
    });
  }

  getSupports() {
    this.supportService.supports().subscribe(res => {
      this.supports = res.data;
      this.isLoading = false;
    });
  }

  private seoUpdate() {
    this.seoService.updateTitle('Support');
    this.seoService.updateDescription('Support');
  }

}
