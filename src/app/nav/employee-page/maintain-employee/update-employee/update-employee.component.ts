import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/_services/employee.service';
import { ValidationServicesComponent } from 'src/app/validation-services/validation-services.component';
import { EmployeeType } from 'src/app/models/employee-type.model';
import { EmployeeTypeService } from 'src/app/_services/employe-type.service';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css'],
})
export class UpdateEmployeeComponent implements OnInit {
  @Input() employee: Employee;

  @Output() return = new EventEmitter<string>();

  details: boolean = true;
  sdetails: boolean = true;
  tdetails: boolean = true;
  edetails: boolean = true;
  adetails: boolean = true;
  numberVal: boolean = true;
  passportVal: boolean = true;
  successSubmit: boolean = false;

  validRole: boolean = true;
  validType: boolean = true;

  employeeType: EmployeeType;
  employeeTypes: EmployeeType[] = [];

  employeeSelected: boolean = false;

  // import validation
  validate: ValidationServicesComponent = new ValidationServicesComponent();

  //user models
  user: User;
  users: User[] = [];
  usersTemp: User[] = [];

  role = -1;

  constructor(
    private employeeService: EmployeeService,
    private employeeTypeService: EmployeeTypeService,
    private userService: UserService
  ) {}

  ngOnInit() {
    console.log('this is the employee');
    console.log(this.employee);

    this.GetUsers();
    this.GetEmployeeTypes();
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
  }

  onSubmit() {
    this.employeeService.updateEmployee(this.employee).subscribe((response) => {
      console.log('this is the new updated employee');
      console.log(response);
      this.userService.updateUser(this.user).subscribe((res) => {
        console.log('this is the updated user');
        console.log(res);
        this.successSubmit = true;
      });
    });
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

  ValidateName() {
    console.log(this.employee.name);
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

  Return() {
    this.return.emit('false');
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

  GetEmployeeTypes() {
    this.employeeTypeService.getAllEmployees().subscribe((res) => {
      this.employeeTypes = res;
    });
  }

  GetUsers() {
    this.userService.getAllUsers().subscribe((res) => {
      this.usersTemp = res.filter((user) => {
        return user.employeE_ID == this.employee.employeE_ID;
      });
      this.user = this.usersTemp[0];
      if (this.user.useR_ROLE_ID == 3 || this.user.useR_ROLE_ID == 4) {
        this.employeeSelected = true;
      } else {
        this.employeeSelected = false;
      }
    });
  }
}
