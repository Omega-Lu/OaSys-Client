import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DebtorService } from '../../_services/debtor.service';
import { Debtor } from '../../models/debtor.model';
import { CreditApplicationService } from '../../_services/credit-application.service';
import { CreditApplication } from '../../models/Credit-application.model';

@Component({
  selector: 'app-search-debtor',
  templateUrl: './search-debtor.component.html',
  styleUrls: ['./search-debtor.component.css'],
})
export class SearchDebtorComponent implements OnInit {
  @Output() return = new EventEmitter<string>();
  debtors: Debtor[] = [];
  creditApplications: CreditApplication[] = []
  searchText: string = '';
  constructor(private debtorService: DebtorService, private creditApplicationService : CreditApplicationService) {}

  ngOnInit(): void {
    this.getAllDebtors();
    this.getAllCreditApplications();
  }

  getAllCreditApplications(){
    this.creditApplicationService.getAllCreditApplications().subscribe((response)=>{
      this.creditApplications = response;
      console.log(this.creditApplications)
    })
  }
  getAllDebtors() {
    this.debtorService.getAllDebtors().subscribe((response) => {
      this.debtors = response;
      console.log(this.debtors);
    });
  }

  Search() {
    if (this.searchText !== '') {
      let searchValue = this.searchText;
      console.log(searchValue);
      this.debtors = this.debtors.filter((debtor) => {
        console.log(debtor.name.match(searchValue));
        return debtor.name.match(searchValue);
      });
    } else {
      this.getAllDebtors();
    }
  }

  Return() {
    this.return.emit('false');
  }
}
