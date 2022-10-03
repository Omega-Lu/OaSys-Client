import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { AuditLog } from 'src/app/models/AuditLog.model';
import { AuditLogService } from 'src/app/_services/AuditLog.service';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/_services/employee.service';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-audit-log',
  templateUrl: './audit-log.component.html',
  styleUrls: ['./audit-log.component.css'],
})
export class AuditLogComponent implements OnInit {
  @Output() return = new EventEmitter<string>();

  //audit log
  auditLog: AuditLog;
  auditLogs: AuditLog[] = [];
  auditLogsTemp: AuditLog[] = [];

  //employee
  employee: Employee;
  employees: Employee[] = [];
  employeesTemp: Employee[] = [];

  auditArray = [];
  auditArrayTemp = [];

  //help pdf
  pdfPath = 'https://localhost:7113/Resources/pdfs/View audit log.pdf';
  displayPDF: boolean = false;

  constructor(
    private auditLogService: AuditLogService,
    private employeeService: EmployeeService
  ) {}

  async ngOnInit() {
    await this.getAuditLogs();
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

  //////////////////// get functions ////////////////////////////////////

  async getAuditLogs() {
    this.auditLogService.getAllAuditLogs().subscribe((res) => {
      this.auditLogs = res;
      console.log('this is all the Audit Logs');
      console.log(this.auditLogs);

      this.getEmployees();
    });
  }

  async getEmployees() {
    this.employeeService.getAllEmployees().subscribe((res) => {
      this.employees = res;
      console.log('this is all the Employees');
      console.log(this.employees);

      this.createTable();
    });
  }

  ////////////////// create the table ////////////////////////////////////

  createTable() {
    for (let i = 0; i < this.auditLogs.length; i++) {
      const element = this.auditLogs[i];

      this.employeesTemp = this.employees.filter((employee) => {
        return employee.employeE_ID == element.employeeID;
      });

      this.auditArrayTemp.push({
        auditID: element.auditLogID,
        userID: element.userID,
        name: this.employeesTemp[0].name,
        surname: this.employeesTemp[0].surname,
        function: element.functionUsed,
        date: element.date,
      });
    }
    this.auditArray = this.auditArrayTemp;
  }

  ///////////////////search audit log/////////////////////////////////////////

  Search(text) {
    this.auditArrayTemp = this.auditArray.filter((audit) => {
      return (
        audit.auditID.toString().match(text) ||
        audit.name.match(text) ||
        audit.surname.match(text) ||
        audit.function.match(text)
      );
    });
  }
}
