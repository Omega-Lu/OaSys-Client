import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/_services/employee.service';

@Component({
  selector: 'app-add-eployee',
  templateUrl: './add-eployee.component.html',
})
export class AddEployeeComponent implements OnInit {
  @Output() return = new EventEmitter<string>();
  details: boolean = true;
  sdetails: boolean = true;
  tdetails: boolean = true;
  edetails: boolean = true;
  adetails: boolean = true;
  numberVal: boolean = true;
  passportVal: boolean = true;

  exists: boolean = false;

  screenStart: boolean = true;
  successSubmit: boolean = false;
  something: any;

  employee: Employee = {
    employeE_ID: 0,
    employeE_ID_NUMBER: 0,
    provincE_ID: 0,
    employeE_TYPE_ID: 0,
    employeestatusid: 0,
    warninG_ID: 0,
    name: '',
    surname: '',
    title: '',
    contacT_NUMBER: 0,
    email: '',
    address: '',
  };

  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService) {}

  async ngOnInit() {
    this.employee.contacT_NUMBER = 0;
    this.employee.employeE_ID_NUMBER = 0;

    await this.getAllEmployees();
  }

  async getAllEmployees() {
    this.employeeService.getAllEmployees().subscribe((response) => {
      this.employees = response;
      console.log('this is all the employees');
      console.log(this.employees);
    });
  }

  FormValidate() {
    this.namevalidate();
    this.survalidate();
    this.contactNumVal(this.employee.contacT_NUMBER.toString());
    this.ValidatePassport(this.employee.employeE_ID_NUMBER.toString());
    this.emailvalidate(this.employee.email);
    this.addressvalidate();
    this.titlevalidate(this.employee.title);

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

  regexPassport =
    /(((\d{2}((0[13578]|1[02])(0[1-9]|[12]\d|3[01])|(0[13456789]|1[012])(0[1-9]|[12]\d|30)|02(0[1-9]|1\d|2[0-8])))|([02468][048]|[13579][26])0229))(( |-)(\d{4})( |-)(\d{3})|(\d{7}))/;

  ValidatePassport(num) {
    if (this.regexPassport.test(num)) {
      this.passportVal = true;
    } else {
      this.passportVal = false;
    }
  }

  regexNumber = /^[0-9]{9}$/;

  contactNumVal(num) {
    if (this.regexNumber.test(num)) {
      this.numberVal = true;
      console.log('number valid');
    } else {
      this.numberVal = false;

      console.log('number is not valid');
    }
  }

  onSubmit() {
    this.employeeService.addEmployee(this.employee).subscribe((response) => {
      console.log(response);
    });
    this.successSubmit = true;
  }

  namevalidate() {
    var matches = this.employee.name.match(/\d+/g);
    if (matches != null) {
      this.details = false;
    } else if (this.employee.name == '') {
      this.details = false;
    } else {
      this.details = true;
    }
  }

  survalidate() {
    var matches = this.employee.surname.match(/\d+/g);
    if (matches != null) {
      this.sdetails = false;
    } else if (this.employee.surname == '') {
      this.sdetails = false;
    } else {
      this.sdetails = true;
    }
  }

  emailvalidate(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      this.edetails = true;
    } else {
      this.edetails = false;
    }
  }

  titlevalidate(title) {
    if (title == '-1' || title == '') {
      this.tdetails = false;
      console.log('title is invalid');
    } else {
      this.tdetails = true;
      this.employee.title = title;
      console.log('title is valid');
    }
  }

  addressvalidate() {
    if (this.employee.address == '') {
      this.adetails = false;
    } else {
      this.adetails = true;
    }
  }

  Return() {
    this.return.emit('false');
  }
}
