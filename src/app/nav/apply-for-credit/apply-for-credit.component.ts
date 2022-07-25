import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CreditApplication } from '../../models/Credit-application.model';

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
  categorySelected: boolean = false;

  Gauteng: boolean = false;
  Northen: boolean = false;
  NorthWest: boolean = false;
  Mpumalanga: boolean = false;
  Limpopo: boolean = false;
  Western: boolean = false;
  Eastern: boolean = false;
  KwaZulu: boolean = false;
  State: boolean = false;

  CreditApplication: CreditApplication = {
    customeR_ACCOUNT_ID: 0,
    name: '',
    surname: '',
    email: '',
    contacT_NUMBER: 0,
    accounT_STATUS_ID: 0,
    provincE_ID: 0,

  }

  constructor() { }

  ngOnInit(): void {
  }

  Return(){
    this.return.emit('false')
  }

}
