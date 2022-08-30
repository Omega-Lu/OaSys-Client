import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CustomerApplication } from 'src/app/models/CustomerApplication.model';
import { CustomerApplicationService } from 'src/app/_services/CustomerApplication.service';
import { CustomerAccount } from 'src/app/models/Customer-account.model';
import { CustomerAccountService } from 'src/app/_services/customer-account.service';
import { AccountStatus } from 'src/app/models/AccountStatus.model';
import { AccountStatusService } from 'src/app/_services/AccountStatus.service';

@Component({
  selector: 'app-view-credit-account',
  templateUrl: './view-credit-account.component.html',
  styleUrls: ['./view-credit-account.component.css'],
})
export class ViewCreditAccountComponent implements OnInit {
  @Input() customerApplication: CustomerApplication;
  @Output() return = new EventEmitter<string>();

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

  accountStatus: AccountStatus = {
    accountStatusID: 0,
    descrption: '',
  };
  accountStatusses: AccountStatus[] = [];
  accountStatussesTemp: AccountStatus[] = [];

  customerAccount: CustomerAccount = {
    customeR_ACCOUNT_ID: 0,
    accounT_STATUS_ID: 0,
    provincE_ID: 0,
    name: '',
    surname: '',
    email: '',
    contacT_NUMBER: 0,
    amounT_OWING: 0,
    crediT_LIMIT: 0,
    remindeR_MESSAGE: '',
  };

  constructor(
    private customerApplicationService: CustomerApplicationService,
    private accountStatusService: AccountStatusService,
    private customerAccountService: CustomerAccountService
  ) {}

  ngOnInit(): void {
    this.categorySelect(this.customerApplication.provinceID);
    this.getAllAccountStatusses();
  }

  getAllAccountStatusses() {
    this.accountStatusService.getAllAccountStatusses().subscribe((response) => {
      this.accountStatusses = response;
      console.log(this.accountStatusses);
    });
  }

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

      this.customerApplication.accountStatusID = 1;
      this.customerApplicationService
        .updateCustomerApplication(this.customerApplication)
        .subscribe((response) => {
          console.log(response);
        });

      this.customerAccount.accounT_STATUS_ID =
        this.customerApplication.accountStatusID;
      this.customerAccount.provincE_ID = this.customerApplication.provinceID;
      this.customerAccount.name = this.customerApplication.name;
      this.customerAccount.surname = this.customerApplication.surname;
      this.customerAccount.email = this.customerApplication.email;
      this.customerAccount.contacT_NUMBER =
        this.customerApplication.contactNumber;
      this.customerAccount.crediT_LIMIT = this.customerApplication.creditLimit;

      this.customerAccountService
        .addCustomerAccount(this.customerAccount)
        .subscribe((response) => {
          console.log(response);
          this.successSubmit = true;
        });
    }
  }

  sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  async Decilne() {

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

      this.customerApplication.accountStatusID = 2;
      this.customerApplicationService
        .updateCustomerApplication(this.customerApplication)
        .subscribe((response) => {
          console.log(response);
        });
      this.successSubmit = true;

      // this.customerAccount.accounT_STATUS_ID =
      //   this.customerApplication.accountStatusID;
      // this.customerAccount.provincE_ID = this.customerApplication.provinceID;
      // this.customerAccount.name = this.customerApplication.name;
      // this.customerAccount.surname = this.customerApplication.surname;
      // this.customerAccount.email = this.customerApplication.email;
      // this.customerAccount.crediT_LIMIT = this.customerApplication.creditLimit;

      // this.customerAccountService
      //   .addCustomerAccount(this.customerAccount)
      //   .subscribe((response) => {
      //     console.log(response);
      //   });
    }
  }
}
