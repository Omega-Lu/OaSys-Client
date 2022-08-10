import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { CustomerAccount } from 'src/app/models/Customer-account.model';
import { CustomerAccountService } from 'src/app/_services/customer-account.service';

@Component({
  selector: 'app-view-approved-accounts',
  templateUrl: './view-approved-accounts.component.html',
  styleUrls: ['./view-approved-accounts.component.css'],
})
export class ViewApprovedAccountsComponent implements OnInit {
  @Input() customerAccount: CustomerAccount;
  @Output() return = new EventEmitter<string>();

  nameDetails: boolean = true;
  surnameDetails: boolean = true;
  emailDetails: boolean = true;
  contactDetails: boolean = true;
  creditDetails: boolean = true;
  provinceDetails: boolean = true;
  categorySelected: boolean = false;
  successSubmit: boolean = false;
  capturePayment: boolean = false;

  Gauteng: boolean = false;
  Northen: boolean = false;
  NorthWest: boolean = false;
  Mpumalanga: boolean = false;
  Limpopo: boolean = false;
  Western: boolean = false;
  Eastern: boolean = false;
  KwaZulu: boolean = false;
  State: boolean = false;

  constructor(private customerAccountService: CustomerAccountService) {}

  ngOnInit(): void {
    this.categorySelect(this.customerAccount.provincE_ID);
  }

  nameValidate() {
    var matches = this.customerAccount.name.match(/\d+/g);
    if (matches != null) {
      this.nameDetails = false;
    } else if (this.customerAccount.name == '') {
      this.nameDetails = false;
    } else {
      this.nameDetails = true;
    }
  }

  surnameValidate() {
    var matches = this.customerAccount.surname.match(/\d+/g);
    if (matches != null) {
      this.surnameDetails = false;
    } else if (this.customerAccount.surname == '') {
      this.surnameDetails = false;
    } else {
      this.surnameDetails = true;
    }
  }

  emailValidate() {
    if (this.customerAccount.email == '') {
      this.emailDetails = false;
    } else {
      this.emailDetails = true;
    }
  }

  Contactvalidate() {
    if (
      this.customerAccount.contacT_NUMBER < 1 ||
      this.customerAccount.contacT_NUMBER.toString().length < 9
    ) {
      this.contactDetails = false;
    } else {
      this.contactDetails = true;
    }
  }

  creditValidate() {
    if (
      this.customerAccount.crediT_LIMIT < 1 ||
      this.customerAccount.crediT_LIMIT == null
    ) {
      this.creditDetails = false;
    } else {
      this.creditDetails = true;
    }
  }

  Provalidate(id: number) {
    this.customerAccount.provincE_ID = id;
    console.log(this.customerAccount.provincE_ID + '   helloooooo   ');
    if (this.customerAccount.provincE_ID < 1) {
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
    this.Provalidate(this.customerAccount.provincE_ID);
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
      this.customerAccountService
        .updateCustomerAccount(this.customerAccount)
        .subscribe((response) => {
          console.log(response);
        });

      this.successSubmit = true;
    }
  }

  populateForm() {
    this.capturePayment = true;
  }
}
