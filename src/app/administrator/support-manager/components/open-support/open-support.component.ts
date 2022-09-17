import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfigService } from '../../../../data/services/config.service';
import { UserManagerService } from '../../../../data/services/administrator/user-manager.service';
import { SupportManagerService } from '../../../../data/services/administrator/support-manager.service';
import { RoutingService } from '../../../../data/helpers/routing.service';
import { AdminAuthService } from '../../../../data/services/admin-auth.service';
import { SEOService } from '../../../../data/services/seo.service';

@Component({
  selector: 'app-open-support',
  templateUrl: './open-support.component.html',
  styleUrls: ['./open-support.component.scss']
})
export class OpenSupportComponent implements OnInit {

  closeResult = '';
  UserPageLimit = 9000000;
  currPage = 1;
  customerCounts = 0;
  customerStatus = 'all';
  customers = [];
  isLoading = false;
  adm: any;

  form = new FormGroup({
    loginID: new FormControl('', [
      Validators.required
    ]),
    title: new FormControl('', [
      Validators.required
    ]),
    message: new FormControl('', [
      Validators.required
    ]),
    admin_id: new FormControl('', [
      Validators.required
    ]),
  });


  constructor(
    private modalService: NgbModal,
    private configService: ConfigService,
    private userManagerService: UserManagerService,
    private supportManagerService: SupportManagerService,
    private adminAuthService: AdminAuthService,
    private seoService: SEOService
  ) { }

  ngOnInit() {
    this.getCustomers();
    this.updateAuth();
    this.seoUpdate()
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

  private updateAuth() {
    this.adminAuthService.admin.subscribe(res => {
      if (res) { 
        this.adm = res;  
        this.setValue(res);
      }
    });
  }

  private setValue(adm) {
    this.form.get('admin_id').setValue(adm.id);
  }

  submit() {
    this.isLoading = true;
    const data = JSON.stringify(this.form.value);
    this.supportManagerService.replyChat(data).subscribe(res => {
      if (res && res.status === 'success') {
        this.form.reset();
        window.location.reload();
        this.modalService.dismissAll();
        this.isLoading = false;
      } else {
        alert('Oops, Error in sending message!');
      }
    });
  }

  get adminUrl() {
    return this.configService.adminURL;
  }

  private getCustomers() {
    this.userManagerService.getCustomers(
      this.customerStatus, this.UserPageLimit, this.currPage
    ).subscribe(res => {
      if (res) {
        this.customers = res.data;
        this.customerCounts = res.counts;
      }
    });
  }

  private seoUpdate() {
    this.seoService.updateTitle('Open Support');
    this.seoService.updateDescription('Open Support');
  }

}
