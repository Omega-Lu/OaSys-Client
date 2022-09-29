import { Component, OnInit } from '@angular/core';
import { Rate } from 'src/app/models/rate.model';
import { RateService } from 'src/app/_services/rate.service';
import { ValidationServicesComponent } from 'src/app/validation-services/validation-services.component';
import { EmployeeType } from 'src/app/models/employee-type.model';
import { EmployeeTypeService } from 'src/app/_services/employe-type.service';

//audit log
import { AuditLog } from 'src/app/models/AuditLog.model';
import { AuditLogService } from 'src/app/_services/AuditLog.service';
import { CurrentUserService } from 'src/app/_services/CurrentUser.service';

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

  //rate
  rate: Rate = {
    ratE_ID: 0,
    ratE_NAME: -1,
    ratE_AMOUNT: null,
    deleted: false,
  };

  //audit log
  auditLog: AuditLog = {
    auditLogID: 0,
    userID: 0,
    employeeID: 0,
    functionUsed: 'Add Wage Rate',
    date: new Date(),
    month: 'Oct',
  };

  constructor(
    private rateService: RateService,
    private EmployeeTypeService: EmployeeTypeService,
    private AuditLogService: AuditLogService,
    private CurrentUserService: CurrentUserService
  ) {}

  ngOnInit() {
    this.getAllEmployeeTypes();
  }

  /////////////////////// get functions /////////////////////////////////////

  getAllEmployeeTypes() {
    this.EmployeeTypeService.getAllEmployees().subscribe((response) => {
      this.employeeTypes = response;
      console.log('this is all the employee types');
      console.log(this.employeeTypes);

      this.getCurrentUser();
    });
  }

  getCurrentUser() {
    this.CurrentUserService.getAllCurrentUsers().subscribe((res) => {
      this.auditLog.userID = res[res.length - 1].userID;
      this.auditLog.employeeID = res[res.length - 1].employeeID;
    });
  }

  ///////////////////// validate functions ///////////////////////////////////

  FormValidate() {
    //validate the money
    this.validateMoney();
    this.validateRateName();
  }

  validateMoney() {
    if (this.rate.ratE_AMOUNT == 0) {
      this.validMoney = false;
    } else this.validMoney = this.validate.ValidateMoney(this.rate.ratE_AMOUNT);
    console.log(this.validMoney);
  }

  validateRateName() {
    if (this.rate.ratE_NAME == -1) {
      this.validRateName = false;
    } else this.validRateName = true;
  }

  ////////////////////// add wage rate //////////////////////////////////////

  onSubmit() {
    this.rate.ratE_NAME = Number(this.rate.ratE_NAME);

    this.rateService.getAllEmployees().subscribe((res) => {
      res = res.filter((rate) => {
        return rate.ratE_NAME == this.rate.ratE_NAME;
      });

      if (res.length > 0) {
        this.rate.ratE_ID = res[0].ratE_ID;
        this.rateService.updateEmployee(this.rate).subscribe((response) => {
          console.log('updated wage rate');
          console.log(response);
        });
      } else {
        this.rateService.addEmployee(this.rate).subscribe((response) => {
          console.log('new wage rate');
          console.log(response);
        });
      }
      this.successSubmit = true;
    });

    //add to audit log
    this.AuditLogService.addAuditLog(this.auditLog).subscribe((res) => {
      console.log('new audit log entry');
      console.log(res);
    });
  }
}
