import { Component, OnInit } from '@angular/core';
import { EmployeeType } from 'src/app/models/employee-type.model';
import { EmployeeTypeService } from 'src/app/_services/employe-type.service';
import { ValidationServicesComponent } from 'src/app/validation-services/validation-services.component';

@Component({
  selector: 'app-add-eployee-type',
  templateUrl: './add-eployee-type.component.html',
})
export class AddEployeeTypeComponent implements OnInit {
  details: boolean = true;
  successSubmit: boolean = false;

  //import validation
  validate: ValidationServicesComponent = new ValidationServicesComponent();

  employeetype: EmployeeType = {
    employeE_TYPE_ID: 0,
    useR_ROLE_ID: 0,
    positioN_NAME: '',
  };

  constructor(private employeetypeService: EmployeeTypeService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.employeetypeService
      .addEmployee(this.employeetype)
      .subscribe((response) => {
        console.log(response);
      });
    this.successSubmit = true;
  }

  namevalidate() {
    this.details = this.validate.ValidateString(
      this.employeetype.positioN_NAME
    );
  }
}
