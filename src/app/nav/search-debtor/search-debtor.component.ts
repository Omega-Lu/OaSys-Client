import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DebtorService } from '../../_services/debtor.service';
import { Debtor } from '../../models/debtor.model';

@Component({
  selector: 'app-search-debtor',
  templateUrl: './search-debtor.component.html',
  styleUrls: ['./search-debtor.component.css']
})
export class SearchDebtorComponent implements OnInit {
  @Output() return = new EventEmitter<string>();
  debtors: Debtor[] = []
  searchText: string = ''
  constructor(private debtorService: DebtorService) { }

  ngOnInit(): void {
  }

  getAllDebtors() {
    this.debtorService.getAllDebtors()
    .subscribe(
      response => {
        this.debtors = response;
        console.log(this.debtors);
      }
    );
  }

  Search() {
    if(this.searchText !== ""){
      let searchValue = this.searchText
      console.log(searchValue);
      this.debtors = this.debtors.filter((debtor) =>{
        console.log(debtor.name.match(searchValue));
        return debtor.name.match(searchValue);

            });
          }
    else {
      this.getAllDebtors();
    }
  }

  Return(){
    this.return.emit("false");
  }

}
