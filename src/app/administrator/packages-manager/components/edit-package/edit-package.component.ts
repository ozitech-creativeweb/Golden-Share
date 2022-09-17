import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../../data/services/config.service';
import { ActivatedRoute } from '@angular/router';
import { RoutingService } from '../../../../data/helpers/routing.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CurrencyService } from '../../../../data/services/currency.service';
import { PackagesManagerService } from '../../../../data/services/administrator/packages-manager.service';

@Component({
  selector: 'app-edit-package',
  templateUrl: './edit-package.component.html',
  styleUrls: ['./edit-package.component.scss']
})
export class EditPackageComponent implements OnInit {
  package: any;
  isLoading = false;
  currency: any;

  form = new FormGroup({
    id: new FormControl('', []),
    name: new FormControl('', [
      // Validators.required,
    ]),
    amount: new FormControl('', [
      // Validators.required,
    ]),
    roi: new FormControl('', [
      Validators.required,
    ]),
    duration: new FormControl('', [
      Validators.required,
    ]),
    automated: new FormControl('', [
      // Validators.required,
    ]),
    support: new FormControl('', [
      // Validators.required
    ]),
    status: new FormControl('', [
      Validators.required
    ]),
     qualification: new FormControl('', [
      // Validators.required
    ]),
    amount_spent: new FormControl('', [
      // Validators.required
    ]),
    max_amount: new FormControl('', [
      // Validators.required
    ]),
    min_amount: new FormControl('', [
      Validators.required
    ]),
  });

  constructor(
    private configService: ConfigService,
    private route: ActivatedRoute,
    private routingService: RoutingService,
    private packagesManagerService: PackagesManagerService,
    private currencyService: CurrencyService
  ) { }


  get adminUrl() {
    return this.configService.adminURL;
  }

  ngOnInit() {
    // tslint:disable-next-line: radix
    const id  = parseInt(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getPackageContent(id);
    } else {
      this.routingService.replace([
        '/' + this.adminUrl + '/packages-manager'
      ]);
    }
    this.getCurrency();
  }

  private getCurrency() {
    this.currencyService.getCurrency.subscribe(res => {
      this.currency = res;
    });
  }

  private getPackageContent(id: number) {
    this.packagesManagerService.getPackages().subscribe(res => {
      if (res) {
        const data = res.filter(cont => cont.id === id)[0];
        if (data) {
          this.package = data;
          this.form.get('id').setValue(data.id);
          this.form.get('name').setValue(data.name);
          this.form.get('amount').setValue(data.amount);
          this.form.get('roi').setValue(data.roi);
          this.form.get('duration').setValue(data.duration);
          this.form.get('automated').setValue(data.automated);
          this.form.get('support').setValue(data.support);
          this.form.get('qualification').setValue(data.qualification);
          this.form.get('amount_spent').setValue(data.amount_spent);
          this.form.get('min_amount').setValue(data.min_amount);
          this.form.get('max_amount').setValue(data.max_amount);
          this.form.get('status').setValue(data.status);
        }
      }
    });
  }

  submit() {
    this.isLoading = true;
    const data = JSON.stringify(this.form.value);
    this.packagesManagerService.updatePackage(data).subscribe(res => {
      if (res) {
        alert('Pakage successfully updated');
      } else {
        alert('Oops! we could not update your request.');
      }
      this.isLoading = false;
    });
  }

}
