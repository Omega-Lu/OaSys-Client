import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/_services/employee.service';

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
  successSubmit : boolean = false;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.employeeService.updateEmployee(this.employee)
    .subscribe( response => {
      console.log(response);
    })
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

  emailvalidate() {
 if (this.employee.email == '') {
     this.edetails = false;
    } else {
      this.edetails = true;
    }
  }

  titlevalidate() {
    var matches = this.employee.title.match(/\d+/g);
    if (matches != null) {
     this.tdetails = false;
    } else if (this.employee.title == '') {
     this.tdetails = false;
    } else {
      this.tdetails = true;
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
