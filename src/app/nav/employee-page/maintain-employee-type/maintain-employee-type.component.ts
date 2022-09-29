import { Component, OnInit } from '@angular/core';
import { EmployeeType } from 'src/app/models/employee-type.model';
import { EmployeeTypeService } from 'src/app/_services/employe-type.service';

import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/_services/employee.service';

//audit log
import { AuditLog } from 'src/app/models/AuditLog.model';
import { AuditLogService } from 'src/app/_services/AuditLog.service';
import { CurrentUser } from 'src/app/models/CurrentUser.model';
import { CurrentUserService } from 'src/app/_services/CurrentUser.service';

@Component({
  selector: 'app-maintain-employee-type',
  templateUrl: './maintain-employee-type.component.html',
  styleUrls: ['./maintain-employee-type.component.css'],
})
export class MaintainEmployeeTypeComponent implements OnInit {
  //employee type
  employeetype: EmployeeType;
  employeetypes: EmployeeType[] = [];
  employeeTypesTemp: EmployeeType[] = [];

  //employee
  employee: Employee;
  employees: Employee[] = [];
  employeesTemp: Employee[] = [];

  searchText: any = '';
  updateEmployeeType: boolean = false;

  successDelete: boolean = false;
  IDDelete: any;

  //validation
  hasReference: boolean = false;

  //audit log
  auditLog: AuditLog = {
    auditLogID: 0,
    userID: 0,
    employeeID: 0,
    functionUsed: 'Delete Employee Type',
    date: new Date(),
    month: 'Oct',
  };

  constructor(
    private employeeTypeService: EmployeeTypeService,
    private employeeService: EmployeeService,
    private currentUserService: CurrentUserService,
    private auditLogService: AuditLogService
  ) {}

  ngOnInit() {
    this.getAllEmployeeTypes();
  }

  getAllEmployeeTypes() {
    this.employeeTypeService.getAllEmployees().subscribe((response) => {
      response = response.filter((temp) => {
        return temp.deleted == false;
      });
      this.employeetypes = response;
      this.employeeTypesTemp = response;
      console.log('Employee Types');
      console.log(response);

      this.getEmployees();
    });
  }

  getEmployees() {
    this.employeeService.getAllEmployees().subscribe((res) => {
      res = res.filter((employee) => {
        return employee.deleted == false;
      });
      this.employees = res;
      this.employeesTemp = res;

      this.getCurrentUser();
    });
  }

  getCurrentUser() {
    this.currentUserService.getAllCurrentUsers().subscribe((res) => {
      this.auditLog.userID = res[res.length - 1].userID;
      this.auditLog.employeeID = res[res.length - 1].employeeID;
    });
  }

  deleteEmployeeType() {
    this.employeetype.deleted = true;
    this.employeeTypeService
      .updateEmployee(this.employeetype)
      .subscribe((response) => {
        this.getAllEmployeeTypes();
        console.log('Deleted Employee Type');
        console.log(response);
        this.successDelete = true;
      });

    /// add to audit log
    this.auditLogService.addAuditLog(this.auditLog).subscribe((res) => {
      console.log('new audit log entry');
      console.log(res);
    });
  }

  populateForm(employeetype: EmployeeType) {
    this.employeetype = employeetype;
    this.updateEmployeeType = true;
  }

  deleteID(id) {
    this.employeetype = id;

    this.employeesTemp = this.employees.filter((employee) => {
      return employee.employeE_TYPE_ID == this.employeetype.employeE_TYPE_ID;
    });

    if (this.employeesTemp.length > 0) this.hasReference = true;
    else this.hasReference = false;
  }

  Search() {
    this.employeeTypesTemp = this.employeetypes;
    if (this.searchText !== '') {
      this.employeeTypesTemp = this.employeeTypesTemp.filter((employeetype) => {
        return employeetype.positioN_NAME.match(this.searchText);
      });
    }
  }

  back() {
    this.updateEmployeeType = false;
    this.getAllEmployeeTypes();
  }
}
