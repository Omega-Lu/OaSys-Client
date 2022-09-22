import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DebtorService } from '../../../_services/debtor.service';
import { Debtor } from '../../../models/debtor.model';

@Component({
  selector: 'app-search-debtor',
  templateUrl: './search-debtor.component.html',
  styleUrls: ['./search-debtor.component.css'],
})
export class SearchDebtorComponent implements OnInit {
  @Output() return = new EventEmitter<string>();

  //debtor
  debtors: Debtor[] = [];
  debtorsTemp: Debtor[] = [];

  searchText: string = '';
  constructor(private debtorService: DebtorService) {}

  ngOnInit(): void {
    this.getAllDebtors();
  }

  getAllDebtors() {
    this.debtorService.getAllDebtors().subscribe((response) => {
      response = response.filter((debtor) => {
        return debtor.deleted == false;
      });
      this.debtors = response;
      this.debtorsTemp = response;
    });
  }

  Search() {
    this.debtorsTemp = this.debtors;
    if (this.searchText !== '') {
      this.debtorsTemp = this.debtorsTemp.filter((debtor) => {
        return (
          debtor.name.match(this.searchText) ||
          debtor.surname.match(this.searchText)
        );
      });
    }
  }

  Return() {
    this.return.emit('false');
  }
}
