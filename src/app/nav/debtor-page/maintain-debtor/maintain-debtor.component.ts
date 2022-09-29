import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Debtor } from 'src/app/models/debtor.model';
import { DebtorService } from 'src/app/_services/debtor.service';

//audit log
import { AuditLog } from 'src/app/models/AuditLog.model';
import { AuditLogService } from 'src/app/_services/AuditLog.service';
import { CurrentUserService } from 'src/app/_services/CurrentUser.service';

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

  //audit log
  auditLog: AuditLog = {
    auditLogID: 0,
    userID: 0,
    employeeID: 0,
    functionUsed: 'Delete Debtor',
    date: new Date(),
    month: 'Oct',
  };

  constructor(
    private debtorService: DebtorService,
    private CurrentUserService: CurrentUserService,
    private AuditLogService: AuditLogService
  ) {}

  ngOnInit() {
    this.getAllDebtors();

    this.CurrentUserService.getAllCurrentUsers().subscribe((res) => {
      this.auditLog.userID = res[res.length - 1].userID;
      this.auditLog.employeeID = res[res.length - 1].employeeID;
    });
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

      //add to audit log
      this.AuditLogService.addAuditLog(this.auditLog).subscribe((res) => {
        console.log('new audit log entry');
        console.log(res);
        this.successDelete = true;
      });
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
    this.getAllDebtors();
    this.updateDebtor = false;
  }
}
