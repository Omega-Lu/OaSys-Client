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

  //employee type
  employeetype: EmployeeType = {
    employeE_TYPE_ID: 0,
    useR_ROLE_ID: 0,
    positioN_NAME: '',
    deleted: false,
  };
  employeeTypes: EmployeeType[] = [];
  employeeTypesTemp: EmployeeType[] = [];

  //unique variables
  uniqueName: boolean = true;

  constructor(private employeetypeService: EmployeeTypeService) {}

  ngOnInit() {
    this.employeetypeService.getAllEmployees().subscribe((res) => {
      console.log('This is all the employeeTypes');
      console.log(res);
      this.employeeTypes = res;
    });
  }

  onSubmit() {
    this.employeetypeService
      .addEmployee(this.employeetype)
      .subscribe((response) => {
        console.log(response);
        this.successSubmit = true;
      });
  }

  FormValidate() {
    this.namevalidate();
    this.compareName();
  }

  compareName() {
    this.employeeTypesTemp = this.employeeTypes;
    this.employeeTypesTemp = this.employeeTypesTemp.filter((type) => {
      return type.positioN_NAME == this.employeetype.positioN_NAME;
    });
    if (this.employeeTypesTemp.length > 0) this.uniqueName = false;
    else this.uniqueName = true;
  }

  namevalidate() {
    this.details = this.validate.ValidateString(
      this.employeetype.positioN_NAME
    );
    this.compareName();
  }
}
