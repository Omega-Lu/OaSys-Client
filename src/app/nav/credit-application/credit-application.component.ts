import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Debtor } from '../../models/debtor.model';
import { DebtorService } from '../../_services/debtor.service';
import { CreditApplication } from 'src/app/models/Credit-application.model';
import { CreditApplicationService } from '../../_services/credit-application.service';

@Component({
  selector: 'app-credit-application',
  templateUrl: './credit-application.component.html',
  styleUrls: ['./credit-application.component.css']
})
export class CreditApplicationComponent implements OnInit {
  @Output() return = new EventEmitter<string>()
  creditApplications: CreditApplication[] = []
  creditApplication: CreditApplication;
  searchText : any = ''
  model: any;
  categorySelected: boolean = false;
  nameDetails: boolean = true;
  surnameDetails: boolean = true;
  emailDetails: boolean = true;
  contactDetails: boolean = true;
  creditDetails: boolean = true;
  provinceDetails: boolean = true;

  Gauteng: boolean = false;
  Northen: boolean = false;
  NorthWest: boolean = false;
  Mpumalanga: boolean = false;
  Limpopo: boolean = false;
  Western: boolean = false;
  Eastern: boolean = false;
  KwaZulu: boolean = false;
  State: boolean = false;
  approveCredit: boolean = false;

  constructor(private creditApplicationService: CreditApplicationService) { }

  ngOnInit(): void {
    this.getAllCreditApplications();
  }

  populateForm(creditApplication: CreditApplication){
    this.creditApplication = creditApplication
  }

  getAllCreditApplications(){
    this.creditApplicationService.getAllCreditApplications().subscribe((response) => {;
      this.creditApplications = response;
      console.log(this.creditApplication);
    })
  }

  Search() {
      if(this.searchText !== ""){
        let searchValue = this.searchText
        console.log(searchValue);
        this.creditApplications = this.creditApplications.filter((creditApplication) =>{
          console.log(creditApplication.name.match(searchValue));
          return creditApplication.name.match(searchValue)
        });
        console.log(this.creditApplication)
      }
      else{
        this.getAllCreditApplications();
      }
  }

  namevalidate() {
    var matches = this.creditApplication.name.match(/\d+/g);
    if (matches != null) {
     this.nameDetails = false;
    } else if (this.creditApplication.name == '') {
     this.nameDetails = false;
    } else {
      this.nameDetails = true;
    }
  }

  survalidate() {
    var matches = this.creditApplication.surname.match(/\d+/g);
    if (matches != null) {
     this.surnameDetails = false;
    } else if (this.creditApplication.surname == '') {
     this.surnameDetails = false;
    } else {
      this.surnameDetails = true;
    }
  }

  emailvalidate() {
 if (this.creditApplication.email == '') {
     this.emailDetails = false;
    } else {
      this.emailDetails = true;
    }
  }



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
