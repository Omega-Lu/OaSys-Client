import { Time } from '@angular/common';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeHours } from 'src/app/models/EmployeeHours.model';
import { EmployeeHoursService } from 'src/app/_services/EmployeeHours.service';
import { Wage } from 'src/app/models/Wage.model';
import { WageService } from 'src/app/_services/Wage.service';
import { Rate } from 'src/app/models/rate.model';

@Component({
  selector: 'app-collect-payslip',
  templateUrl: './collect-payslip.component.html',
  styleUrls: ['./collect-payslip.component.css'],
})
export class CollectPayslipComponent implements OnInit {
  @Output() return = new EventEmitter<string>();

  @Input() employee: Employee;
  @Input() rate: Rate;
  @Input() date: Date;
  @Input() timeIn: Time;
  @Input() timeOut: Time;
  @Input() totalPay: number;
  @Input() totalTime: number;

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

  constructor(
    private employeeHoursService: EmployeeHoursService,
    private wageService: WageService
  ) {}

  async ngOnInit() {
    this.totalPayString = this.totalPay.toFixed(2);
    this.totalTimeString = this.totalTime.toFixed(2);
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
    });
  }

  async sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  Return() {
    this.return.emit('false');
  }
}
