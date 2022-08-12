import { Component, OnInit } from '@angular/core';
import { AuditLogService } from 'src/app/_services/AuditLog.service';
import { AuditLog } from 'src/app/models/AuditLog.model';
import { Sale } from 'src/app/models/Sale.model';
import { SaleService } from 'src/app/_services/Sale.service';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css'],
})
export class SalesReportComponent implements OnInit {
  audit: AuditLog;
  audits: AuditLog[] = [];
  auditsTemp: AuditLog[] = [];

  sale: Sale;
  sales: Sale[] = [];
  salesTemp: Sale[] = [];

  tableArray = [];

  constructor(
    private auditLogService: AuditLogService,
    private salesService: SaleService
  ) {}

  async ngOnInit() {
    this.getAllAudits();
    this.getAllSales();
    this.sleep(200);

    //create the table report
    this.createTable();
  }

  createTable() {
    this.salesTemp = this.sales;

  }

  sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  async getAllAudits() {
    this.auditLogService.getAllAuditLogs().subscribe((response) => {
      this.audits = response;
      console.log('this is all the audits in the log');
      console.log(this.audits);
    });
  }

  async getAllSales() {
    this.salesService.getAllSales().subscribe((response) => {
      this.sales = response;
      console.log('this is all the sales');
      console.log(this.sales);
    });
  }
}
