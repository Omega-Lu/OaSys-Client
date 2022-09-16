import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CustomerAccount } from 'src/app/models/Customer-account.model';
import { CustomerAccountService } from 'src/app/_services/customer-account.service';

@Component({
  selector: 'app-view-debtor-account',
  templateUrl: './view-debtor-account.component.html',
  styleUrls: ['./view-debtor-account.component.css'],
})
export class ViewDebtorAccountComponent implements OnInit {
  @Output() return = new EventEmitter<string>();

  //customer accounts
  customerAccount: CustomerAccount;
  customerAccounts: CustomerAccount[] = [];
  customerAccountsTemp: CustomerAccount[] = [];

  updateDebtor: boolean = false;

  viewAccount: boolean = false;
  searchText: string = '';

  constructor(private customerAccountService: CustomerAccountService) {}

  async ngOnInit() {
    this.getDebtors();
  }

  getDebtors() {
    this.customerAccountService
      .getAllCustomerAccounts()
      .subscribe((response) => {
        this.customerAccounts = response;
        this.customerAccountsTemp = this.customerAccounts;
      });
  }

  Search() {
    this.customerAccountsTemp = this.customerAccounts;
    if (this.searchText !== '') {
      this.customerAccountsTemp = this.customerAccountsTemp.filter(
        (customerAccount) => {
          return (
            customerAccount.name.match(this.searchText) ||
            customerAccount.surname.match(this.searchText)
          );
        }
      );
    }
  }

  Return() {
    this.return.emit('false');
  }

  back() {
    this.updateDebtor = false;
    this.getDebtors();
  }

  populateForm(customerAccount: CustomerAccount) {
    this.customerAccount = customerAccount;
    this.updateDebtor = true;
  }
}
