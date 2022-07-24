import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Debtor } from '../../models/debtor.model';
import { DebtorService } from '../../_services/debtor.service';

@Component({
  selector: 'app-credit-application',
  templateUrl: './credit-application.component.html',
  styleUrls: ['./credit-application.component.css']
})
export class CreditApplicationComponent implements OnInit {
  @Output() return = new EventEmitter<string>()
  debtors: Debtor[] = []
  debtor: Debtor;
  searchText : any = ''
  model: any;
  approveCredit: boolean = false;

  constructor(private debtorService: DebtorService) { }

  ngOnInit(): void {
    this.getAllDebtors();
  }

  populateForm(debtor: Debtor){
    this.debtor = debtor
  }

  getAllDebtors(){
    this.debtorService.getAllDebtors().subscribe((response) => {
      this.debtors = response;
      console.log(this.debtor);
    })
  }

  Search() {
      if(this.searchText !== ""){
        let searchValue = this.searchText
        console.log(searchValue);
        this.debtors = this.debtors.filter((debtor) =>{
          console.log(debtor.name.match(searchValue));
          return debtor.name.match(searchValue)
        });
        console.log(this.debtor)
      }
      else{
        this.getAllDebtors();
      }
  }

  back(){
    this.return.emit('false');
  }

}
