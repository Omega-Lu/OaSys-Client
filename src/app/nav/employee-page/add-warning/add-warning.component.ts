import { Component, OnInit } from '@angular/core';
import { Warning } from 'src/app/models/warning.model';
import { WarningService } from 'src/app/_services/warning.service';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/_services/employee.service';
import { WarningType } from 'src/app/models/warning-type.model';
import { WarningTypeService } from 'src/app/_services/warning-type.service';
import { ValidationServicesComponent } from 'src/app/validation-services/validation-services.component';
import { EmployeeWarning } from 'src/app/models/EmployeeWarning.model';
import { EmployeeWarningService } from 'src/app/_services/EmployeeWarning.service';

@Component({
  selector: 'app-add-warning',
  templateUrl: './add-warning.component.html',
})
export class AddWarningComponent implements OnInit {
  //import validation
  validate: ValidationServicesComponent = new ValidationServicesComponent();
  validEmployee: boolean = true;
  validWarning: boolean = true;
  validReason: boolean = true;
  validWarningType: boolean = true;

  //employees
  employee: Employee;
  employees: Employee[] = [];

  //warning types
  warningType: WarningType;
  warningTypes: WarningType[] = [];

  successSubmit: boolean = false;

  //warning
  warning: Warning = {
    warninG_ID: 0,
    warininG_NAME: '',
    employeE_ID: -1,
    warninG_TYPE_ID: -1,
    reason: '',
  };

  //employeeWarning
  employeeWarning: EmployeeWarning = {
    employeeWarningID: 0,
    employeeID: 0,
    warningID: 0,
  };

  constructor(
    private warningService: WarningService,
    private WarningTypeService: WarningTypeService,
    private EmployeeService: EmployeeService,
    private EmployeeWarningService: EmployeeWarningService
  ) {}

  async ngOnInit() {
    await this.getEmployees();
    await this.getWarningTypes();
  }

  onSubmit() {
    this.warningService.addEmployee(this.warning).subscribe((response) => {
      console.log('this is the new warning entry');
      console.log(response);
      this.employeeWarning.employeeID = response.employeE_ID;
      this.employeeWarning.warningID = response.warninG_ID;
      this.EmployeeWarningService.addEmployeeWarning(
        this.employeeWarning
      ).subscribe((res) => {
        console.log('this is the new EmployeeWarning');
        console.log(res);
        this.successSubmit = true;
      });
    });
  }

  async getWarningTypes() {
    this.WarningTypeService.getAllEmployees().subscribe((response) => {
      this.warningTypes = response;
      console.log('this is all the warning types');
      console.log(this.warningTypes);
    });
  }

  async getEmployees() {
    this.EmployeeService.getAllEmployees().subscribe((response) => {
      this.employees = response;
      console.log('this is all the employees');
      console.log(this.employees);
    });
  }

  FormValidate() {
    this.validateEmployee();
    this.validateReason();
    this.validateWarning();
    this.validateWarningType();
  }

  validateEmployee() {
    if (this.warning.employeE_ID == -1) {
      this.validEmployee = false;
    } else this.validEmployee = true;
  }

  validateWarning() {
    if (this.warning.warininG_NAME == '') {
      this.validWarning = false;
    } else this.validWarning = true;
  }

  validateWarningType() {
    if (this.warning.warninG_TYPE_ID == -1) this.validWarningType = false;
    else this.validWarningType = true;
  }

  validateReason() {
    if (this.warning.reason == '') this.validReason = false;
    else this.validReason = true;
  }
}
