import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CurrentUser } from 'src/app/models/CurrentUser.model';
import { CurrentUserService } from 'src/app/_services/CurrentUser.service';
import { EmployeeHours } from 'src/app/models/EmployeeHours.model';
import { EmployeeHoursService } from 'src/app/_services/EmployeeHours.service';
import { Wage } from 'src/app/models/Wage.model';
import { WageService } from 'src/app/_services/Wage.service';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/_services/employee.service';
import { EmployeeType } from 'src/app/models/employee-type.model';
import { EmployeeTypeService } from 'src/app/_services/employe-type.service';
import { Rate } from 'src/app/models/rate.model';
import { RateService } from 'src/app/_services/rate.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-clock-in-and-out',
  templateUrl: './clock-in-and-out.component.html',
  styleUrls: ['./clock-in-and-out.component.css'],
})
export class ClockInAndOutComponent implements OnInit {
  successClockIn: boolean = false;
  successClockOut: boolean = false;

  currentTime: any;

  currentUsers: CurrentUser[] = [];
  currentUser: CurrentUser;

  employee: Employee[] = [];

  employeeType: EmployeeType[] = [];

  rate: Rate[] = [];

  timeIn: Time = null;
  timeInNumber: number = null;
  timeOut: Time = null;
  timeOutNumber: number = null;
  totalTime: number = 0;
  totalPay: number = 0;

  newEmployeeHours: EmployeeHours[] = [];
  employeeHours: EmployeeHours = {
    employeeHoursID: 0,
    employeeID: 0,
    checkInTime: '',
    checkOutTime: '',
  };
  employeehourss: EmployeeHours[] = [];

  wage: Wage = {
    wageID: 0,
    employeeID: 0,
    dateIssued: '',
    dateCollected: '',
    wageCollected: 'false',
    amount: 0,
    hrApproved: 'false',
    dateWorked: '',
  };
  wages: Wage[] = [];

  constructor(
    private CurrentUserService: CurrentUserService,
    private EmployeeHoursService: EmployeeHoursService,
    private WageService: WageService,
    private EmployeeService: EmployeeService,
    private EmployeeTypeService: EmployeeTypeService,
    private RateService: RateService
  ) {}

  ngOnInit() {
    this.getCurrentUser();
  }

  found = false;

  async ClockIn() {
    this.employeeHours.employeeID = this.currentUser.employeeID;

    this.currentTime = new Date();
    this.currentTime = this.currentTime.toLocaleString('en-GB', {
      hour: 'numeric',
      minute: 'numeric',
    });
    this.employeeHours.checkInTime = this.currentTime;

    await this.EmployeeHoursService.getAllEmployeeHourss().subscribe((res) => {
      for (let i = 0; i < res.length; i++) {
        const element = res[i];
        if (this.currentUser.employeeID == element.employeeID) {
          this.employeeHours = element;
          this.employeeHours.checkInTime = this.currentTime;
          this.found = true;
        }
      }
      if (this.found == false) {
        console.log('Employee not found');
        this.EmployeeHoursService.addEmployeeHours(
          this.employeeHours
        ).subscribe((res) => {
          console.log('This is the new Employee Hours Entry');
          console.log(res);
          this.successClockIn = true;
        });
      } else {
        this.EmployeeHoursService.updateEmployeeHours(
          this.employeeHours
        ).subscribe((res) => {
          console.log('Updated employee hours');
          console.log(res);

          this.successClockIn = true;
        });
      }
    });
  }

  ClockOut() {
    this.currentTime = new Date();
    this.currentTime = this.currentTime.toLocaleString('en-GB', {
      hour: 'numeric',
      minute: 'numeric',
    });
    this.getAllEmployeeHours();
  }

  getCurrentUser() {
    this.CurrentUserService.getAllCurrentUsers().subscribe((res) => {
      this.currentUser = res[res.length - 1];
      console.log('This is the Current User');
      console.log(this.currentUser);
      this.getAllEmployees();
    });
  }

  getAllEmployeeHours() {
    // Get All Employee Hours
    this.EmployeeHoursService.getAllEmployeeHourss().subscribe((res) => {
      console.log('This is all the Employee Hours');
      this.employeehourss = res;

      console.log(this.employeehourss);

      //Filter Employee Hours to Get The Correct One
      this.newEmployeeHours = this.employeehourss.filter((hours) => {
        return hours.employeeID == this.currentUser.employeeID;
      });

      this.newEmployeeHours[0].checkOutTime = this.currentTime;

      //Update Employee Hours
      this.EmployeeHoursService.updateEmployeeHours(
        this.newEmployeeHours[0]
      ).subscribe((res) => {
        console.log('This is the updated employee hours');
        console.log(res);

        //Work Out Total Time Between Clock In And Clock Out
        var timeA: number[] = [];
        var time = res.checkInTime;
        var timeArrayString = time.toString().split(':', 2);
        for (let item of timeArrayString) {
          let no: number = Number(item);
          timeA.push(no);
        }

        this.timeInNumber = timeA[0] + timeA[1] / 60;
        console.log('Time in: ' + this.timeInNumber);

        var timeB: number[] = [];
        time = this.currentTime;
        var timeArrayStringA = time.toString().split(':', 2);
        for (let item of timeArrayStringA) {
          let no: number = Number(item);
          timeB.push(no);
        }

        this.timeOutNumber = timeB[0] + timeB[1] / 60;
        console.log('Time Out: ' + this.timeOutNumber);

        this.totalTime = this.timeOutNumber - this.timeInNumber;
        this.totalPay = this.rate[0].ratE_AMOUNT * this.totalTime;

        //Create To Wage Table

        let wageFound = false;

        //check if wage was already added today
        this.WageService.getAllWages().subscribe((res) => {
          let wages;
          wages = res.filter((wage) => {
            return wage.employeeID == this.currentUser.employeeID;
          });
          for (let i = 0; i < wages.length; i++) {
            const element = wages[i];
            if (element.dateWorked == new Date().toDateString()) {
              this.wage = element;
              this.wage.amount = this.totalPay;
              wageFound = true;
            }
          }

          if (wageFound) {
            this.WageService.updateWage(this.wage).subscribe((res) => {
              console.log('this is the upated wage');
              console.log(res);
              this.successClockOut = true;
            });
          } else {
            this.wage.employeeID = this.currentUser.employeeID;
            this.wage.amount = this.totalPay;
            this.wage.dateWorked = new Date().toDateString();

            this.WageService.addWage(this.wage).subscribe((res) => {
              console.log('this is the new added Wage');
              console.log(res);
              this.successClockOut = true;
            });
          }
        });
      });
    });
  }

  getAllEmployees() {
    this.EmployeeService.getAllEmployees().subscribe((res) => {
      this.employee = res.filter((employee) => {
        return employee.employeE_ID == this.currentUser.employeeID;
      });
      console.log('This is the current Employee');
      console.log(this.employee);
      this.getAllEmployeeTypes();
    });
  }

  getAllEmployeeTypes() {
    this.EmployeeTypeService.getAllEmployees().subscribe((res) => {
      this.employeeType = res.filter((employeeType) => {
        return (
          employeeType.employeE_TYPE_ID == this.employee[0].employeE_TYPE_ID
        );
      });
      console.log('This is the current employee type');
      console.log(this.employeeType);
      this.getAllRates();
    });
  }

  getAllRates() {
    this.RateService.getAllEmployees().subscribe((res) => {
      this.rate = res.filter((rate) => {
        return rate.ratE_NAME == this.employeeType[0].positioN_NAME;
      });
      console.log('This is the employee rate');
      console.log(this.rate);
    });
  }
}
