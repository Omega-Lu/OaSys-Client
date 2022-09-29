import { Component, NgZone, OnInit } from '@angular/core';
import { User } from './models/user.model';
import { UserService } from './_services/user.service';
import { FormGroup } from '@angular/forms';
import { CurrentUser } from './models/CurrentUser.model';
import { CurrentUserService } from './_services/CurrentUser.service';
import { Employee } from './models/employee.model';
import { EmployeeService } from './_services/employee.service';
import { Router } from '@angular/router';
import '../assets/js/smtp.js';
declare let Email: any;
import { ValidationServicesComponent } from './validation-services/validation-services.component';
import { Location } from '@angular/common';
import { LogoutTimer } from 'src/app/models/LogoutTimer.model';
import { LogoutTimerService } from 'src/app/_services/LogoutTimer.service';
import * as CryptoJS from 'crypto-js';

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

  salt = 'YourSecretKeyForEncryption&DescryptionOasys';

  //user
  user: User;
  users: User[] = [];
  usersTemp: User[] = [];

  //employee
  employee: Employee;
  employees: Employee[] = [];
  employeesTemp: Employee[] = [];

  //current user
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

  validEmail: boolean = true;
  email: string;

  forgotPass: boolean = false;

  //use validation
  validate: ValidationServicesComponent = new ValidationServicesComponent();

  logoutTimer: LogoutTimer = {
    logoutTimerID: 0,
    active: true,
    time: 5,
  };
  logoutTimers: LogoutTimer[] = [];

  constructor(
    private userService: UserService,
    private currentUserService: CurrentUserService,
    private employeeService: EmployeeService,
    private router: Router,
    private ngZone: NgZone,
    private LogoutTimerService: LogoutTimerService
  ) {
    this.router.navigate(['/app']);
  }

  ngOnInit() {
    console.log('//////////////////////////////////////');
    let today = new Date();

    console.log(new Date().toLocaleDateString());
    console.log('//////////////////////////////////////');
    console.log(this.saltnHash('12uqlgth'));

    // Email.send({
    //   Host: 'smtp.elasticemail.com',
    //   Username: 'oasys.infolutions@gmail.com',
    //   Password: '6472A54EB8FB863EC2F2C1D10005742956DE',
    //   To: 'armandsdp@gmail.com',
    //   From: 'oasys.infolutions@gmail.com',
    //   Subject: 'Test email from oasys system',
    //   Body: 'This is the test body',
    // }).then((message) => alert(message));

    this.getEmployee();
    this.getUsers();
    this.router.events.subscribe((val) => {
      if (location.pathname == '/forgot-reset-password') {
        this.loggedIn = true;
        this.router.navigate['forgot-reset-password'];
        this.forgotPass = true;
      }
    });
  }

  //////////////////////////////////////////////// get functions //////////////

  getUsers() {
    this.userService.getAllUsers().subscribe((res) => {
      res = res.filter((employee) => {
        return employee.deleted == false;
      });
      this.users = res;
      console.log('this is all the users');
      console.log(res);
    });
  }

  getEmployee() {
    this.employeeService.getAllEmployees().subscribe((res) => {
      res = res.filter((user) => {
        return user.deleted == false;
      });
      this.employees = res;
      console.log('this is all the employees');
      console.log(this.employees);
    });
  }

  ////////////////////////////////////////////////// salted passwords //////////

  saltnHash(value: string): string {
    return CryptoJS.AES.encrypt(value, this.salt.trim()).toString();
  }

  decrypt(textToDecrypt: string) {
    return CryptoJS.AES.decrypt(textToDecrypt, this.salt.trim()).toString(
      CryptoJS.enc.Utf8
    );
  }

  ///////////////////////////////////////////// login  ///////////////////////

  login() {
    console.log('by login');
    console.log(this.username);

    this.usersTemp = this.users.filter((user) => {
      return user.username == this.username;
    });

    console.log(this.usersTemp);
    console.log('this is the usersTemp length ' + this.usersTemp.length);

    if (this.usersTemp.length == 0) {
      this.details = false;
    } else {
      this.details = true;
      let saledPass = this.decrypt(this.usersTemp[0].useR_PASSWORD);
      if (saledPass == this.password) {
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

    // this.userRoleID = 0;
    // this.loggedIn = true;
    // this.loginLevel();
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

  ValidateEmail() {
    this.validEmail = this.validate.ValidateEmail(this.email);
    console.log('hello');
    console.log(this.validEmail);
  }

  ////////////////////// forget password /////////////////////////////////////

  ForgetPassword() {
    this.ValidateEmail();

    this.employeesTemp = this.employees;
    this.employeesTemp = this.employeesTemp.filter((employee) => {
      return (employee.email = this.email);
    });

    if (this.employeesTemp.length < 1) {
    } else {
      //send an email with the password reset link

      Email.send({
        Host: 'smtp.elasticemail.com',
        Username: 'oasys.infolutions@gmail.com',
        Password: '6472A54EB8FB863EC2F2C1D10005742956DE',
        To: this.email,
        From: 'oasys.infolutions@gmail.com',
        Subject: 'Password Reset For OaSys System',
        Body: `<h3>Click On this Button To Go The Password Reset Page </h3>
                  `,
      }).then((message) => console.log(message));
    }
  }
}
