import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { OtherManagerService } from '../../../../data/services/administrator/other-manager.service';
import { ConfigService } from '../../../../data/services/config.service';

@Component({
  selector: 'app-bank-account-info',
  templateUrl: './bank-account-info.component.html',
  styleUrls: ['./bank-account-info.component.scss']
})
export class BankAccountInfoComponent implements OnInit {
  more: FormArray;
  form: FormGroup;
  isAdding = false;
  success: any;

  get moreFormGroup() {
    return this.form.get('mores') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private otherManagerService: OtherManagerService,
    private configService: ConfigService,
  ) { }

  ngOnInit() {
    this.getBankDetails();
    this.formHandler();
  }

  get adminUrl() {
    return this.configService.adminURL;
  }

  createMore(): FormGroup {
    return this.fb.group({
      account_name: [null],
      account_number: [null],
      bank_name: [null],
      account_type: [null],
      payment_instruction: [null]
    });
  }

  updateMore(obj): FormGroup {
    return this.fb.group({
      account_name: obj.account_name,
      account_number: obj.account_number,
      bank_name: obj.bank_name,
      account_type: obj.account_type,
      payment_instruction: obj.payment_instruction
    });
  }

  addMore() {
    this.more.push(this.createMore());
  }

  remove(index) {
    const x = 'Are you sure you want to REMOVE this?';
    if (confirm(x)) {
      this.more.removeAt(index);
    }
  }

  private formHandler() {
    this.form = this.fb.group({
      mores: this.fb.array([this.createMore()])
    });
    this.more = this.form.get('mores') as FormArray;
  }

  submit() {
    this.isAdding = true;
    const data = JSON.stringify(this.form.value.mores);
    this.otherManagerService.bank_details_update(data, 1)
    .subscribe(res => {
      if (res.status === 'success') {
        this.getBankDetails();
        this.success = 'Updated successfully!';
        alert('Success! your request has been updated successfully.');
      } else {
        this.success = null;
        alert('Oops! Something went wrong, we could not update your request');
      }
      this.isAdding = false;
    });
  }

  private getBankDetails() {
    this.otherManagerService.getBankDetails().subscribe(res => {
      if (res.status === 'success') {
        const data = res.data;
        if (data.length > 0) {
          this.more.removeAt(0);
        }
        let i;
        for (i = 0; i < data.length; i++) {
          this.more.push(this.updateMore(data[i]));
        }
      }
    });
  }

}
