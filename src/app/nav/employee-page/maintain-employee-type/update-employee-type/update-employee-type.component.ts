import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { EmployeeType } from 'src/app/models/employee-type.model';
import { EmployeeTypeService } from 'src/app/_services/employe-type.service';
import { ValidationServicesComponent } from 'src/app/validation-services/validation-services.component';

@Component({
  selector: 'app-update-employee-type',
  templateUrl: './update-employee-type.component.html',
  styleUrls: ['./update-employee-type.component.css'],
})
export class UpdateEmployeeTypeComponent implements OnInit {
  @Output() return = new EventEmitter<string>();
  @Input() employeetype: EmployeeType;

  //import validation
  validate: ValidationServicesComponent = new ValidationServicesComponent();

  validName: boolean = true;

  successSubmit: boolean = false;

  constructor(private employeeTypeService: EmployeeTypeService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.employeeTypeService
      .updateEmployee(this.employeetype)
      .subscribe((response) => {
        console.log('this is the new updates employee type');
        console.log(response);
        this.successSubmit = true;
      });
  }

  namevalidate() {
    this.validName = this.validate.ValidateString(
      this.employeetype.positioN_NAME
    );
  }

  Return() {
    this.return.emit('false');
  }
}
