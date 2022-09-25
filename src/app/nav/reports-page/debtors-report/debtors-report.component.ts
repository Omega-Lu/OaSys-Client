import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CurrentUser } from 'src/app/models/CurrentUser.model';
import { CurrentUserService } from 'src/app/_services/CurrentUser.service';
import { CustomerAccount } from 'src/app/models/Customer-account.model';
import { CustomerAccountService } from 'src/app/_services/customer-account.service';

@Component({
  selector: 'app-debtors-report',
  templateUrl: './debtors-report.component.html',
  styleUrls: ['./debtors-report.component.css'],
})
export class DebtorsReportComponent implements OnInit {
  @Output() return = new EventEmitter<string>();

  Date: Date = new Date();

  //current user
  currentUser: CurrentUser;
  currentUsers: CurrentUser[] = [];
  currentUsersTemp: CurrentUser[] = [];

  //customer account
  customerAccount: CustomerAccount;
  customerAccounts: CustomerAccount[] = [];
  customerAccountsTemp: CustomerAccount[] = [];

  dynamicArray = [];

  generatedBy: string;

  totalAmount: number = 0;
  totalAmountString: String;

  constructor(
    private currentUserService: CurrentUserService,
    private customerAccountService: CustomerAccountService
  ) {}

  async ngOnInit() {
    await this.getAllCurrentUsers();
    await this.getAllCustomerAccounts();

    await this.sleep(200);

    this.generatedBy = this.currentUser.username;

    for (let i = 0; i < this.customerAccounts.length; i++) {
      const element = this.customerAccounts[i];
      this.totalAmount = this.totalAmount + element.amounT_OWING;

      this.dynamicArray.push({
        id: element.customeR_ACCOUNT_ID,
        name: element.name,
        surname: element.surname,
        amount: element.amounT_OWING.toFixed(2),
      });
    }
    this.totalAmountString = this.totalAmount.toFixed(2);
  }

  async getAllCustomerAccounts() {
    this.customerAccountService.getAllCustomerAccounts().subscribe((res) => {
      res = res.filter((debtor) => {
        return debtor.deleted == false;
      });
      res = res.filter((debtor) => {
        return debtor.amounT_OWING > 0;
      });
      this.customerAccounts = res;
      console.log('this is all the customer accounts');
      console.log(this.customerAccounts);
    });
  }

  sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  Return() {
    this.return.emit('false');
  }

  async getAllCurrentUsers() {
    this.currentUserService.getAllCurrentUsers().subscribe((response) => {
      this.currentUsers = response;
      console.log('this is the current user for stock report');
      this.currentUser = this.currentUsers[this.currentUsers.length - 1];
      console.log(this.currentUser);
    });
  }
}
