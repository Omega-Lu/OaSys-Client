import { Component, OnInit } from '@angular/core';
import { WarningType } from 'src/app/models/warning-type.model';
import { WarningTypeService } from 'src/app/_services/warning-type.service';

//warnings
import { Warning } from 'src/app/models/warning.model';
import { WarningService } from 'src/app/_services/warning.service';

//audit log
import { AuditLog } from 'src/app/models/AuditLog.model';
import { AuditLogService } from 'src/app/_services/AuditLog.service';
import { CurrentUserService } from 'src/app/_services/CurrentUser.service';

@Component({
  selector: 'app-maintain-warning-type',
  templateUrl: './maintain-warning-type.component.html',
  styleUrls: ['./maintain-warning-type.component.css'],
})
export class MaintainWarningTypeComponent implements OnInit {
  //warning types
  warningtype: WarningType;
  warningtypes: WarningType[] = [];
  warningTypesTemp: WarningType[] = [];

  searchText: any = '';
  updateWarning: boolean = false;

  successDelete: boolean = false;

  deleteID;

  //validation
  hasReference: boolean = false;

  //audit log
  auditLog: AuditLog = {
    auditLogID: 0,
    userID: 0,
    employeeID: 0,
    functionUsed: 'Delete Warning Type',
    date: new Date(),
    month: 'Oct',
  };

  //warining
  warning: Warning;
  warnings: Warning[] = [];
  warningsTemp: Warning[] = [];

  constructor(
    private warningTypeService: WarningTypeService,
    private CurrentUserService: CurrentUserService,
    private AuditLogService: AuditLogService,
    private warningService: WarningService
  ) {}

  ngOnInit() {
    this.getAllWarningTypes();

    this.CurrentUserService.getAllCurrentUsers().subscribe((res) => {
      this.auditLog.userID = res[res.length - 1].userID;
      this.auditLog.employeeID = res[res.length - 1].employeeID;
    });
  }

  /////////////////////// get functions /////////////////////////////////////

  getAllWarningTypes() {
    this.warningTypeService.getAllEmployees().subscribe((response) => {
      response = response.filter((temp) => {
        return temp.deleted == false;
      });
      this.warningtypes = response;
      this.warningTypesTemp = response;

      this.getWarnings();
    });
  }

  getWarnings() {
    this.warningService.getAllEmployees().subscribe((res) => {
      res = res.filter((warning) => {
        return warning.deleted == false;
      });
      this.warnings = res;
      this.warningsTemp = res;
    });
  }

  ///////////////delete warning type/////////////////////////////////////////

  deletee(delID) {
    this.warningtype = delID;

    this.warningsTemp = this.warnings.filter((warning) => {
      return warning.warninG_TYPE_ID == this.warningtype.warninG_TYPE_ID;
    });
    if (this.warningsTemp.length > 0) this.hasReference = true;
    else this.hasReference = false;
  }

  deleteWarningType() {
    this.warningtype.deleted = true;
    this.warningTypeService
      .updateEmployee(this.warningtype)
      .subscribe((response) => {
        this.getAllWarningTypes();
        console.log('Deleted Warning Type');
        console.log(response);
        this.successDelete = true;
      });

    //add to audit log
    this.AuditLogService.addAuditLog(this.auditLog).subscribe((res) => {
      console.log('new audit log entry');
      console.log(res);
    });
  }

  populateForm(warningtype: WarningType) {
    this.warningtype = warningtype;
    this.updateWarning = true;
  }

  Search() {
    this.warningTypesTemp = this.warningtypes;
    if (this.searchText !== '') {
      this.warningTypesTemp = this.warningTypesTemp.filter((warning) => {
        return warning.description.match(this.searchText);
      });
    }
  }

  back() {
    this.updateWarning = false;
    this.getAllWarningTypes();
  }
}
