import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CustomerAccount } from 'src/app/models/Customer-account.model';
import { CustomerAccountService } from 'src/app/_services/customer-account.service';

@Component({
  selector: 'app-capture-payment',
  templateUrl: './capture-payment.component.html',
  styleUrls: ['./capture-payment.component.css'],
})
export class CapturePaymentComponent implements OnInit {
  @Input() customerAccount: CustomerAccount;

  @Output() return = new EventEmitter<string>();

  change: number;
  amount: number;

  amountBigger: boolean = true;
  amountZero: boolean = true;
  successSubmit: boolean = false;
  firstScreen: boolean = false;
  reasonSelected: boolean = true;

  constructor(private customerAccountService: CustomerAccountService) {}

  ngOnInit(): void {}

  Return() {
    this.return.emit('false');
  }

  InputAmount() {
    if (this.amount < 1) {
      this.amountZero = false;
    } else {
      this.amountZero = true;
      this.firstScreen = true;
    }
    if (
      this.amount > this.customerAccount.amounT_OWING &&
      this.amount < this.customerAccount.crediT_LIMIT
    ) {
      this.change = (this.customerAccount.amounT_OWING - this.amount) * -1;
      this.amountBigger = true;
      this.firstScreen = true;
    } else if (this.amount > this.customerAccount.crediT_LIMIT) {
      this.amountBigger = false;
      this.change = 0;
    } else {
      this.firstScreen = true;
      this.amountBigger = true;
      this.change = 0;
    }
  }

  ReasonSelected(i : any){
    if(i != -1){
    this.reasonSelected = true;
    }
    else{
      this.reasonSelected = false;
    }

  }

  capturePayment() {
    if (this.change > 0) {
      this.customerAccount.amounT_OWING = 0;
      console.log('amount owing is 0');
    } else {
      this.customerAccount.amounT_OWING =
        this.customerAccount.amounT_OWING - this.amount;
      console.log('amount owing is more than 0');
    }

    console.log('this is the amount owing');
    console.log(this.customerAccount);

    this.customerAccountService
      .updateCustomerAccount(this.customerAccount)
      .subscribe((response) => {
        console.log(response);
        this.successSubmit = true;
      });
  }
}
