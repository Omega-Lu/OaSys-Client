import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Debtor } from 'src/app/models/debtor.model';
import { DebtorService } from '../../../_services/debtor.service';

@Component({
  selector: 'app-add-debtor',
  templateUrl: './add-debtor.component.html',
  styleUrls: ['./add-debtor.component.css'],
})
export class AddDebtorComponent implements OnInit {
  @Output() return = new EventEmitter<string>();
  nDetails: boolean = true;
  sDetails: boolean = true;
  eDetails: boolean = true;
  cnDetails: boolean = true;
  crDetails: boolean = true;
  cdetails: boolean = true;
  adetails: boolean = true;
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

  categorySelected: boolean = false;

  debtor: Debtor = {
    customeR_ACCOUNT_ID: 0,
    name: '',
    surname: '',
    email: '',
    contacT_NUMBER: 0,
    crediT_LIMIT: 0,
    accounT_STATUS_ID: 0,
    provincE_ID: 0,
    amounT_OWING: 0,
    remindeR_MESSAGE: '',
  };

  constructor(private debtorService: DebtorService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.debtorService.addAllDebtors(this.debtor).subscribe((response) => {
      console.log(response);
    });
    this.successSubmit = true;
  }

  nameValidate() {
    var matches = this.debtor.name.match(/\d+/g);
    if (matches != null) {
      this.nDetails = false;
    } else if (this.debtor.name == '') {
      this.nDetails = false;
    } else {
      this.nDetails = true;
    }
  }

  surnameValidate() {
    var matches = this.debtor.surname.match(/\d+/g);
    if (matches != null) {
      this.sDetails = false;
    } else if (this.debtor.surname == '') {
      this.sDetails = false;
    } else {
      this.sDetails = true;
    }
  }

  emailValidate() {
    if (this.debtor.email == '') {
      this.eDetails = false;
    } else {
      this.eDetails = true;
    }
  }

  Return() {
    this.return.emit('false');
  }

  Contactvalidate() {
    if (this.debtor.contacT_NUMBER < 1) {
      this.cdetails = false;
    } else {
      this.cdetails = true;
    }
  }

  Provalidate() {
    if (this.debtor.provincE_ID < 1) {
      this.adetails = false;
    } else {
      this.adetails = true;
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
}
