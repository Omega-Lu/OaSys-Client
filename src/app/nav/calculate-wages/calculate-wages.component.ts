import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/_services/employee.service';
import { Rate } from 'src/app/models/rate.model';
import { RateService } from 'src/app/_services/rate.service';
import * as $ from 'jquery';
import { Time } from '@angular/common';

@Component({
  selector: 'app-calculate-wages',
  templateUrl: './calculate-wages.component.html',
  styleUrls: ['./calculate-wages.component.css'],
})
export class CalculateWagesComponent implements OnInit {
  @Output() return = new EventEmitter<string>();

  employee: Employee;
  employees: Employee[] = [];
  employeesTemp: Employee[] = [];
  employeesTempSurname: Employee[] = [];

  rate: Rate = {
    ratE_ID: 0,
    ratE_AMOUNT: 0,
    ratE_NAME: '',
  };

  rates: Rate[] = [];
  ratesTemp: Rate[] = [];

  collectPayslip: boolean = false;

  screenStart: boolean = true;
  surnameSelect: boolean = true;
  tableDisable: boolean = true;
  wageSelect: boolean = true;
  timeInDisable: boolean = true;
  timeOutDisable: boolean = true;
  timeVal: boolean = true;

  dateWorked: Date = null;

  timeIn: Time = null;
  timeInNumber: number = null;
  timeOut: Time = null;
  timeOutNumber: number = null;

  totalTime: number = null;
  totalPay: number = null;

  constructor(
    private rateService: RateService,
    private employeeService: EmployeeService
  ) {}

  async ngOnInit() {
    this.rate.ratE_NAME = '';
    await this.getEmployees();
    await this.getRates();

    this.employeesTemp = this.employees;
  }

  datePicked() {
    this.timeInDisable = false;
  }

  ValTimeIN(time: Time) {
    var timeA: number[] = [];
    console.log(time);
    var timeArrayString = time.toString().split(':', 2);
    for (let item of timeArrayString) {
      let no: number = Number(item);
      timeA.push(no);
    }
    console.log('Hours', timeA[0]);
    console.log('Minutes', timeA[1]);

    this.timeInNumber = timeA[0] + timeA[1] / 60;
    console.log('Time in: ' + this.timeInNumber);

    this.timeOutDisable = false;

    if (this.totalTimeString != '0') {
      this.calculatePay(this.timeOut);
    }
  }

  totalTimeString: string = '0';
  totalPayString: string = '0';

  calculatePay(time: Time) {
    var timeA: number[] = [];
    console.log(time);
    var timeArrayString = time.toString().split(':', 2);
    for (let item of timeArrayString) {
      let no: number = Number(item);
      timeA.push(no);
    }
    console.log('Hours', timeA[0]);
    console.log('Minutes', timeA[1]);

    this.timeOutNumber = timeA[0] + timeA[1] / 60;
    console.log('Time Out: ' + this.timeOutNumber);

    this.totalTime = this.timeOutNumber - this.timeInNumber;
    this.totalPay = this.rate.ratE_AMOUNT * this.totalTime;
    this.totalPayString = this.totalPay.toFixed(2);
    this.totalTimeString = this.totalTime.toFixed(2);

    if (this.totalTime <= 0) {
      this.timeVal = false;
      this.totalPayString = '0';
    } else {
      this.timeVal = true;
    }

    if (this.totalPay > 0) {
      this.screenStart = false;
    }
  }

  wageOption(id: number) {
    //this.rate.ratE_AMOUNT = 0;
    this.ratesTemp = this.rates;
    this.ratesTemp = this.ratesTemp.filter((rate) => {
      console.log(rate.ratE_ID == id);
      return rate.ratE_ID == id;
    });
    this.rate = this.ratesTemp[0];
    console.log('this is the chosen rate');
    console.log(this.rate);
    this.tableDisable = false;
  }

  surnameOption(id: number) {
    this.employeesTemp = this.employees;
    this.employeesTemp = this.employeesTemp.filter((employee) => {
      console.log(employee.employeE_ID == id);
      return employee.employeE_ID == id;
    });
    this.employee = this.employeesTemp[0];
    console.log('This is the selected employee');
    console.log(this.employee);
    this.ratesTemp = this.rates;
    this.wageSelect = false;
    $('#rateID').val('-1');
  }

  nameSelect(name: string) {
    this.employeesTempSurname = this.employees;
    this.employeesTempSurname = this.employeesTempSurname.filter((employee) => {
      console.log(employee.name == name);
      return employee.name == name;
    });

    this.surnameSelect = false;
    $('#surnameID').val('-1');
    $('#rateID').val('-1');
    this.wageSelect = true;
  }

  async getEmployees() {
    this.employeeService.getAllEmployees().subscribe((response) => {
      this.employees = response;
      console.log('this is all the employees');
      console.log(this.employees);
    });
  }

  async getRates() {
    this.rateService.getAllEmployees().subscribe((response) => {
      this.rates = response;
      console.log('this is all the rates');
      console.log(this.rates);
    });
  }

  Return() {
    this.return.emit('false');
  }

  finPay() {
    this.collectPayslip = true;
  }

  back() {
    this.collectPayslip = false;
    this.totalPay = 0;
    this.totalTime = 0;
    this.totalPayString = '0';
    this.totalTimeString = '0';

    this.screenStart = true;
    this.surnameSelect = true;
    this.tableDisable = true;
    this.wageSelect = true;
    this.timeInDisable = true;
    this.timeOutDisable = true;
    this.timeVal = true;

    this.dateWorked = null;

    this.timeIn = null;
    this.timeInNumber = null;
    this.timeOut = null;
    this.timeOutNumber = null;
  }
}
