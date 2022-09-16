import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/_services/employee.service';

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

  successDelete: boolean = false;

  delete: boolean = false;
  searchText: any = '';
  updateEmployee: boolean = false;
  lekke: any;
  deletenumber: any;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.getAllEmployees();
  }

  deletee(delet: any) {
    this.deletenumber = delet;
  }

  getAllEmployees() {
    this.employeeService.getAllEmployees().subscribe((response) => {
      this.employees = response;
      this.employeesTemp = response;
    });
  }

  deleteEmployee() {
    this.employeeService
      .deleteEmployee(this.deletenumber)
      .subscribe((response) => {
        this.getAllEmployees();
        response;
        this.successDelete = true;
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
