import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PackagesManagerService } from '../../../../data/services/administrator/packages-manager.service';
import { ConfigService } from '../../../../data/services/config.service';
import { CurrencyService } from '../../../../data/services/currency.service';
import { RoutingService } from '../../../../data/helpers/routing.service';

@Component({
  selector: 'app-add-package',
  templateUrl: './add-package.component.html',
  styleUrls: ['./add-package.component.scss']
})
export class AddPackageComponent implements OnInit {

  isLoading = false;
  currency: any;

  form = new FormGroup({
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
    private packagesManagerService: PackagesManagerService,
    private configService: ConfigService,
    private currencyService: CurrencyService,
    private routingService: RoutingService
  ) { }

  ngOnInit() {
    this.getCurrency()
  }

  get adminUrl() {
    return this.configService.adminURL;
  }

  private getCurrency() {
    this.currencyService.getCurrency.subscribe(res => {
      this.currency = res;
    });
  }

  submit() {
    this.isLoading = true;
    const data = JSON.stringify(this.form.value);
    this.packagesManagerService.addPackage(data).subscribe(res => {
      if (res) {
        alert('Pakage successfully added');
        this.routingService.replace([
          '/' + this.adminUrl + '/packages-manager'
        ]);
        this.form.reset();
      } else {
        alert('Oops! we could not update your request.');
      }
      this.isLoading = false;
    });
  }

}

