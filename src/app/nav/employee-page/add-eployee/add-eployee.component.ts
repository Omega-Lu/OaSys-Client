import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/_services/employee.service';
import { ValidationServicesComponent } from 'src/app/validation-services/validation-services.component';
import { EmployeeType } from 'src/app/models/employee-type.model';
import { EmployeeTypeService } from 'src/app/_services/employe-type.service';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/_services/user.service';
import * as $ from 'jQuery';
import '../../../../assets/js/smtp.js';
declare let Email: any;
import * as bcrypt from 'bcryptjs';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-add-eployee',
  templateUrl: './add-eployee.component.html',
})
export class AddEployeeComponent implements OnInit {
  @Output() return = new EventEmitter<string>();

  //validation booleans
  details: boolean = true;
  sdetails: boolean = true;
  tdetails: boolean = true;
  edetails: boolean = true;
  adetails: boolean = true;
  numberVal: boolean = true;
  passportVal: boolean = true;

  validRole: boolean = true;
  validType: boolean = true;

  exists: boolean = false;

  screenStart: boolean = true;
  successSubmit: boolean = false;
  something: any;

  employeeType: EmployeeType;
  employeeTypes: EmployeeType[] = [];

  employeeSelected: boolean = false;

  // import validation
  validate: ValidationServicesComponent = new ValidationServicesComponent();

  //employee models
  employee: Employee = {
    employeE_ID: 0,
    employeE_ID_NUMBER: 0,
    employeE_TYPE_ID: 0,
    employeE_STATUS_ID: 0,
    warninG_ID: 0,
    name: '',
    surname: '',
    title: '',
    contacT_NUMBER: 0,
    email: '',
    address: '',
  };
  employees: Employee[] = [];

  //user models
  user: User = {
    useR_ID: 0,
    useR_ROLE_ID: 0,
    employeE_ID: 0,
    useR_STATUS_ID: 0,
    username: '',
    useR_PASSWORD: '',
  };
  users: User[] = [];

  //hashing
  //bcrypt = require('bcrypt');
  salt = 'YourSecretKeyForEncryption&DescryptionOasys';

  constructor(
    private employeeService: EmployeeService,
    private employeeTypeService: EmployeeTypeService,
    private userService: UserService
  ) {}

  saltnHash(value: string): string {
    return CryptoJS.AES.encrypt(value, this.salt.trim()).toString();
  }

  decrypt(textToDecrypt: string) {
    return CryptoJS.AES.decrypt(textToDecrypt, this.salt.trim()).toString(
      CryptoJS.enc.Utf8
    );
  }

  async ngOnInit() {
    this.employee.contacT_NUMBER = 0;
    this.employee.employeE_ID_NUMBER = 0;

    await this.getAllEmployees();
    await this.getAllEmployeeTypes();
  }

  async getAllEmployees() {
    this.employeeService.getAllEmployees().subscribe((response) => {
      this.employees = response;
      console.log('this is all the employees');
      console.log(this.employees);
    });
  }

  async getAllEmployeeTypes() {
    this.employeeTypeService.getAllEmployees().subscribe((response) => {
      this.employeeTypes = response;
      console.log('this is all the employee types');
      console.log(this.employeeTypes);
    });
  }

  FormValidate() {
    // validate name
    this.ValidateName();

    //validate surname
    this.ValidateSurname();

    // validate contact number
    this.ValidateContactNumber();

    // validate id number
    this.ValidateIDNumber();

    //validate email
    this.ValidateEmail();

    //validate address
    this.addressvalidate();

    //validate title
    this.titlevalidate(this.employee.title);

    //validate employee role
    this.roleValidate();

    //validate employee type
    this.typeValidate();

    //validate if employee with id or contact number exists
    for (let index = 0; index < this.employees.length; index++) {
      const element = this.employees[index];

      if (element.contacT_NUMBER == this.employee.contacT_NUMBER) {
        this.exists = true;
        break;
      }
      if (element.employeE_ID_NUMBER == this.employee.employeE_ID_NUMBER) {
        this.exists = true;
        break;
      }
      this.exists = false;
    }
  }

  ValidateName() {
    this.details = this.validate.ValidateString(this.employee.name);
  }

  ValidateSurname() {
    this.sdetails = this.validate.ValidateString(this.employee.surname);
  }

  ValidateEmail() {
    this.edetails = this.validate.ValidateEmail(this.employee.email);
  }

  ValidateContactNumber() {
    this.numberVal = this.validate.ValidateContactNumber(
      this.employee.contacT_NUMBER
    );
  }

  ValidateIDNumber() {
    this.passportVal = this.validate.ValidateIDNumber(
      this.employee.employeE_ID_NUMBER
    );
  }

  onSubmit() {
    let empID;

    this.user.useR_PASSWORD = Math.random().toString(36).slice(-8);
    let normalPass = this.user.useR_PASSWORD;
    let encryptedText = this.saltnHash(this.user.useR_PASSWORD);
    this.user.useR_PASSWORD = encryptedText;

    this.employeeService.addEmployee(this.employee).subscribe((response) => {
      console.log('this is the new Employee');
      console.log(response);
      empID = response.employeE_ID;
      this.user.employeE_ID = empID;
      this.user.username = this.employee.name + '-' + this.employee.surname;

      console.log('this is the new user');
      console.log(this.user);
      this.userService.addUser(this.user).subscribe((response) => {
        console.log('this is the new user');
        console.log(response);

        //Send An Email With Username And PassWord
        Email.send({
          Host: 'smtp.elasticemail.com',
          Username: 'oasys.infolutions@gmail.com',
          Password: '6472A54EB8FB863EC2F2C1D10005742956DE',
          To: this.employee.email,
          From: 'oasys.infolutions@gmail.com',
          Subject: 'Username And Password For OaSys System',
          Body: `<h3>Your Username: </h3>
                <p>${this.user.username}</p>
                <h3>Your Password</h3>
                <p>${normalPass}</p>`,
        }).then((message) => console.log(message));
        this.successSubmit = true;
      });
    });
  }

  titlevalidate(title) {
    if (title == '-1' || title == '') {
      this.tdetails = false;
    } else {
      this.tdetails = true;
      this.employee.title = title;
    }
  }

  addressvalidate() {
    if (this.employee.address == '') {
      this.adetails = false;
    } else {
      this.adetails = true;
    }
  }

  roleValidate() {
    if ($('#employeeRoleID option:selected').val() == '0') {
      this.validRole = false;
    } else {
      this.validRole = true;
    }
  }

  typeValidate() {
    if (this.employeeSelected == true) {
      if ($('#employeeTypeID option:selected').val() == '0') {
        this.validType = false;
      } else {
        this.validType = true;
        if ($('#employeeTypeID option:selected').val() == '1002') {
          this.user.useR_ROLE_ID = 3;
        } else this.user.useR_ROLE_ID = 4;
      }
    }
  }

  Return() {
    this.return.emit('false');
  }
}
