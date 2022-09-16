import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/_services/employee.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-employee',
  templateUrl: './search-employee.component.html',
  styleUrls: ['./search-employee.component.css'],
})
export class SearchEmployeeComponent implements OnInit {
  @Output() return = new EventEmitter<string>();

  //employee
  employees: Employee[] = [];
  employeesTemp: Employee[] = [];

  searchText: string = '';

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.employeeService.getAllEmployees().subscribe((response) => {
      this.employees = response;
      this.employeesTemp = response;
    });
  }

  Search() {
    this.employeesTemp = this.employees;
    if (this.searchText !== '') {
      this.employeesTemp = this.employeesTemp.filter((employee) => {
        return employee.name.match(this.searchText);
      });
    }
  }

  Return() {
    this.return.emit('false');
  }
}
