import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Debtor } from 'src/app/models/debtor.model';
import { DebtorService } from 'src/app/_services/debtor.service';

@Component({
  selector: 'app-maintain-debtor',
  templateUrl: './maintain-debtor.component.html',
  styleUrls: ['./maintain-debtor.component.css'],
})
export class MaintainDebtorComponent implements OnInit {
  @Output() return = new EventEmitter<string>();

  //debtor
  debtor: Debtor;
  debtors: Debtor[] = [];
  debtorsTemp: Debtor[] = [];

  successDelete: boolean = false;
  model: any;
  delete: boolean = false;
  searchText: any = '';
  updateDebtor: boolean = false;
  deleteNumber: any;
  constructor(private debtorService: DebtorService) {}

  ngOnInit() {
    this.getAllDebtors();
  }

  getAllDebtors() {
    this.debtorService.getAllDebtors().subscribe((response) => {
      response = response.filter((debtor) => {
        return debtor.deleted == false;
      });
      this.debtors = response;
      this.debtorsTemp = response;
      console.log('this is all the debtors');
      console.log(response);
    });
  }

  deletee(delet: any) {
    this.debtor = delet;
    this.OutstandingMoney();
  }

  hasDebt: boolean = false;

  OutstandingMoney() {
    if (this.debtor.amounT_OWING > 0) {
      this.hasDebt = true;
    } else {
      this.hasDebt = false;
    }
  }

  deleteDebtor() {
    this.debtor.deleted = true;
    this.debtorService.updateDebtor(this.debtor).subscribe((response) => {
      console.log('this is the deleted debtor');
      console.log(response);
      this.getAllDebtors();
      this.successDelete = true;
    });
  }

  populateForm(debtor: Debtor) {
    this.debtor = debtor;
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

  back() {
    this.return.emit('false');
  }
}
