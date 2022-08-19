import { Component, OnInit } from '@angular/core';
import { User } from './models/user.model';
import { UserService } from './_services/user.service';
import { FormGroup } from '@angular/forms';
import { CurrentUser } from './models/CurrentUser.model';
import { CurrentUserService } from './_services/CurrentUser.service';
import { Employee } from './models/employee.model';
import { EmployeeService } from './_services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  details: boolean = true;
  username: string = '';
  password: string = '';
  sdetails: boolean = true;

  user: User;
  users: User[] = [];
  usersTemp: User[] = [];

  employee: Employee;
  employees: Employee[] = [];
  employeesTemp: Employee[] = [];

  currentUser: CurrentUser = {
    id: 0,
    userID: 0,
    employeeID: 0,
    username: '',
  };
  currentUsers: CurrentUser[] = [];

  userID: number;

  title = 'OaSys';
  loggedIn: boolean;
  loginForm: FormGroup;

  constructor(
    private userService: UserService,
    private currentUserService: CurrentUserService,
    private employeeService: EmployeeService,
    private route: Router
  ) {
    this.loggedIn = false;
    console.log(this.loggedIn);
  }

  ngOnInit() {
    this.getUsers();
  }

  login() {
    this.usersTemp = this.users;
    console.log('by login');
    console.log(this.username);

    this.usersTemp = this.usersTemp.filter((user) => {
      console.log(user.username == this.username);
      return user.username == this.username;
    });

    console.log(this.usersTemp);

    if (this.usersTemp.length == 0) {
      this.details = false;
    } else {
      this.details = true;
      if (this.usersTemp[0].useR_PASSWORD == this.password) {
        console.log('THe Current User ID');
        console.log(this.usersTemp[0].useR_ID);
        this.currentUser.userID = this.usersTemp[0].useR_ID;
        this.currentUser.username = this.username;
        this.currentUser.employeeID = this.usersTemp[0].employeE_ID;
        this.currentUserService
          .addCurrentUser(this.currentUser)
          .subscribe((response) => {
            console.log('this is the current user');
            console.log(response);
          });
        this.loggedIn = true;
      } else {
        this.sdetails = false;
      }
    }
  }

  getUsers() {
    this.userService.getAllUsers().subscribe((response) => {
      this.users = response;
      console.log('this is all the users');
      console.log(response);
    });
  }

  getEmployee() {
    this.employeeService.getAllEmployees().subscribe((response) => {
      this.employees = response;
      console.log('this is all the employees');
      console.log(this.employees);
    });
  }
}
