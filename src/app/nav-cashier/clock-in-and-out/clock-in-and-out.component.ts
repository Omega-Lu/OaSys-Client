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
import * as $ from 'jquery';
import * as bootstrap from 'bootstrap';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-clock-in-and-out',
  templateUrl: './clock-in-and-out.component.html',
  styleUrls: ['./clock-in-and-out.component.css'],
})
export class ClockInAndOutComponent implements OnInit {
  successClockIn: boolean = false;
  successClockOut: boolean = false;

  currentTime: any;

  //current user
  currentUsers: CurrentUser[] = [];
  currentUser: CurrentUser;

  //employee
  employee: Employee[] = [];

  //employee type
  employeeType: EmployeeType[] = [];

  //rate
  rate: Rate[] = [];

  timeIn: Time = null;
  timeInNumber: number = null;
  timeOut: Time = null;
  timeOutNumber: number = null;
  totalTime: number = 0;
  totalPay: number = 0;

  //employee hours
  newEmployeeHours: EmployeeHours[] = [];
  employeeHours: EmployeeHours = {
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
    rateID: 0,
    dateIssued: '',
    dateCollected: '',
    wageCollected: 'false',
    amount: 0,
    hrApproved: 'false',
    dateWorked: '',
    timeIn: '',
    timeOut: '',
    totalTime: '',
  };
  wages: Wage[] = [];

  constructor(
    private CurrentUserService: CurrentUserService,
    private EmployeeHoursService: EmployeeHoursService,
    private WageService: WageService,
    private EmployeeService: EmployeeService,
    private EmployeeTypeService: EmployeeTypeService,
    private RateService: RateService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getCurrentUser();
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  //////////////////// get functions ////////////////////////////////////////

  getCurrentUser() {
    this.CurrentUserService.getAllCurrentUsers().subscribe((res) => {
      this.currentUser = res[res.length - 1];
      console.log('This is the Current User');
      console.log(this.currentUser);
      this.getAllEmployees();
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
        return rate.ratE_NAME == this.employeeType[0].employeE_TYPE_ID;
      });
      console.log('This is the employee rate');
      console.log(this.rate);

      this.getAllEmployeeHours();
    });
  }

  getAllEmployeeHours() {
    // Get All Employee Hours
    this.EmployeeHoursService.getAllEmployeeHourss().subscribe((res) => {
      console.log('This is all the Employee Hours');
      this.employeeHourss = res;
      console.log(this.employeeHourss);

      //Filter Employee Hours to Get The Correct One
      this.employeeHourssTemp = this.employeeHourss.filter((hours) => {
        return hours.employeeID == this.currentUser.employeeID;
      });

      if (this.employeeHourssTemp.length < 1) {
        this.employeeHours.employeeID = this.currentUser.employeeID;
        this.EmployeeHoursService.addEmployeeHours(
          this.employeeHours
        ).subscribe((res) => {
          console.log('new Employee Hours');
          console.log(res);
          this.employeeHours = res;
        });
      } else {
        console.log('found this employees Hours');
        this.employeeHours = this.employeeHourssTemp[0];
      }
    });
  }

  ////////////////////////////////// clock in /////////////////////////

  alreadyCheckedIn: boolean = false;
  async ClockIn() {
    this.alreadyCheckedIn = false;
    // get and set the current time
    this.currentTime = new Date();
    this.currentTime = this.currentTime.toLocaleString('en-GB', {
      hour: 'numeric',
      minute: 'numeric',
    });

    if (this.employeeHours.checkInTime == '') {
      this.employeeHours.checkInTime = this.currentTime;

      this.EmployeeHoursService.updateEmployeeHours(
        this.employeeHours
      ).subscribe((res) => {
        console.log('added check in time');
        console.log(res);
        this.successClockIn = true;
      });
    } else {
      this.alreadyCheckedIn = true;
    }
  }

  ////////////////////// clock out //////////////////////////////

  notClockedInYet: boolean = false;
  ClockOut() {
    //check if not clocked in yet
    if (this.employeeHours.checkInTime == '') {
      this.notClockedInYet = true;
      return;
    }

    this.currentTime = new Date();
    this.currentTime = this.currentTime.toLocaleString('en-GB', {
      hour: 'numeric',
      minute: 'numeric',
    });

    this.employeeHours.checkOutTime = this.currentTime;

    this.EmployeeHoursService.updateEmployeeHours(this.employeeHours).subscribe(
      (res) => {
        console.log('added check out time');
        console.log(res);
      }
    );

    //Work Out Total Time Between Clock In And Clock Out

    var timeA: number[] = [];
    var time = this.employeeHours.checkInTime;
    var timeArrayString = time.toString().split(':', 2);
    for (let item of timeArrayString) {
      let no: number = Number(item);
      timeA.push(no);
    }

    this.timeInNumber = timeA[0] + timeA[1] / 60;
    console.log('Time in: ' + this.timeInNumber);

    var timeB: number[] = [];
    time = this.employeeHours.checkOutTime;
    var timeArrayStringA = time.toString().split(':', 2);
    for (let item of timeArrayStringA) {
      let no: number = Number(item);
      timeB.push(no);
    }

    this.timeOutNumber = timeB[0] + timeB[1] / 60;
    console.log('Time Out: ' + this.timeOutNumber);

    this.totalTime = this.timeOutNumber - this.timeInNumber;
    this.totalPay = this.rate[0].ratE_AMOUNT * this.totalTime;

    //add wage

    this.wage.employeeID = this.currentUser.employeeID;
    this.wage.rateID = this.rate[0].ratE_ID;
    this.wage.amount = this.totalPay;
    this.wage.dateWorked = new Date().toLocaleDateString();
    this.wage.timeIn = this.employeeHours.checkInTime;
    this.wage.timeOut = this.employeeHours.checkOutTime;
    this.wage.totalTime = this.totalTime.toFixed(2);

    this.WageService.addWage(this.wage).subscribe((response) => {
      console.log('new Wage');
      console.log(response);
      this.successClockOut = true;
      this.employeeHours.checkInTime = '';
      this.employeeHours.checkOutTime = '';
    });
  }
}
