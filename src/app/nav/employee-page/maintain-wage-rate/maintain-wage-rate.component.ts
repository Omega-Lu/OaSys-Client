import { Component, OnInit } from '@angular/core';
import { Rate } from 'src/app/models/rate.model';
import { RateService } from 'src/app/_services/rate.service';

import { EmployeeType } from 'src/app/models/employee-type.model';
import { EmployeeTypeService } from 'src/app/_services/employe-type.service';

//audit log
import { AuditLog } from 'src/app/models/AuditLog.model';
import { AuditLogService } from 'src/app/_services/AuditLog.service';
import { CurrentUserService } from 'src/app/_services/CurrentUser.service';

@Component({
  selector: 'app-maintain-wage-rate',
  templateUrl: './maintain-wage-rate.component.html',
  styleUrls: ['./maintain-wage-rate.component.css'],
})
export class MaintainWageRateComponent implements OnInit {
  updateRate: boolean = false;

  //rate
  rate: Rate;
  rates: Rate[] = [];
  ratesTemp: Rate[] = [];

  // employeeType
  employeeType: EmployeeType;
  employeeTypes: EmployeeType[] = [];
  employeeTypesTemp: EmployeeType[] = [];

  searchText: any = '';

  successDelete: boolean = false;

  //audit log
  auditLog: AuditLog = {
    auditLogID: 0,
    userID: 0,
    employeeID: 0,
    functionUsed: 'Delete Wage Rate',
    date: new Date(),
    month: 'Oct',
  };

  constructor(
    private rateService: RateService,
    private employeeTypeService: EmployeeTypeService,
    private AuditLogService: AuditLogService,
    private CurrentUserService: CurrentUserService
  ) {}

  ngOnInit() {
    this.getRates();
  }

  //////////////////////// get functions ///////////////////////////////////

  getRates() {
    this.rateService.getAllEmployees().subscribe((response) => {
      response = response.filter((rate) => {
        return rate.deleted == false;
      });
      this.rates = response;
      this.ratesTemp = response;
      console.log('all rates');
      console.log(this.rates);

      this.getEmployeeTypes();
    });
  }

  getEmployeeTypes() {
    this.employeeTypeService.getAllEmployees().subscribe((res) => {
      this.employeeTypes = res;
      this.employeeTypesTemp = res;

      this.createDynamicArray();
      this.getCurrentUser();
    });
  }

  getCurrentUser() {
    this.CurrentUserService.getAllCurrentUsers().subscribe((res) => {
      this.auditLog.userID = res[res.length - 1].userID;
      this.auditLog.employeeID = res[res.length - 1].employeeID;
    });
  }

  ////////////////////////////create dynamic Array //////////////////////////

  dynamicArray = [];
  tempArray = [];

  createDynamicArray() {
    this.dynamicArray = [];
    for (let i = 0; i < this.rates.length; i++) {
      const element = this.rates[i];

      let rateName = this.employeeTypes.filter((employeeType) => {
        return employeeType.employeE_TYPE_ID == element.ratE_NAME;
      });

      this.dynamicArray.push({
        name: rateName[0].positioN_NAME,
        amount: element.ratE_AMOUNT.toFixed(2),
        rate: element,
      });
    }
    this.tempArray = this.dynamicArray;
  }

  ////////////////////// delete wage rate ////////////////////////////////////

  deletee(id) {
    this.rate = id;
  }

  deleteWageRate() {
    this.rate.deleted = true;

    this.rateService.updateEmployee(this.rate).subscribe((response) => {
      this.getRates();
      console.log('delete wage rate');
      console.log(response);
      this.successDelete = true;
    });

    //add to audit log
    this.AuditLogService.addAuditLog(this.auditLog).subscribe((res) => {
      console.log('new audit log entry');
      console.log(res);
    });
  }

  populateForm(rate) {
    this.rate = rate;
    this.updateRate = true;
  }

  Search() {
    this.dynamicArray = this.tempArray;
    if (this.searchText !== '') {
      this.dynamicArray = this.dynamicArray.filter((rate) => {
        return rate.name.match(this.searchText);
      });
    }
  }

  back() {
    this.updateRate = false;
    this.getRates();
  }
}
