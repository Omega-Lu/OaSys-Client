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

  deletee(delet: any) {
    this.deleteNumber = delet;
  }

  getAllDebtors() {
    this.debtorService.getAllDebtors().subscribe((response) => {
      this.debtors = response;
      this.debtorsTemp = response;
    });
  }

  deleteDebtor() {
    this.debtorService.deleteDebtor(this.deleteNumber).subscribe((response) => {
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
