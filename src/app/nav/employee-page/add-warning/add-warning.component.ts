import { Component, OnInit } from '@angular/core';
import { Warning } from 'src/app/models/warning.model';
import { WarningService } from 'src/app/_services/warning.service';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/_services/employee.service';
import { WarningType } from 'src/app/models/warning-type.model';
import { WarningTypeService } from 'src/app/_services/warning-type.service';
import { ValidationServicesComponent } from 'src/app/validation-services/validation-services.component';

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

  //employees
  employee: Employee;
  employees: Employee[] = [];

  //warning types
  warningType: WarningType;
  warningTypes: WarningType[] = [];

  successSubmit: boolean = false;

  warning: Warning = {
    warninG_ID: 0,
    warininG_NAME: 'Warning Name',
    employeE_ID: 'Employee Name',
    warninG_TYPE_ID: 0,
    reason: '',
  };

  constructor(
    private warningService: WarningService,
    private WarningTypeService: WarningTypeService,
    private EmployeeService: EmployeeService
  ) {}

  async ngOnInit() {
    await this.getEmployees();
    await this.getWarningTypes();
  }

  onSubmit() {
    this.warningService.addEmployee(this.warning).subscribe((response) => {
      console.log(response);
      this.successSubmit = true;
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
  }

  validateEmployee() {
    if (this.warning.employeE_ID == 'Employee Name') {
      this.validEmployee = false;
    } else this.validEmployee = true;
  }

  validateWarning() {
    if (this.warning.warininG_NAME == 'Warning Name') {
      this.validWarning = false;
    } else this.validWarning = true;
  }

  validateReason() {
    this.validReason = this.validate.ValidateString(this.warning.reason);
  }
}
