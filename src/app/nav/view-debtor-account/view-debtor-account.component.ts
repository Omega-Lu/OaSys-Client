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

  customerAccountsTemp: CustomerAccount[] = [];
  customerAccounts: CustomerAccount[] = [];
  customerAccount: CustomerAccount;

  viewAccount: boolean = false;
  searchText: string = '';

  constructor(private customerAccountService: CustomerAccountService) {}

  async ngOnInit() {
    this.getAllCustomerAccounts();
    await this.sleep(150);

    this.customerAccountsTemp = this.customerAccounts;
  }

  getAllCustomerAccounts() {
    this.customerAccountService
      .getAllCustomerAccounts()
      .subscribe((response) => {
        this.customerAccounts = response;
        console.log(this.customerAccounts);
      });
  }

  sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  Search() {
    this.customerAccountsTemp = this.customerAccounts;
    console.log(this.searchText);
    if (this.searchText !== '') {
      let searchValue = this.searchText;
      console.log(searchValue);
      this.customerAccountsTemp = this.customerAccountsTemp.filter(
        (customerAccount) => {
          console.log(customerAccount.name.match(searchValue));
          return customerAccount.name.match(searchValue);
        }
      );
      console.log(this.customerAccounts);
    } else {
      this.customerAccountsTemp = this.customerAccounts;
    }
  }

  Return() {
    this.return.emit('false');
  }

  back() {
    this.viewAccount = false;
  }

  populateForm(customerAccount: CustomerAccount) {
    this.customerAccount = customerAccount;
  }
}
