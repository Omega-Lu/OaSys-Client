import { Time } from '@angular/common';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeHours } from 'src/app/models/EmployeeHours.model';
import { EmployeeHoursService } from 'src/app/_services/EmployeeHours.service';
import { Wage } from 'src/app/models/Wage.model';
import { WageService } from 'src/app/_services/Wage.service';
import { Rate } from 'src/app/models/rate.model';
import { RateService } from 'src/app/_services/rate.service';
import { EmployeeType } from 'src/app/models/employee-type.model';
import { EmployeeTypeService } from 'src/app/_services/employe-type.service';
import { EmployeeService } from 'src/app/_services/employee.service';

@Component({
  selector: 'app-collect-payslip',
  templateUrl: './collect-payslip.component.html',
  styleUrls: ['./collect-payslip.component.css'],
})
export class CollectPayslipComponent implements OnInit {
  employeehours: EmployeeHours = {
    employeeHoursID: 0,
    employeeID: 0,
    checkInTime: '',
    checkOutTime: '',
  };
  employeeHourss: EmployeeHours[] = [];
  employeeHourssTemp: EmployeeHours[] = [];

  wage: Wage = {
    wageID: 0,
    employeeID: 0,
    dateIssued: '',
    dateCollected: '',
    wageCollected: '',
    amount: 0,
    hrApproved: '',
    dateWorked: '',
  };
  wages: Wage[] = [];
  wagesTemp: Wage[] = [];

  dis: boolean = true;
  successSubmit: boolean = false;

  totalTimeString: string = '0';
  totalPayString: string = '0';

  employee: Employee;
  employees: Employee[] = [];
  emlpoyeesTemp: Employee[] = [];

  employeeType: EmployeeType;
  employeeTypes: EmployeeType[] = [];
  employeeTypesTemp: EmployeeType[] = [];

  rate: Rate;
  rates: Rate[] = [];
  ratesTemp: Rate[] = [];

  timeIn;
  timeOut;
  date;

  constructor(
    private employeeHoursService: EmployeeHoursService,
    private wageService: WageService,
    private rateService: RateService,
    private EmployeeService: EmployeeService,
    private EmployeeTypeService: EmployeeTypeService
  ) {}

  async ngOnInit() {
    this.getAllWages();
  }

  async collectWage() {
    // this.wage.employeeID = this.employee.employeE_ID;
    // this.wage.dateIssued = this.date.toString();
    // this.wage.dateCollected = new Date().toString();
    // this.wage.wageCollected = this.totalPay;
    // console.log('this is the new wage entry');
    // //console.log(this.wage);
    // this.wageService.addWage(this.wage).subscribe((response) => {
    //   console.log(response);
    // });
    // await this.sleep(200);
    // this.employeehours.employeeID = this.employee.employeE_ID;
    // this.employeehours.checkInTime = this.timeIn.toString();
    // this.employeehours.checkOutTime = this.timeOut.toString();
    // await this.getAllWages();
    // await this.sleep(300);
    // this.employeehours.wageID = this.wages[this.wages.length - 1].wageID;
    // console.log('this is the new EmployeeHours Entry');
    // //console.log(this.employeehours);
    // this.employeeHoursService
    //   .addEmployeeHours(this.employeehours)
    //   .subscribe((response) => {
    //     console.log(response);
    //   });
  }

  async getAllWages() {
    this.wageService.getAllWages().subscribe((response) => {
      this.wages = response;
      console.log('this is all the wages');
      console.log(this.wages);
      this.getAllEmployees();
    });
  }

  getAllEmployees() {
    this.EmployeeService.getAllEmployees().subscribe((res) => {
      this.employees = res;
      console.log('this is all the employees');
      console.log(this.employees);
      this.getEmployeeTypes();
    });
  }

  getEmployeeTypes() {
    this.EmployeeTypeService.getAllEmployees().subscribe((res) => {
      this.employeeTypes = res;
      console.log('this is all the employee types');
      console.log(this.employees);
      this.getRates();
    });
  }

  getRates() {
    this.rateService.getAllEmployees().subscribe((res) => {
      this.rates = res;
      console.log('this is all the rates');
      console.log(this.employees);
      this.populateTable();
    });
  }

  dynamicArray = [];
  populateTable() {
    for (let i = 0; i < this.wages.length; i++) {
      const element = this.wages[i];

      //work out rate
      this.emlpoyeesTemp = this.employees;
      this.emlpoyeesTemp = this.emlpoyeesTemp.filter((employee) => {
        return employee.employeE_ID == element.employeeID;
      });

      this.employeeTypesTemp = this.employeeTypes;
      this.employeeTypesTemp = this.employeeTypesTemp.filter((type) => {
        return type.employeE_TYPE_ID == this.emlpoyeesTemp[0].employeE_TYPE_ID;
      });

      this.ratesTemp = this.rates;
      this.ratesTemp = this.ratesTemp.filter((rate) => {
        return rate.ratE_NAME == this.employeeTypesTemp[0].positioN_NAME;
      });

      let hoursWorked = (
        element.amount / this.ratesTemp[0].ratE_AMOUNT
      ).toFixed(2);

      //push to dynamic array
      this.dynamicArray.push({
        date: element.dateWorked,
        hours: hoursWorked,
        rate: this.ratesTemp[0].ratE_NAME,
        pay: element.amount,
      });
    }
  }

  async sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
}
