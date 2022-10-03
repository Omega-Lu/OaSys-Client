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

//current employee
import { CurrentUser } from 'src/app/models/CurrentUser.model';
import { CurrentUserService } from 'src/app/_services/CurrentUser.service';

@Component({
  selector: 'app-collect-payslip',
  templateUrl: './collect-payslip.component.html',
  styleUrls: ['./collect-payslip.component.css'],
})
export class CollectPayslipComponent implements OnInit {
  //employee hours
  employeehours: EmployeeHours;
  employeeHourss: EmployeeHours[] = [];
  employeeHourssTemp: EmployeeHours[] = [];

  //wage
  wage: Wage;
  wages: Wage[] = [];
  wagesTemp: Wage[] = [];

  dis: boolean = true;
  successSubmit: boolean = false;

  totalTimeString: string = '0';
  totalPay: number = 0;

  //employee
  employee: Employee;
  employees: Employee[] = [];
  emlpoyeesTemp: Employee[] = [];

  //employee type
  employeeType: EmployeeType;
  employeeTypes: EmployeeType[] = [];
  employeeTypesTemp: EmployeeType[] = [];

  //rate
  rate: Rate;
  rates: Rate[] = [];
  ratesTemp: Rate[] = [];

  //current user
  currentUser: CurrentUser;
  currentUsers: CurrentUser[] = [];
  currentUsersTemp: CurrentUser[] = [];

  timeIn;
  timeOut;
  date;

  constructor(
    private employeeHoursService: EmployeeHoursService,
    private wageService: WageService,
    private rateService: RateService,
    private EmployeeService: EmployeeService,
    private EmployeeTypeService: EmployeeTypeService,
    private CurrentUserService: CurrentUserService
  ) {}

  async ngOnInit() {
    this.CurrentUserService.getAllCurrentUsers().subscribe((res) => {
      this.currentUser = res[res.length - 1];
      this.getAllWages();
    });
  }

  async getAllWages() {
    this.wageService.getAllWages().subscribe((res) => {
      res = res.filter((wage) => {
        return (
          wage.hrApproved == 'true' &&
          wage.wageCollected == 'false' &&
          wage.employeeID == this.currentUser.employeeID
        );
      });

      this.wages = res;
      console.log('this is all the employee wages');
      console.log(this.wages);
      this.getRates();
    });
  }

  getRates() {
    this.rateService.getAllEmployees().subscribe((res) => {
      this.rates = res;
      console.log('this is all the rates');
      console.log(this.rates);

      this.getEmployeeTypes();
    });
  }

  getEmployeeTypes() {
    this.EmployeeTypeService.getAllEmployees().subscribe((res) => {
      console.log('this is all the employee types');
      console.log(res);

      this.employeeTypes = res;

      this.populateTable();
    });
  }

  dynamicArray = [];
  populateTable() {
    for (let i = 0; i < this.wages.length; i++) {
      const element = this.wages[i];

      this.ratesTemp = this.rates.filter((rate) => {
        return rate.ratE_ID == element.rateID;
      });
      this.employeeTypesTemp = this.employeeTypes.filter((type) => {
        return type.employeE_TYPE_ID == this.ratesTemp[0].ratE_NAME;
      });

      //push to dynamic array

      this.dynamicArray.push({
        date: element.dateWorked,
        rate: this.employeeTypesTemp[0].positioN_NAME,
        pay: element.amount,
      });
      this.totalPay = this.totalPay + element.amount;
    }
  }

  async collectWage() {
    for (let i = 0; i < this.wages.length; i++) {
      const element = this.wages[i];

      element.dateCollected = new Date().toLocaleDateString();
      element.wageCollected = 'true';

      this.wageService.updateWage(element).subscribe((res) => {
        console.log('collected wage');
        console.log(res);
      });
    }

    this.successSubmit = true;
  }
}
