import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DebtorService } from 'src/app/_services/debtor.service';
import { Debtor } from 'src/app/models/debtor.model';

@Component({
  selector: 'app-update-debtor',
  templateUrl: './update-debtor.component.html',
  styleUrls: ['./update-debtor.component.css'],
})
export class UpdateDebtorComponent implements OnInit {
  @Input() debtor: Debtor;

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

  successSubmit: boolean = false;
  constructor(private debtorService: DebtorService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.debtorService.updateDebtor(this.debtor).subscribe((response) => {
      console.log(response);
      this.successSubmit = true;
    });
  }

  namevalidate() {
    var matches = this.debtor.name.match(/\d+/g);
    if (matches != null) {
      this.nDetails = false;
    } else if (this.debtor.name == '') {
      this.nDetails = false;
    } else {
      this.nDetails = true;
    }
  }

  survalidate() {
    var matches = this.debtor.surname.match(/\d+/g);
    if (matches != null) {
      this.sDetails = false;
    } else if (this.debtor.surname == '') {
      this.sDetails = false;
    } else {
      this.sDetails = true;
    }
  }

  emailvalidate() {
    if (this.debtor.email == '') {
      this.eDetails = false;
    } else {
      this.eDetails = true;
    }
  }

  /*titlevalidate() {
    var matches = this.debtor.title.match(/\d+/g);
    if (matches != null) {
     this.tdetails = false;
    } else if (this.employee.title == '') {
     this.tdetails = false;
    } else {
      this.tdetails = true;
    }
  }*/

  /*addressvalidate() {
  if (this.debtor.address == '') {
     this.adetails = false;
    } else {
      this.adetails = true;
    }
  }*/

  Return() {
    this.return.emit('false');
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
