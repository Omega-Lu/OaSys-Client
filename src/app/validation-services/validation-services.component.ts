import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-validation-services',
  templateUrl: './validation-services.component.html',
  styleUrls: ['./validation-services.component.css'],
})
export class ValidationServicesComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  regexIDNumber =
    /(((\d{2}((0[13578]|1[02])(0[1-9]|[12]\d|3[01])|(0[13456789]|1[012])(0[1-9]|[12]\d|30)|02(0[1-9]|1\d|2[0-8])))|([02468][048]|[13579][26])0229))(( |-)(\d{4})( |-)(\d{3})|(\d{7}))/;

  ValidateIDNumber(num): boolean {
    if (this.regexIDNumber.test(num)) {
      return true;
    } else {
      return false;
    }
  }

  regexContactNumber = /[1-9][0-9]{8}$/;

  ValidateContactNumber(num): boolean {
    if (this.regexContactNumber.test(num)) {
      return true;
    } else {
      return false;
    }
  }

  regexString = /\d/;

  ValidateString(input): boolean {
    if (this.regexString.test(input)) {
      return false;
    } else if (input == '' || input == null) {
      return false;
    } else {
      return true;
    }
  }

  regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  ValidateEmail(email): boolean {
    if (this.regexEmail.test(email)) {
      return true;
    } else {
      return false;
    }
  }
}
