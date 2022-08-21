import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Warning } from 'src/app/models/warning.model';
import { WarningService } from 'src/app/_services/warning.service';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/_services/employee.service';

@Component({
  selector: 'app-search-warning',
  templateUrl: './search-warning.component.html',
  styleUrls: ['./search-warning.component.css'],
})
export class SearchWarningComponent implements OnInit {
  @Output() return = new EventEmitter<string>();

  //warnings
  warning: Warning;
  warnings: Warning[] = [];
  warningsTemp: Warning[] = [];

  searchText: string = '';

  //employees
  employee: Employee;
  employees: Employee[] = [];
  employeesTemp: Employee[] = [];

  //dynamicArray
  dynamicArray = [];
  tempArray = [];

  constructor(
    private warningService: WarningService,
    private EmployeeService: EmployeeService
  ) {}

  async ngOnInit() {
    await this.getAllEmployees();
    await this.getAllWarnings();

    await this.sleep(200);

    //create dynamic array
    for (let i = 0; i < this.warnings.length; i++) {
      const element = this.warnings[i];

      //get employee name
      this.employeesTemp = this.employees;
      this.employeesTemp = this.employeesTemp.filter((employee) => {
        return employee.employeE_ID.toString() == element.employeE_ID;
      });

      //push dynamic array
      this.dynamicArray.push({
        name: this.employeesTemp[0].name,
        warningName: element.warininG_NAME,
        reason: element.reason,
      });
    }
    console.log('this is the dynamic array');
    console.log(this.dynamicArray);
  }

  sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  async getAllWarnings() {
    this.warningService.getAllEmployees().subscribe((response) => {
      this.warnings = response;
      console.log('this is all the warnings');
      console.log(this.warnings);
    });
  }

  async getAllEmployees() {
    this.EmployeeService.getAllEmployees().subscribe((response) => {
      this.employees = response;
      console.log('this is all the employees');
      console.log(this.employees);
    });
  }

  Search() {
    if (this.searchText !== '') {
      let searchValue = this.searchText;
      this.tempArray = this.dynamicArray;
      console.log(searchValue);
      this.warnings = this.warnings.filter((warning) => {
        console.log(warning.warininG_NAME.match(searchValue));
        return warning.warininG_NAME.match(searchValue);
      });
    } else {
      this.getAllEmployees();
    }
  }

  Return() {
    this.return.emit('false');
  }
}
