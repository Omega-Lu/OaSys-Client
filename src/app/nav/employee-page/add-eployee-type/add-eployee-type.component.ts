import { Component, OnInit } from '@angular/core';
import { EmployeeType } from 'src/app/models/employee-type.model';
import { EmployeeTypeService } from 'src/app/_services/employe-type.service';
import { ValidationServicesComponent } from 'src/app/validation-services/validation-services.component';

//audit log
import { AuditLog } from 'src/app/models/AuditLog.model';
import { AuditLogService } from 'src/app/_services/AuditLog.service';
import { CurrentUserService } from 'src/app/_services/CurrentUser.service';

//rate
import { Rate } from 'src/app/models/rate.model';
import { RateService } from 'src/app/_services/rate.service';

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

  //audit log
  auditLog: AuditLog = {
    auditLogID: 0,
    userID: 0,
    employeeID: 0,
    functionUsed: 'Add Employee Type',
    date: new Date(),
    month: 'Oct',
  };

  //wage rate
  rate: Rate = {
    ratE_ID: 0,
    ratE_NAME: 0,
    ratE_AMOUNT: 20,
    deleted: true,
  };
  rates: Rate[] = [];
  ratesTemp: Rate[] = [];

  constructor(
    private employeetypeService: EmployeeTypeService,
    private CurrentUserService: CurrentUserService,
    private AuditLogService: AuditLogService,
    private rateService: RateService
  ) {}

  ngOnInit() {
    this.employeetypeService.getAllEmployees().subscribe((res) => {
      console.log('This is all the employeeTypes');
      console.log(res);
      this.employeeTypes = res;
    });

    this.getCurrentUser();
  }

  //////////////////////// get functions /////////////////////////////////

  getCurrentUser() {
    this.CurrentUserService.getAllCurrentUsers().subscribe((res) => {
      this.auditLog.userID = res[res.length - 1].userID;
      this.auditLog.employeeID = res[res.length - 1].employeeID;

      this.getRates();
    });
  }

  getRates() {
    this.rateService.getAllEmployees().subscribe((res) => {
      this.rates = res;
      this.ratesTemp = res;
    });
  }

  //////////////////////// add employee type /////////////////////////////

  onSubmit() {
    if (this.employeetype.employeE_TYPE_ID != 0) {
      this.employeetype.deleted == false;
      this.employeetypeService
        .updateEmployee(this.employeetype)
        .subscribe((response) => {
          console.log('reActivaed Employee Type');
          console.log(response);
          this.successSubmit = true;
        });
    } else {
      this.employeetypeService
        .addEmployee(this.employeetype)
        .subscribe((response) => {
          console.log(response);

          this.rate.ratE_NAME = response.employeE_TYPE_ID;
          this.rateService.addEmployee(this.rate).subscribe((res) => {
            console.log('new wage rate for type');
            console.log(res);
            this.successSubmit = true;
          });
        });
    }

    //add to audit log
    this.AuditLogService.addAuditLog(this.auditLog).subscribe((res) => {
      console.log('new audit log entry');
      console.log(res);
    });
  }

  /////////////////////////// validation functions ///////////////////////////

  FormValidate() {
    this.namevalidate();
    this.compareName();
  }

  compareName() {
    this.employeeTypesTemp = this.employeeTypes;
    this.employeeTypesTemp = this.employeeTypesTemp.filter((type) => {
      return type.positioN_NAME == this.employeetype.positioN_NAME;
    });
    if (this.employeeTypesTemp.length > 0) {
      if (this.employeeTypesTemp[0].deleted == true) {
        this.employeetype.employeE_TYPE_ID =
          this.employeeTypesTemp[0].employeE_TYPE_ID;
      } else {
        this.uniqueName = false;
      }
    } else this.uniqueName = true;
  }

  namevalidate() {
    this.details = this.validate.ValidateString(
      this.employeetype.positioN_NAME
    );
    this.compareName();
  }
}
