import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/_services/employee.service';
import { EmployeeType } from 'src/app/models/employee-type.model';
import { EmployeeTypeService } from 'src/app/_services/employe-type.service';
import { Wage } from 'src/app/models/Wage.model';
import { WageService } from 'src/app/_services/Wage.service';

//user
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/_services/user.service';

//audit log
import { AuditLog } from 'src/app/models/AuditLog.model';
import { AuditLogService } from 'src/app/_services/AuditLog.service';
import { CurrentUserService } from 'src/app/_services/CurrentUser.service';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-maintain-employee',
  templateUrl: './maintain-employee.component.html',
  styleUrls: ['./maintain-employee.component.css'],
})
export class MaintainEmployeeComponent implements OnInit {
  @Output() return = new EventEmitter<string>();

  //employee
  employee: Employee;
  employees: Employee[] = [];
  employeesTemp: Employee[] = [];

  //employee Type
  employeeTypes: EmployeeType[] = [];
  employeeTypesTemp: EmployeeType[] = [];

  successDelete: boolean = false;

  delete: boolean = false;
  searchText: any = '';
  updateEmployee: boolean = false;
  lekke: any;
  deletenumber: any;

  //audit log
  auditLog: AuditLog = {
    auditLogID: 0,
    userID: 0,
    employeeID: 0,
    functionUsed: 'Delete Employee',
    date: new Date(),
    month: 'Oct',
  };

  //user
  user: User;
  users: User[] = [];
  usersTemp: User[] = [];

  //wage
  wage: Wage;
  wages: Wage[] = [];
  wagesTemp: Wage[] = [];

  dynamicArray = [];
  tempArray = [];

  //help pdf
  pdfPath = 'https://localhost:7113/Resources/pdfs/Maintain employee.pdf';
  displayPDF: boolean = false;

  constructor(
    private employeeService: EmployeeService,
    private employeeTypeService: EmployeeTypeService,
    private CurrentUserService: CurrentUserService,
    private AuditLogService: AuditLogService,
    private UserService: UserService,
    private wageService: WageService
  ) {}

  ngOnInit() {
    this.getAllEmployees();

    this.wageService.getAllWages().subscribe((res) => {
      res = res.filter((wage) => {
        return wage.wageCollected == 'false';
      });
      this.wages = res;
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

  //////////////get functions /////////////////////////////////////

  getAllEmployees() {
    this.employeeService.getAllEmployees().subscribe((response) => {
      response = response.filter((temp) => {
        return temp.deleted == false;
      });
      this.employees = response;
      this.employeesTemp = response;
      console.log('all employees');
      console.log(response);
      this.getEmployeeTypes();
    });
  }

  getEmployeeTypes() {
    this.employeeTypeService.getAllEmployees().subscribe((res) => {
      this.employeeTypes = res;
      this.employeeTypesTemp = res;
      console.log('employee Types');
      console.log(res);
      this.getCurrentUser();
    });
  }

  getCurrentUser() {
    this.CurrentUserService.getAllCurrentUsers().subscribe((res) => {
      this.auditLog.userID = res[res.length - 1].userID;
      this.auditLog.employeeID = res[res.length - 1].employeeID;

      this.getUsers();
    });
  }

  getUsers() {
    this.UserService.getAllUsers().subscribe((res) => {
      console.log('this is the users');
      console.log(res);
      this.users = res;
      this.usersTemp = res;
    });
  }

  ////////////////////// delete employee ///////////////////////////

  hasOutstandingWage: boolean = false;

  deletee(delet: any) {
    this.employee = delet;
    console.log('the employee');
    console.log(this.employee);

    this.wagesTemp = this.wages.filter((wage) => {
      return wage.employeeID == this.employee.employeE_ID;
    });

    if (this.wagesTemp.length > 0) this.hasOutstandingWage = true;
    else this.hasOutstandingWage = false;
  }

  deleteEmployee() {
    this.usersTemp = this.users.filter((user) => {
      return user.employeE_ID == this.employee.employeE_ID;
    });
    this.user = this.usersTemp[0];
    this.user.deleted = true;
    this.UserService.updateUser(this.user).subscribe((res) => {
      console.log('deleted user');
      console.log(res);
    });

    this.employee.deleted = true;
    this.employeeService.updateEmployee(this.employee).subscribe((res) => {
      console.log('deleted employee');
      console.log(res);

      this.getAllEmployees();
    });

    //add to audit log
    this.AuditLogService.addAuditLog(this.auditLog).subscribe((res) => {
      console.log('new audit log entry');
      console.log(res);
      this.successDelete = true;
    });
  }

  ///////////////////// populate & search //////////////////////////////////////

  populateForm(employee: Employee) {
    this.employee = employee;
    this.updateEmployee = true;
  }

  Search() {
    this.employeesTemp = this.employees;
    if (this.searchText !== '') {
      this.employeesTemp = this.employeesTemp.filter((employee) => {
        return employee.name.match(this.searchText);
      });
    }
  }

  back() {
    this.updateEmployee = false;
    this.return.emit('false');
    this.getAllEmployees();
  }
}
