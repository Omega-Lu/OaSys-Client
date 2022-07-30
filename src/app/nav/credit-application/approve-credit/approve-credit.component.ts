import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Debtor } from '../../../models/debtor.model';
import { CreditApplication } from '../../../models/Credit-application.model';

@Component({
  selector: 'app-approve-credit',
  templateUrl: './approve-credit.component.html',
  styleUrls: ['./approve-credit.component.css']
})
export class ApproveCreditComponent implements OnInit {

  @Input() creditApplication: CreditApplication
  @Output() return = new EventEmitter<string>();
  nDetails: boolean = true;
  sDetails: boolean = true;
  eDetails: boolean = true;
  cnDetails: boolean = true;
  aDetails: boolean = true;

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

  successSubmit : boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  Return(){

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
