import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CustomerApplication } from '../../../models/CustomerApplication.model';
import { CustomerApplicationService } from '../../../_services/CustomerApplication.service';

@Component({
  selector: 'app-apply-for-credit',
  templateUrl: './apply-for-credit.component.html',
  styleUrls: ['./apply-for-credit.component.css'],
})
export class ApplyForCreditComponent implements OnInit {
  @Output() return = new EventEmitter<string>();

  startOfScreen: boolean = false;
  nameDetails: boolean = true;
  surnameDetails: boolean = true;
  emailDetails: boolean = true;
  contactDetails: boolean = true;
  creditDetails: boolean = true;
  provinceDetails: boolean = true;
  categorySelected: boolean = false;
  successSubmit: boolean = false;

  Gauteng: boolean = false;
  Northen: boolean = false;
  NorthWest: boolean = false;
  Mpumalanga: boolean = false;
  Limpopo: boolean = false;
  Western: boolean = false;
  Eastern: boolean = false;
  KwaZulu: boolean = false;
  State: boolean = false;

  customerApplication: CustomerApplication = {
    customerApplicationID: 0,
    name: '',
    surname: '',
    email: '',
    contactNumber: 0,
    creditLimit: 0,
    accountStatusID: 0,
    provinceID: 0,
    cityID: 0,
  };

  constructor(private customerApplicationService: CustomerApplicationService) {}

  ngOnInit(): void {}

  nameValidate() {
    var matches = this.customerApplication.name.match(/\d+/g);
    if (matches != null) {
      this.nameDetails = false;
    } else if (this.customerApplication.name == '') {
      this.nameDetails = false;
    } else {
      this.nameDetails = true;
    }
  }

  surnameValidate() {
    var matches = this.customerApplication.surname.match(/\d+/g);
    if (matches != null) {
      this.surnameDetails = false;
    } else if (this.customerApplication.surname == '') {
      this.surnameDetails = false;
    } else {
      this.surnameDetails = true;
    }
  }

  emailValidate() {
    if (this.customerApplication.email == '') {
      this.emailDetails = false;
    } else {
      this.emailDetails = true;
    }
  }

  Contactvalidate() {
    if (
      this.customerApplication.contactNumber < 1 ||
      this.customerApplication.contactNumber.toString().length < 9
    ) {
      this.contactDetails = false;
    } else {
      this.contactDetails = true;
    }
  }

  creditValidate() {
    if (
      this.customerApplication.creditLimit < 1 ||
      this.customerApplication.creditLimit == null
    ) {
      this.creditDetails = false;
    } else {
      this.creditDetails = true;
      this.startOfScreen = true;
    }
  }

  Provalidate(id: number) {
    this.customerApplication.provinceID = id;
    console.log(this.customerApplication.provinceID + '   helloooooo   ');
    if (this.customerApplication.provinceID < 1) {
      this.provinceDetails = false;
    } else {
      this.provinceDetails = true;
    }
  }

  categorySelect(id: number) {
    console.log(id);
    this.categorySelected = true;
    console.log(this.categorySelected);
    this.Gauteng = false;
    this.Northen = false;
    this.NorthWest = false;
    this.Mpumalanga = false;
    this.Limpopo = false;
    this.Western = false;
    this.Eastern = false;
    this.KwaZulu = false;
    this.State = false;
    if (id == 1) {
      this.Gauteng = true;
    }
    if (id == 2) {
      this.Northen = true;
    }
    if (id == 3) {
      this.NorthWest = true;
    }
    if (id == 4) {
      this.Mpumalanga = true;
    }
    if (id == 5) {
      this.Limpopo = true;
    }
    if (id == 6) {
      this.Western = true;
    }
    if (id == 7) {
      this.Eastern = true;
    }
    if (id == 8) {
      this.KwaZulu = true;
    }
    if (id == 9) {
      this.State = true;
    }
  }

  Return() {
    this.return.emit('false');
  }

  onSubmit() {
    this.nameValidate();
    this.surnameValidate();
    this.Contactvalidate();
    this.emailValidate();
    this.Provalidate(this.customerApplication.provinceID);
    this.creditValidate();

    if (
      !this.nameDetails ||
      !this.surnameDetails ||
      !this.emailDetails ||
      !this.contactDetails ||
      !this.creditDetails
    ) {
      console.log('if statement true');
    } else {
      console.log('if statement false');
      this.customerApplicationService
        .addCustomerApplication(this.customerApplication)
        .subscribe((response) => {
          console.log(response);
          this.successSubmit = true;
        });
    }
  }
}
