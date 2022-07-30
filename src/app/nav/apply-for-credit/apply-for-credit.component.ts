import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CreditApplication } from '../../models/Credit-application.model';
import { CreditApplicationService } from '../../_services/credit-application.service';

@Component({
  selector: 'app-apply-for-credit',
  templateUrl: './apply-for-credit.component.html',
  styleUrls: ['./apply-for-credit.component.css']
})
export class ApplyForCreditComponent implements OnInit {
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

  creditApplication: CreditApplication = {
    customeR_ACCOUNT_ID: 0,
    name: '',
    surname: '',
    email: '',
    contacT_NUMBER: 0,
    crediT_LIMIT: 0,
    accounT_STATUS_ID: 0,
    provincE_ID: 0,

  }

  constructor(private creditApplicationService : CreditApplicationService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.creditApplicationService.addCreditApplication(this.creditApplication).subscribe((response) => {
      console.log(response);
    });
    this.successSubmit = true;
  }

  nameValidate(){
    var matches = this.creditApplication.name.match(/\d+/g)
    if (matches != null) {
      this.nameDetails = false;
    }else if (this.creditApplication.name == '') {
      this.nameDetails = false;
    }else{
      this.nameDetails = true;
    }
  }

    surnameValidate() {
      var matches = this.creditApplication.surname.match(/\d+/g);
      if (matches != null) {
        this.surnameDetails = false;
      } else if (this.creditApplication.surname == '') {
        this.surnameDetails = false;
      } else {
        this.surnameDetails = true;
      }
    }

    emailValidate() {
      if (this.creditApplication.email == '') {
        this.emailDetails = false;
      } else {
        this.emailDetails = true;
      }
    }

    Contactvalidate() {
      if (this.creditApplication.contacT_NUMBER < 1) {
        this.contactDetails = false;
      } else {
        this.contactDetails = true;
      }
    }

    Provalidate() {
      if (this.creditApplication.provincE_ID < 1) {
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

  Return(){
    this.return.emit('false')
  }

}
