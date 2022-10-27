import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserService } from '../_services/CurrentUser.service';
import { CurrentUser } from '../models/CurrentUser.model';

import { Employee } from '../models/employee.model';
import { EmployeeService } from '../_services/employee.service';

@Component({
  selector: 'app-nav-hr',
  templateUrl: './nav-hr.component.html',
  styleUrls: ['./nav-hr.component.css'],
})
export class NavHRComponent implements OnInit {
  @Output() return = new EventEmitter<string>();
  @Input() loggedIn: boolean;
  @Input() username: string = '';

  navName: string = 'LANDING PAGE';

  currentUser: CurrentUser = null;
  currentUsers: CurrentUser[] = [];

  employee: Employee;
  employees: Employee[] = [];

  constructor(
    private router: Router,
    private currentUserService: CurrentUserService,
    private employeeService: EmployeeService
  ) {
    this.loggedIn = true;
  }

  ngOnInit() {
    this.getAllCurrentUsers();
    this.router.navigate(['/employee-page']);
  }

  logout() {
    this.loggedIn = false;
    this.router.navigate(['/app']);
    this.return.emit('false');
    this.getAllCurrentUsers();
  }

  setCurrentUser() {
    this.currentUser = this.currentUsers[this.currentUsers.length - 1];
    this.username = this.currentUser.username;
    this.getEmployees();
  }

  getAllCurrentUsers() {
    this.currentUserService.getAllCurrentUsers().subscribe((response) => {
      this.currentUsers = response;
      this.setCurrentUser();
    });
  }

  employeeimg;

  getEmployees() {
    this.employeeService.getAllEmployees().subscribe((res) => {
      this.employees = res;
      this.employees = this.employees.filter((employee) => {
        return employee.employeE_ID == this.currentUser.employeeID;
      });

      this.employee = this.employees[0];

      this.employeeimg = 'https://localhost:7113/' + this.employee.img;
    });
  }
}
