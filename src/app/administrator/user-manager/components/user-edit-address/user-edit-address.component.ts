import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-edit-address',
  templateUrl: './user-edit-address.component.html',
  styleUrls: ['./user-edit-address.component.scss']
})
export class UserEditAddressComponent implements OnInit {

  
  adminEditAddress = new FormGroup({
    full_name: new FormControl('', []),
    phone: new FormControl('', []),
    street_addr: new FormControl('', []),
    city: new FormControl('', []),
    state: new FormControl('', []),
    country: new FormControl('', []),
  });

  submit(){
    console.log(this.adminEditAddress.value);
  }

  constructor() { }

  ngOnInit() {
  }

}
