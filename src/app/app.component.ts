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

  userID: number = 0;
  userRoleID = 0;

  title = 'OaSys';

  loggedIn: boolean = false;

  //login access
  loginAdmin: boolean = false;
  loginGM: boolean = false;
  loginCashier: boolean = false;
  loginHR: boolean = false;
  loginEmployee: boolean = false;

  loginForm: FormGroup;

  constructor(
    private userService: UserService,
    private currentUserService: CurrentUserService,
    private employeeService: EmployeeService,
    private router: Router
  ) {
    this.router.navigate(['/app']);
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
    console.log('this is the usersTemp length ' + this.usersTemp.length);

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
            this.loggedIn = true;
            this.userRoleID = this.usersTemp[0].useR_ROLE_ID;
            this.loginLevel();
          });
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

  loginLevel() {
    if (this.userRoleID == 3) {
      this.loginCashier = true;
      this.router.navigate(['/nav-cashier']);
    }
    if (this.userRoleID == 0) {
      this.loginAdmin = true;
      this.router.navigate(['/nav']);
    }
    if (this.userRoleID == 1) {
      this.loginGM = true;
      this.router.navigate(['/nav-general-manager']);
    }
    if (this.userRoleID == 2) {
      this.loginHR = true;
      this.router.navigate(['/nav-hr']);
    }
    if (this.userRoleID == 4) {
      this.loginEmployee = true;
      this.router.navigate(['/nav-employee']);
    }
  }

  Back() {
    window.location.reload();
    this.loggedIn = false;
    this.router.navigate(['/app']);
  }
}
