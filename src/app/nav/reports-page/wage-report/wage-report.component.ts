import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CurrentUser } from 'src/app/models/CurrentUser.model';
import { CurrentUserService } from 'src/app/_services/CurrentUser.service';
import { Wage } from 'src/app/models/Wage.model';
import { WageService } from 'src/app/_services/Wage.service';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/_services/employee.service';

@Component({
  selector: 'app-wage-report',
  templateUrl: './wage-report.component.html',
  styleUrls: ['./wage-report.component.css'],
})
export class WageReportComponent implements OnInit {
  @Output() return = new EventEmitter<string>();

  Date: Date = new Date();

  currentUser: CurrentUser;
  currentUsers: CurrentUser[] = [];
  currentUsersTemp: CurrentUser[] = [];

  wage: Wage;
  wages: Wage[] = [];
  wagesTemp: Wage[] = [];

  employee: Employee;
  employees: Employee[] = [];
  employeesTemp: Employee[] = [];

  exists: boolean = false;

  generatedBy: string;

  totalWage: number = 0;
  totalWageString: string;

  dynamicArray = [];

  constructor(
    private currentUserService: CurrentUserService,
    private wageService: WageService,
    private employeeService: EmployeeService
  ) {}

  async ngOnInit() {
    await this.getAllCurrentUsers();
    await this.getAllEmployees();
    await this.getAllWages();

    await this.sleep(200);

    this.generatedBy = this.currentUser.username;

    this.buildTable();
  }

  buildTable() {
    this.wagesTemp = this.wages;

    for (let i = 0; i < this.wagesTemp.length; i++) {
      const element = this.wagesTemp[i];

      this.employeesTemp = this.employees;

      this.employeesTemp = this.employeesTemp.filter((employee) => {
        return employee.employeE_ID == element.employeeID;
      });
      //if employee already exisits in wage
      if (this.dynamicArray.length > 0) {
        for (let i = 0; i < this.dynamicArray.length; i++) {
          const x = this.dynamicArray[i];
          if (x.empID == this.employeesTemp[0].employeE_ID) {
            let wageSome = Number(this.dynamicArray[i].wage);
            wageSome = wageSome + element.wageCollected;
            this.dynamicArray[i].wage = wageSome.toFixed(2);
            this.exists = true;
            break;
          } else {
            this.exists = false;
          }
        }
      }
      if (this.exists == false) {
        this.dynamicArray.push({
          name: this.employeesTemp[0].name,
          surname: this.employeesTemp[0].surname,
          wage: element.wageCollected.toFixed(2),
          empID: element.employeeID,
        });
      }

      this.totalWage = this.totalWage + element.wageCollected;
    }
    this.totalWageString = this.totalWage.toFixed(2);
  }

  sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  async getAllCurrentUsers() {
    this.currentUserService.getAllCurrentUsers().subscribe((response) => {
      this.currentUsers = response;
      console.log('this is the current user for stock report');
      this.currentUser = this.currentUsers[this.currentUsers.length - 1];
      console.log(this.currentUser);
    });
  }

  async getAllEmployees() {
    this.employeeService.getAllEmployees().subscribe((response) => {
      this.employees = response;
      console.log('this is all the employees');
      console.log(this.employees);
    });
  }

  async getAllWages() {
    this.wageService.getAllWages().subscribe((response) => {
      this.wages = response;
      console.log('this is all the wages');
      console.log(this.wages);
    });
  }
}
