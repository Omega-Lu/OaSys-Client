import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CreditApplication } from '../../models/Credit-application.model';
import { CreditApplicationService } from '../../_services/credit-application.service';

@Component({
  selector: 'app-view-debtors-account',
  templateUrl: './view-debtors-account.component.html',
  styleUrls: ['./view-debtors-account.component.css']
})
export class ViewDebtorsAccountComponent implements OnInit {
  @Output() return = new EventEmitter<string>();
  creditApplications: CreditApplication[] = [];
  searchText: string = '';
  constructor(private creditApplicationService: CreditApplicationService) { }

  ngOnInit(): void {
    this.getAllCreditApplications()
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

  Return(){
    this.return.emit('false')
  }

}
