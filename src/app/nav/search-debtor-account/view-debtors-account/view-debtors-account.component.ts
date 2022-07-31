import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Debtor } from 'src/app/models/debtor.model';
import { DebtorService } from 'src/app/_services/debtor.service';
import { CreditApplicationService } from '../../../_services/credit-application.service';
import { CreditApplication } from 'src/app/models/Credit-application.model';

@Component({
  selector: 'app-view-debtors-account',
  templateUrl: './view-debtors-account.component.html',
  styleUrls: ['./view-debtors-account.component.css']
})
export class ViewDebtorsAccountComponent implements OnInit {
  @Input() debtor: Debtor
  @Input() creditApplication: CreditApplication
  @Output() return = new EventEmitter<string>();
  debtors: Debtor[] = [];
  creditApplications: CreditApplication[] = []
  searchText: string = '';
  successSubmit : boolean = false;

  nDetails: boolean = true;
  sDetails: boolean = true;
  eDetails: boolean = true;
  cnDetails: boolean = true;
  crDetails: boolean = true;
  cdetails: boolean = true;
  adetails: boolean = true;

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
  constructor(private debtorService: DebtorService, private creditApplicationService: CreditApplicationService) { }

  ngOnInit(): void {
    this.getAllCreditApplications();
    this.getAllDebtors();
  }

  onSubmit(){

  }

  getAllDebtors(){
    this.debtorService.getAllDebtors().subscribe((response)=>{
      this.debtors = response;
    })
  }

  getAllCreditApplications(){
    this.creditApplicationService.getAllCreditApplications().subscribe((response)=>{
      this.creditApplications = response;
    })
  }

  Search(){
    if (this.searchText !== '') {
      let searchValue = this.searchText;
      console.log(searchValue);
      this.creditApplications = this.creditApplications.filter((creditApplication) => {
        console.log(creditApplication.name.match(searchValue));
        return creditApplication.name.match(searchValue);
      });
    } else {
      this.getAllCreditApplications();
    }
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

