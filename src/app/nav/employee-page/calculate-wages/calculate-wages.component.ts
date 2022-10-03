import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/_services/employee.service';
import { EmployeeType } from 'src/app/models/employee-type.model';
import { EmployeeTypeService } from 'src/app/_services/employe-type.service';
import { Rate } from 'src/app/models/rate.model';
import { RateService } from 'src/app/_services/rate.service';
import { Wage } from 'src/app/models/Wage.model';
import { WageService } from 'src/app/_services/Wage.service';
import * as $ from 'jquery';
import { Time } from '@angular/common';

//audit log
import { AuditLog } from 'src/app/models/AuditLog.model';
import { AuditLogService } from 'src/app/_services/AuditLog.service';
import { CurrentUserService } from 'src/app/_services/CurrentUser.service';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-calculate-wages',
  templateUrl: './calculate-wages.component.html',
  styleUrls: ['./calculate-wages.component.css'],
})
export class CalculateWagesComponent implements OnInit {
  @Output() return = new EventEmitter<string>();

  //employee
  employee: Employee;
  employees: Employee[] = [];
  employeesTemp: Employee[] = [];
  employeesTempSurname: Employee[] = [];

  //rate
  rate: Rate = {
    ratE_ID: 0,
    ratE_AMOUNT: 0,
    ratE_NAME: 0,
    deleted: false,
  };
  rates: Rate[] = [];
  ratesTemp: Rate[] = [];

  //wage
  wage: Wage;
  wages: Wage[] = [];
  wagesTemp: Wage[] = [];

  //employee type
  employeeType: EmployeeType;
  employeeTypes: EmployeeType[] = [];
  employeeTypesTemp: EmployeeType[] = [];
  collectPayslip: boolean = false;

  screenStart: boolean = true;
  surnameSelect: boolean = true;
  tableDisable: boolean = true;
  wageSelect: boolean = true;
  timeInDisable: boolean = true;
  timeOutDisable: boolean = true;
  timeVal: boolean = true;
  employeeSelected: boolean = false;

  dateWorked: Date = null;

  timeIn: Time = null;
  timeInNumber: number = null;
  timeOut: Time = null;
  timeOutNumber: number = null;

  totalTime: number = null;
  totalPay: number = null;

  successSubmit: boolean = false;

  //audit log
  auditLog: AuditLog = {
    auditLogID: 0,
    userID: 0,
    employeeID: 0,
    functionUsed: 'Finalise Wage Payment',
    date: new Date(),
    month: 'Oct',
  };

  //help pdf
  pdfPath = 'https://localhost:7113/Resources/pdfs/Calculate wages.pdf';
  displayPDF: boolean = false;

  constructor(
    private rateService: RateService,
    private employeeService: EmployeeService,
    private WageService: WageService,
    private EmployeeTypeService: EmployeeTypeService,
    private CurrentUserService: CurrentUserService,
    private AuditLogService: AuditLogService
  ) {}

  async ngOnInit() {
    await this.getEmployees();

    this.CurrentUserService.getAllCurrentUsers().subscribe((res) => {
      this.auditLog.userID = res[res.length - 1].userID;
      this.auditLog.employeeID = res[res.length - 1].employeeID;
    });
  }

  ////////////// pdf functions ///////////////////////////////
  @ViewChild(PdfViewerComponent) private pdfComponent: PdfViewerComponent;
  search(stringToSearch: string) {
    this.pdfComponent.eventBus.dispatch('find', {
      query: stringToSearch,
      type: 'again',
      caseSensitive: false,
      findPrevious: undefined,
      highlightAll: true,
      phraseSearch: true,
    });
  }

  ///////////////////////////get functions////////////////////////////////////

  async getEmployees() {
    this.employeeService.getAllEmployees().subscribe((res) => {
      res = res.filter((employee) => {
        return employee.deleted == false;
      });
      this.employees = res;
      this.employeesTemp = res;
      console.log('this is all the employees');
      console.log(this.employees);

      this.getEmployeeTypes();
    });
  }

  async getEmployeeTypes() {
    this.EmployeeTypeService.getAllEmployees().subscribe((res) => {
      this.employeeTypes = res;
      console.log('this is all the employee types');
      console.log(this.employeeTypes);

      this.getRates();
    });
  }

  async getRates() {
    this.rateService.getAllEmployees().subscribe((res) => {
      this.rates = res;
      console.log('this is all the rates');
      console.log(this.rates);

      this.getAllWages();
    });
  }

  async getAllWages() {
    this.WageService.getAllWages().subscribe((res) => {
      res = res.filter((wage) => {
        return wage.hrApproved == 'false';
      });
      this.wages = res;
      console.log('this is all the wages');
      console.log(this.wages);
    });
  }

  /////////////////// name & surname option/////////////////////////////

  nameSelect(name: string) {
    this.displayWages = [];
    this.employeeSelected = false;
    this.employeesTempSurname = this.employees;
    this.employeesTempSurname = this.employeesTempSurname.filter((employee) => {
      console.log(employee.name == name);
      return employee.name == name;
    });

    this.surnameSelect = false;
    $('#surnameID').val('-1');
    $('#rateID').val('-1');
    this.wageSelect = true;
    this.totalWageAmount = 0;
  }

  surnameOption(id: number) {
    this.displayWages = [];
    this.employeesTemp = this.employees;
    this.employeesTemp = this.employeesTemp.filter((employee) => {
      return employee.employeE_ID == id;
    });
    this.employee = this.employeesTemp[0];
    console.log('This is the selected employee');
    console.log(this.employee);
    this.totalWageAmount = 0;
    this.populateTable();
  }

  ///////////////////////// populate the table //////////////////////////////

  displayWages = [];
  totalWageAmount = 0;

  populateTable() {
    for (let i = 0; i < this.wages.length; i++) {
      const element = this.wages[i];

      this.ratesTemp = this.rates.filter((rate) => {
        return rate.ratE_ID == element.rateID;
      });
      this.employeeTypesTemp = this.employeeTypes.filter((type) => {
        return type.employeE_TYPE_ID == this.ratesTemp[0].ratE_NAME;
      });

      if (element.employeeID == this.employee.employeE_ID) {
        this.displayWages.push({
          date: element.dateWorked,
          wageName: this.employeeTypesTemp[0].positioN_NAME,
          totalPay: element.amount,
          wageID: element.wageID,
        });
        this.totalWageAmount = this.totalWageAmount + element.amount;
      }
    }
    if (this.displayWages.length > 0) this.employeeSelected = true;
    else this.employeeSelected = false;
  }

  ///////////////finalize the wage payment////////////////////////////////////

  finPay() {
    for (let i = 0; i < this.displayWages.length; i++) {
      const element = this.displayWages[i];
      this.wagesTemp = this.wages;

      //get selected wage
      this.wagesTemp = this.wagesTemp.filter((wage) => {
        return wage.wageID == element.wageID;
      });

      this.wagesTemp[0].dateIssued = new Date().toLocaleDateString();
      this.wagesTemp[0].hrApproved = 'true';

      this.WageService.updateWage(this.wagesTemp[0]).subscribe((res) => {
        console.log(' this is the new updated wages');
        console.log(res);

        //add to audit log
        this.AuditLogService.addAuditLog(this.auditLog).subscribe((res) => {
          console.log('new audit log entry');
          console.log(res);
          this.successSubmit = true;
        });
      });
    }
  }
}
