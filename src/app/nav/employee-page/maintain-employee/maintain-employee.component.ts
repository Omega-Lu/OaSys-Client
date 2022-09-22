import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/_services/employee.service';
import { EmployeeType } from 'src/app/models/employee-type.model';
import { EmployeeTypeService } from 'src/app/_services/employe-type.service';

@Component({
  selector: 'app-maintain-employee',
  templateUrl: './maintain-employee.component.html',
  styleUrls: ['./maintain-employee.component.css'],
})
export class MaintainEmployeeComponent implements OnInit {
  @Output() return = new EventEmitter<string>();

  //employee
  employee: Employee;
  employees: Employee[] = [];
  employeesTemp: Employee[] = [];

  //employee Type
  employeeTypes: EmployeeType[] = [];
  employeeTypesTemp: EmployeeType[] = [];

  successDelete: boolean = false;

  delete: boolean = false;
  searchText: any = '';
  updateEmployee: boolean = false;
  lekke: any;
  deletenumber: any;

  dynamicArray = [];
  tempArray = [];
  constructor(
    private employeeService: EmployeeService,
    private employeeTypeService: EmployeeTypeService
  ) {}

  ngOnInit() {
    this.getAllEmployees();
  }

  deletee(delet: any) {
    this.employee = delet;
  }

  getAllEmployees() {
    this.employeeService.getAllEmployees().subscribe((response) => {
      this.employees = response;
      this.employeesTemp = response;
      this.getEmployeeTypes();
    });
  }

  getEmployeeTypes() {
    this.employeeTypeService.getAllEmployees().subscribe((res) => {
      this.employeeTypes = res;
      this.employeeTypesTemp = res;
      this.createTable();
    });
  }

  createTable() {
    for (let i = 0; i < this.employees.length; i++) {
      const element = this.employees[i];
      this.employeeTypesTemp = this.employeeTypes;
      if (!element.deleted) {
        this.employeeTypesTemp = this.employeeTypesTemp.filter((temp) => {
          return temp.employeE_TYPE_ID == element.employeE_TYPE_ID;
        });

        this.dynamicArray.push({
          title: element.title,
          name: element.name,
          surname: element.surname,
          contactNumber: element.contacT_NUMBER,
          IDNumber: element.employeE_ID_NUMBER,
          type: this.employeeTypesTemp[0].positioN_NAME,
        });
      }
    }
    console.log(this.dynamicArray);
  }

  deleteEmployee() {
    this.employee.deleted = true;
    this.employeeService.updateEmployee(this.employee).subscribe((response) => {
      response;
      this.successDelete = true;
      this.getAllEmployees();
    });
  }

  populateForm(employee: Employee) {
    this.employee = employee;
    this.updateEmployee = true;
  }

  Search() {
    this.employeesTemp = this.employees;
    if (this.searchText !== '') {
      this.employeesTemp = this.employeesTemp.filter((employee) => {
        return employee.name.match(this.searchText);
      });
    }
  }

  back() {
    this.updateEmployee = false;
    this.return.emit('false');
    this.getAllEmployees();
  }
}
