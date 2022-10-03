import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Warning } from 'src/app/models/warning.model';
import { WarningService } from 'src/app/_services/warning.service';

import { WarningType } from 'src/app/models/warning-type.model';
import { WarningTypeService } from 'src/app/_services/warning-type.service';

import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/_services/employee.service';

//validation
import { ValidationServicesComponent } from 'src/app/validation-services/validation-services.component';

//audit log
import { AuditLog } from 'src/app/models/AuditLog.model';
import { AuditLogService } from 'src/app/_services/AuditLog.service';
import { CurrentUserService } from 'src/app/_services/CurrentUser.service';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-update-warning',
  templateUrl: './update-warning.component.html',
  styleUrls: ['./update-warning.component.css'],
})
export class UpdateWarningComponent implements OnInit {
  @Output() return = new EventEmitter<string>();

  @Input() warning: Warning;
  warnings: Warning[] = [];
  warningsTemp: Warning[] = [];

  //import validation
  validate: ValidationServicesComponent = new ValidationServicesComponent();
  validWarning: boolean = true;
  validReason: boolean = true;
  validWarningType: boolean = true;

  //warning types
  warningType: WarningType;
  warningTypes: WarningType[] = [];

  //employees
  employee: Employee;
  employees: Employee[] = [];

  //unique cariables
  uniqueWarning: boolean = true;

  //audit log
  auditLog: AuditLog = {
    auditLogID: 0,
    userID: 0,
    employeeID: 0,
    functionUsed: 'Update Warning',
    date: new Date(),
    month: 'Oct',
  };

  //help pdf
  pdfPath = 'https://localhost:7113/Resources/pdfs/Maintain warning.pdf';
  displayPDF: boolean = false;

  successSubmit: boolean = false;

  constructor(
    private warningService: WarningService,
    private AuditLogService: AuditLogService,
    private EmployeeService: EmployeeService,
    private CurrentUserService: CurrentUserService,
    private WarningTypeService: WarningTypeService
  ) {}

  ngOnInit() {
    this.warningService.getAllEmployees().subscribe((res) => {
      console.log('this is all the warnings');
      console.log(res);
      this.warnings = res;
    });
    this.getWarningTypes();
  }

  ////////////// pdf functions ///////////////////////////////
  @ViewChild(PdfViewerComponent) private pdfComponent: PdfViewerComponent;
  search(stringToSearch: string) {
    this.pdfComponent.eventBus.dispatch('find', {
      query: stringToSearch,
      type: 'again',
      caseSensitive: false,
      findPrevious: undefined,
      highlightAll: true,
      phraseSearch: true,
    });
  }

  /////////////////////get functions ////////////////////////////////////////

  async getWarningTypes() {
    this.WarningTypeService.getAllEmployees().subscribe((response) => {
      response = response.filter((warningType) => {
        return warningType.deleted == false;
      });
      this.warningTypes = response;
      console.log('this is all the warning types');
      console.log(this.warningTypes);

      this.getEmployees();
      this.getCurrentUser();
    });
  }

  getCurrentUser() {
    this.CurrentUserService.getAllCurrentUsers().subscribe((res) => {
      this.auditLog.userID = res[res.length - 1].userID;
      this.auditLog.employeeID = res[res.length - 1].employeeID;
    });
  }

  async getEmployees() {
    this.EmployeeService.getAllEmployees().subscribe((response) => {
      response = response.filter((employee) => {
        return employee.deleted == false;
      });
      this.employees = response;
      console.log('this is all the employees');
      console.log(this.employees);
    });
  }

  ////////////////////////// update warning //////////////////////////////////

  onSubmit() {
    this.warning.warninG_TYPE_ID = Number(this.warning.warninG_TYPE_ID);
    console.log(this.warning);
    this.warningService.updateEmployee(this.warning).subscribe((response) => {
      console.log('updated warnning');
      console.log(response);

      //add to audit log
      this.AuditLogService.addAuditLog(this.auditLog).subscribe((res) => {
        console.log('new audit log entry');
        console.log(res);
        this.successSubmit = true;
      });
    });
  }

  ////////////////////////// validation functions ////////////////////////////

  FormValidate() {
    this.validateReason();
    this.validateWarning();
    this.validateWarningType();
    this.compareWarning();
  }

  validateWarning() {
    if (this.warning.warininG_NAME == '') {
      this.validWarning = false;
    } else this.validWarning = true;
    this.compareWarning();
  }

  validateWarningType() {
    if (this.warning.warninG_TYPE_ID == -1) this.validWarningType = false;
    else this.validWarningType = true;
    this.compareWarning();
  }

  validateReason() {
    if (this.warning.reason == '') this.validReason = false;
    else this.validReason = true;
  }

  compareWarning() {
    this.warningsTemp = this.warnings;
    this.warningsTemp = this.warningsTemp.filter((warning) => {
      return warning.employeE_ID == this.warning.employeE_ID;
    });
    this.warningsTemp = this.warningsTemp.filter((warning) => {
      return warning.warninG_TYPE_ID == this.warning.warninG_TYPE_ID;
    });
    this.warningsTemp = this.warningsTemp.filter((warning) => {
      return warning.warininG_NAME == this.warning.warininG_NAME;
    });
    if (this.warningsTemp.length > 0) {
      if (this.warningsTemp[0].warninG_ID == this.warning.warninG_ID) {
      } else {
        this.uniqueWarning = false;
      }
    } else this.uniqueWarning = true;
  }

  Return() {
    this.return.emit('false');
  }
}
