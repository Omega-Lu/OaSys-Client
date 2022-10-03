import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CustomerAccount } from 'src/app/models/Customer-account.model';
import { CustomerAccountService } from 'src/app/_services/customer-account.service';

//validation
import { ValidationServicesComponent } from 'src/app/validation-services/validation-services.component';

//audit log
import { AuditLog } from 'src/app/models/AuditLog.model';
import { AuditLogService } from 'src/app/_services/AuditLog.service';
import { CurrentUserService } from 'src/app/_services/CurrentUser.service';

@Component({
  selector: 'app-capture-payment',
  templateUrl: './capture-payment.component.html',
  styleUrls: ['./capture-payment.component.css'],
})
export class CapturePaymentComponent implements OnInit {
  @Input() customerAccount: CustomerAccount;

  @Output() return = new EventEmitter<string>();

  change: number = 0;
  amount: number = null;

  successSubmit: boolean = false;

  reasonSelected: boolean = true;

  amountBiggerThanZero: boolean = true;
  validAmount: boolean = true;

  cashSelected: boolean = false;

  //validation
  validate: ValidationServicesComponent = new ValidationServicesComponent();

  //audit log
  auditLog: AuditLog = {
    auditLogID: 0,
    userID: 0,
    employeeID: 0,
    functionUsed: 'Capture Debtor Payment',
    date: new Date(),
    month: 'Oct',
  };

  constructor(
    private customerAccountService: CustomerAccountService,
    private AuditLogService: AuditLogService,
    private CurrentUserService: CurrentUserService
  ) {}

  ngOnInit(): void {
    this.CurrentUserService.getAllCurrentUsers().subscribe((res) => {
      this.auditLog.userID = res[res.length - 1].userID;
      this.auditLog.employeeID = res[res.length - 1].employeeID;
    });
  }

  Return() {
    this.return.emit('false');
  }

  ///////// payment method ///////////////////////////////////////////////

  PaymentMethod(i: any) {
    if (i != -1) {
      this.reasonSelected = true;
    } else {
      this.reasonSelected = false;
    }
    if (i == 'Cash') this.cashSelected = true;
    else this.cashSelected = false;
  }

  ////////////// amount payed /////////////////////////////////////////////

  InputAmount() {
    if (this.amount > 0) {
      this.amountBiggerThanZero = true;
      this.validAmount = this.validate.ValidateMoney(this.amount);
    } else {
      this.amountBiggerThanZero = false;
      this.change = 0;
    }

    if (this.validAmount) {
      if (this.amount > this.customerAccount.amounT_OWING)
        this.change = this.amount - this.customerAccount.amounT_OWING;
      else this.change = 0;
    } else {
      this.change = 0;
    }
  }

  ///////////////////// capture the payment /////////////////////////////////

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

        //add to audit log
        this.AuditLogService.addAuditLog(this.auditLog).subscribe((res) => {
          console.log('new audit log entry');
          console.log(res);
          this.successSubmit = true;
        });
      });
  }
}
