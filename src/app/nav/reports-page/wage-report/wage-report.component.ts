import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { CurrentUser } from 'src/app/models/CurrentUser.model';
import { CurrentUserService } from 'src/app/_services/CurrentUser.service';
import { Wage } from 'src/app/models/Wage.model';
import { WageService } from 'src/app/_services/Wage.service';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/_services/employee.service';

//audit log
import { AuditLog } from 'src/app/models/AuditLog.model';
import { AuditLogService } from 'src/app/_services/AuditLog.service';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-wage-report',
  templateUrl: './wage-report.component.html',
  styleUrls: ['./wage-report.component.css'],
})
export class WageReportComponent implements OnInit {
  @Output() return = new EventEmitter<string>();

  Date: Date = new Date();

  //current user
  currentUser: CurrentUser;
  currentUsers: CurrentUser[] = [];
  currentUsersTemp: CurrentUser[] = [];

  //wage
  wage: Wage;
  wages: Wage[] = [];
  wagesTemp: Wage[] = [];

  //employee
  employee: Employee;
  employees: Employee[] = [];
  employeesTemp: Employee[] = [];

  exists: boolean = false;

  generatedBy: string;

  totalWage: number = 0;
  totalWageString: string;

  dynamicArray = [];

  //audit log
  auditLog: AuditLog = {
    auditLogID: 0,
    userID: 0,
    employeeID: 0,
    functionUsed: 'Print Wage Report',
    date: new Date(),
    month: 'Oct',
  };

  //help pdf
  pdfPath = 'https://localhost:7113/Resources/pdfs/Wage report.pdf';
  displayPDF: boolean = false;

  constructor(
    private currentUserService: CurrentUserService,
    private wageService: WageService,
    private employeeService: EmployeeService,
    private AuditLogService: AuditLogService
  ) {}

  async ngOnInit() {
    this.getAllCurrentUsers();

    this.currentUserService.getAllCurrentUsers().subscribe((res) => {
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

  ///////////////////// get functions ////////////////////////////////////
  async getAllCurrentUsers() {
    this.currentUserService.getAllCurrentUsers().subscribe((response) => {
      this.currentUsers = response;
      console.log('this is the current user for stock report');
      this.currentUser = this.currentUsers[this.currentUsers.length - 1];
      console.log(this.currentUser);
      this.generatedBy = this.currentUser.username;
      this.getAllEmployees();
    });
  }

  async getAllEmployees() {
    this.employeeService.getAllEmployees().subscribe((response) => {
      this.employees = response;
      console.log('this is all the employees');
      console.log(this.employees);
      this.getAllWages();
    });
  }

  async getAllWages() {
    this.wageService.getAllWages().subscribe((response) => {
      this.wages = response;
      console.log('this is all the wages');
      console.log(this.wages);
      this.buildTable();
    });
  }

  ///////////////// create the dynamic array /////////////////////////////////

  buildTable() {
    this.wagesTemp = this.wages.filter((wage) => {
      return wage.wageCollected == 'true';
    });

    for (let i = 0; i < this.wagesTemp.length; i++) {
      const element = this.wagesTemp[i];

      this.employeesTemp = this.employees.filter((employee) => {
        return employee.employeE_ID == element.employeeID;
      });

      //if employee already exisits in wage
      if (this.dynamicArray.length > 0) {
        for (let i = 0; i < this.dynamicArray.length; i++) {
          const x = this.dynamicArray[i];
          if (x.empID == this.employeesTemp[0].employeE_ID) {
            let wageSome = Number(this.dynamicArray[i].wage);
            wageSome = wageSome + element.amount;
            this.dynamicArray[i].wage = wageSome;
            this.exists = true;
            this.totalWage = this.totalWage + this.dynamicArray[i].wage;
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
          wage: element.amount,
          empID: element.employeeID,
        });

        this.totalWage = this.totalWage + element.amount;
      }
    }
  }

  addToAudit() {
    //add to audit log
    this.AuditLogService.addAuditLog(this.auditLog).subscribe((res) => {
      console.log('new audit log entry');
      console.log(res);
    });
  }
}
