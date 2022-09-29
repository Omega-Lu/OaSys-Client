import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Warning } from 'src/app/models/warning.model';
import { WarningService } from 'src/app/_services/warning.service';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/_services/employee.service';
import { EmployeeWarning } from 'src/app/models/EmployeeWarning.model';
import { EmployeeWarningService } from 'src/app/_services/EmployeeWarning.service';
import { WarningType } from 'src/app/models/warning-type.model';
import { WarningTypeService } from 'src/app/_services/warning-type.service';

//audit log
import { AuditLog } from 'src/app/models/AuditLog.model';
import { AuditLogService } from 'src/app/_services/AuditLog.service';
import { CurrentUserService } from 'src/app/_services/CurrentUser.service';

@Component({
  selector: 'app-maintain-warning',
  templateUrl: './maintain-warning.component.html',
  styleUrls: ['./maintain-warning.component.css'],
})
export class MaintainWarningComponent implements OnInit {
  updateWarning: boolean = false;

  deleteNumber: number;

  successDelete: boolean;

  //warnings
  warning: Warning;
  warnings: Warning[] = [];
  warningsTemp: Warning[] = [];

  //warningTypes
  warningType: WarningType;
  warningTypes: WarningType[] = [];
  warningTypesTemp: WarningType[] = [];

  searchText: string = '';

  //employees
  employee: Employee;
  employees: Employee[] = [];
  employeesTemp: Employee[] = [];

  //employeeWarning
  employeeWarning: EmployeeWarning;
  employeeWarnings: EmployeeWarning[] = [];
  employeeWarningsTemp: EmployeeWarning[] = [];

  //dynamicArray
  dynamicArray = [];
  tempArray = [];

  //audit log
  auditLog: AuditLog = {
    auditLogID: 0,
    userID: 0,
    employeeID: 0,
    functionUsed: 'Delete Warning',
    date: new Date(),
    month: 'Oct',
  };

  constructor(
    private warningService: WarningService,
    private EmployeeService: EmployeeService,
    private EmployeeWarningService: EmployeeWarningService,
    private WarningTypeService: WarningTypeService,
    private AuditLogService: AuditLogService,
    private CurrentUserService: CurrentUserService
  ) {}

  async ngOnInit() {
    this.getEmployeeWarnings();
  }

  //////////////////////// get functions ////////////////////////////////////

  getEmployeeWarnings() {
    this.EmployeeWarningService.getAllEmployeeWarningses().subscribe((res) => {
      res = res.filter((employeeWarning) => {
        return employeeWarning.deleted == false;
      });
      this.employeeWarnings = res;
      console.log('this is all the EmployeeWarnings');
      console.log(this.employeeWarnings);
      this.getAllWarnings();
    });
  }

  async getAllWarnings() {
    this.warningService.getAllEmployees().subscribe((response) => {
      this.warnings = response;
      console.log('this is all the Warning');
      console.log(this.warnings);
      this.getWarningTypes();
    });
  }

  async getWarningTypes() {
    this.WarningTypeService.getAllEmployees().subscribe((res) => {
      this.warningTypes = res;
      console.log('this is all the Warning Types');
      console.log(this.warningTypes);
      this.getAllEmployees();
    });
  }

  async getAllEmployees() {
    this.EmployeeService.getAllEmployees().subscribe((response) => {
      this.employees = response;
      console.log('this is all the Employees');
      console.log(this.employees);
      this.createDynamicArray();
      this.getCurrentUser();
    });
  }

  getCurrentUser() {
    this.CurrentUserService.getAllCurrentUsers().subscribe((res) => {
      this.auditLog.userID = res[res.length - 1].userID;
      this.auditLog.employeeID = res[res.length - 1].employeeID;
    });
  }

  ////////////////////////////// create dynamic array ////////////////////////

  createDynamicArray() {
    this.dynamicArray = [];
    //create dynamic array
    for (let i = 0; i < this.employeeWarnings.length; i++) {
      const element = this.employeeWarnings[i];

      //get employee name
      this.employeesTemp = this.employees.filter((employee) => {
        return employee.employeE_ID == element.employeeID;
      });

      //get warning
      this.warningsTemp = this.warnings.filter((warning) => {
        return warning.warninG_ID == element.warningID;
      });

      //get WarningType
      this.warningTypesTemp = this.warningTypes.filter((warningType) => {
        return (
          warningType.warninG_TYPE_ID == this.warningsTemp[0].warninG_TYPE_ID
        );
      });

      //push dynamic array
      this.dynamicArray.push({
        name: this.employeesTemp[0].name,
        warningType: this.warningTypesTemp[0].description,
        warningName: this.warningsTemp[0].warininG_NAME,
        reason: this.warningsTemp[0].reason,
        employeeWarning: element,
        warning: this.warningsTemp[0],
      });
    }
    this.tempArray = this.dynamicArray;
  }

  //////////////////////////////// delete functions //////////////////////////

  deletee(deletEmpWar, War) {
    this.employeeWarning = deletEmpWar;
    this.warning = War;
  }

  deleteEmployee() {
    this.employeeWarning.deleted = true;
    this.EmployeeWarningService.updateEmployeeWarning(
      this.employeeWarning
    ).subscribe((res) => {
      console.log('Deleted Employee Warning');
      console.log(res);

      this.warning.deleted = true;
      this.warningService.updateEmployee(this.warning).subscribe((resWar) => {
        console.log('Deleted Warning');
        console.log(resWar);

        //add to audit log
        this.AuditLogService.addAuditLog(this.auditLog).subscribe((resAu) => {
          console.log('new audit log entry');
          console.log(resAu);

          this.successDelete = true;
        });
      });
    });
  }

  ///////////////////////// populate & search ////////////////////////////////

  populateForm(warning: Warning) {
    this.warning = warning;
    this.updateWarning = true;
  }

  Search() {
    this.dynamicArray = this.tempArray;
    if (this.searchText !== '') {
      this.dynamicArray = this.dynamicArray.filter((dynamic) => {
        return (
          dynamic.name.match(this.searchText) ||
          dynamic.warningName.match(this.searchText) ||
          dynamic.warningType.match(this.searchText)
        );
      });
    }
  }

  back() {
    this.updateWarning = false;
    this.getEmployeeWarnings();
  }
}
