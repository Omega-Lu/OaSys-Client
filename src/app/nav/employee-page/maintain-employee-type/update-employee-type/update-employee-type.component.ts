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

  //employee type
  @Input() employeetype: EmployeeType;
  employeeTypes: EmployeeType[] = [];
  employeeTypesTemp: EmployeeType[] = [];

  //import validation
  validate: ValidationServicesComponent = new ValidationServicesComponent();

  //unique variables
  uniqueName: boolean = true;

  validName: boolean = true;

  successSubmit: boolean = false;

  constructor(private employeeTypeService: EmployeeTypeService) {}

  ngOnInit(): void {
    this.employeeTypeService.getAllEmployees().subscribe((res) => {
      console.log('This is all the employeeTypes');
      console.log(res);
      this.employeeTypes = res;
    });
  }

  onSubmit() {
    this.employeeTypeService
      .updateEmployee(this.employeetype)
      .subscribe((response) => {
        console.log('this is the new updates employee type');
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
    if (
      this.employeeTypesTemp.length > 0 &&
      this.employeeTypesTemp[0].employeE_TYPE_ID !=
        this.employeetype.employeE_TYPE_ID
    )
      this.uniqueName = false;
    else this.uniqueName = true;
  }

  namevalidate() {
    this.validName = this.validate.ValidateString(
      this.employeetype.positioN_NAME
    );
    this.compareName();
  }

  Return() {
    this.return.emit('false');
  }
}
