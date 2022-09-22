import { Component, OnInit } from '@angular/core';
import { Rate } from 'src/app/models/rate.model';
import { RateService } from 'src/app/_services/rate.service';
import { ValidationServicesComponent } from 'src/app/validation-services/validation-services.component';
import { EmployeeType } from 'src/app/models/employee-type.model';
import { EmployeeTypeService } from 'src/app/_services/employe-type.service';

@Component({
  selector: 'app-add-wage-rate',
  templateUrl: './add-wage-rate.component.html',
})
export class AddWageRateComponent implements OnInit {
  successSubmit: boolean = false;

  validMoney: boolean = true;
  validRateName: boolean = true;

  // import validation
  validate: ValidationServicesComponent = new ValidationServicesComponent();

  //set employee type
  employeeType: EmployeeType;
  employeeTypes: EmployeeType[] = [];
  employeeTypesTemp: EmployeeType[] = [];

  rate: Rate = {
    ratE_ID: 0,
    ratE_NAME: 'Select A Name',
    ratE_AMOUNT: null,
    deleted: false,
  };

  constructor(
    private rateService: RateService,
    private EmployeeTypeService: EmployeeTypeService
  ) {}

  ngOnInit() {
    this.getAllEmployeeTypes();
  }

  FormValidate() {
    //validate the money
    this.validateMoney();
    this.validateRateName();
  }

  onSubmit() {
    this.rateService.addEmployee(this.rate).subscribe((response) => {
      console.log(response);
      this.successSubmit = true;
    });
  }

  getAllEmployeeTypes() {
    this.EmployeeTypeService.getAllEmployees().subscribe((response) => {
      this.employeeTypes = response;
      console.log('this is all the employee types');
      console.log(this.employeeTypes);
    });
  }

  validateMoney() {
    if (this.rate.ratE_AMOUNT == 0) {
      this.validMoney = false;
    } else this.validMoney = this.validate.ValidateMoney(this.rate.ratE_AMOUNT);
    console.log(this.validMoney);
  }

  validateRateName() {
    if (this.rate.ratE_NAME == 'Select A Name') {
      this.validRateName = false;
    } else this.validRateName = true;
  }
}
