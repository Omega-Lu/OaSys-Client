import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Warning } from 'src/app/models/warning.model';
import { WarningService } from 'src/app/_services/warning.service';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/_services/employee.service';
import { EmployeeWarning } from 'src/app/models/EmployeeWarning.model';
import { EmployeeWarningService } from 'src/app/_services/EmployeeWarning.service';
import { WarningType } from 'src/app/models/warning-type.model';
import { WarningTypeService } from 'src/app/_services/warning-type.service';

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

  constructor(
    private warningService: WarningService,
    private EmployeeService: EmployeeService,
    private EmployeeWarningService: EmployeeWarningService,
    private WarningTypeService: WarningTypeService
  ) {}

  async ngOnInit() {
    this.getEmployeeWarnings();
  }

  getEmployeeWarnings() {
    this.EmployeeWarningService.getAllEmployeeWarningses().subscribe((res) => {
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
    });
  }

  createDynamicArray() {
    //create dynamic array
    for (let i = 0; i < this.employeeWarnings.length; i++) {
      const element = this.employeeWarnings[i];

      //get employee name
      this.employeesTemp = this.employees;
      this.employeesTemp = this.employeesTemp.filter((employee) => {
        return employee.employeE_ID == element.employeeID;
      });

      //get warning
      this.warningsTemp = this.warnings;
      this.warningsTemp = this.warningsTemp.filter((warning) => {
        return warning.warninG_ID == element.warningID;
      });

      //get WarningType
      this.warningTypesTemp = this.warningTypes;
      this.warningTypesTemp = this.warningTypesTemp.filter((warningType) => {
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
      });
    }
    this.tempArray = this.dynamicArray;
  }

  deletee(delet: any) {
    this.deleteNumber = delet;
  }

  deleteEmployee() {
    console.log(this.deleteNumber);
    this.warningService
      .deleteEmployee(this.deleteNumber)
      .subscribe((response) => {
        this.getAllEmployees();
        console.log(this.warning);
        this.successDelete = true;
      });
  }

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
}
