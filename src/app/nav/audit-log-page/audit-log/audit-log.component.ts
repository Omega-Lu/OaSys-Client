import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuditLog } from 'src/app/models/AuditLog.model';
import { AuditLogService } from 'src/app/_services/AuditLog.service';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/_services/employee.service';

@Component({
  selector: 'app-audit-log',
  templateUrl: './audit-log.component.html',
  styleUrls: ['./audit-log.component.css'],
})
export class AuditLogComponent implements OnInit {
  @Output() return = new EventEmitter<string>();

  auditLog: AuditLog;
  auditLogs: AuditLog[] = [];
  auditLogsTemp: AuditLog[] = [];

  employee: Employee;
  employees: Employee[] = [];
  employeesTemp: Employee[] = [];

  auditArray = [];
  auditArrayTemp = [];

  constructor(
    private auditLogService: AuditLogService,
    private employeeService: EmployeeService
  ) {}

  async ngOnInit() {
    await this.getAuditLogs();
    await this.getEmployees();

    await this.sleep(200);

    for (let i = 0; i < this.auditLogs.length; i++) {
      const element = this.auditLogs[i];

      this.employeesTemp = this.employees;

      this.employeesTemp = this.employeesTemp.filter((employee) => {
        return employee.employeE_ID == element.employeeID;
      });

      this.auditArray.push({
        auditID: element.auditLogID,
        userID: element.userID,
        name: this.employeesTemp[0].name,
        surname: this.employeesTemp[0].surname,
        function: element.functionUsed,
        date: element.date,
      });
    }

    this.auditArrayTemp = this.auditArray;
  }

  search(text) {
    this.auditArrayTemp = this.auditArray;

    this.auditArrayTemp = this.auditArrayTemp.filter((audit) => {
      return (
        audit.auditID == text ||
        audit.name.match(text) ||
        audit.surname.match(text)
      );
    });
  }

  Return() {
    this.return.emit('false');
  }

  async getAuditLogs() {
    this.auditLogService.getAllAuditLogs().subscribe((response) => {
      this.auditLogs = response;
      console.log('this is all the Audit Logs');
      console.log(this.auditLogs);
    });
  }

  async getEmployees() {
    this.employeeService.getAllEmployees().subscribe((response) => {
      this.employees = response;
      console.log('this is all the Employees');
      console.log(this.employees);
    });
  }

  async sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
}
