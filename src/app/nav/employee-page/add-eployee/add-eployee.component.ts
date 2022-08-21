import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/_services/employee.service';
import { ValidationServicesComponent } from 'src/app/validation-services/validation-services.component';

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

  // import validation

  validate: ValidationServicesComponent = new ValidationServicesComponent();

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
    console.log(this.employee.name);
    this.details = this.validate.ValidateString(this.employee.name);
    console.log(this.details);
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
    this.employeeService.addEmployee(this.employee).subscribe((response) => {
      console.log(response);
    });
    this.successSubmit = true;
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
