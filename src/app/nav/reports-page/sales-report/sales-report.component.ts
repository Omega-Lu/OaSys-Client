import { Component, OnInit } from '@angular/core';
import { AuditLogService } from 'src/app/_services/AuditLog.service';
import { AuditLog } from 'src/app/models/AuditLog.model';
import { Sale } from 'src/app/models/Sale.model';
import { SaleService } from 'src/app/_services/Sale.service';
import { CanvasJS } from 'src/assets/js/canvasjs.angular.component';
import * as $ from 'jquery';
import { toPublicName } from '@angular/compiler/src/i18n/serializers/xmb';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css'],
})
export class SalesReportComponent implements OnInit {
  //audit log
  audit: AuditLog;
  audits: AuditLog[] = [];
  auditsTemp: AuditLog[] = [];

  //sale
  sale: Sale;
  sales: Sale[] = [];
  salesTemp: Sale[] = [];
  salesData = [];
  salesDataTemp = [];
  salesDataY = [];

  tableArray = [];

  DateFrom;
  DateTo;

  //validation
  validDateTo: boolean = true;
  validDateFrom: boolean = true;
  validDate: boolean = true;

  constructor(
    private auditLogService: AuditLogService,
    private salesService: SaleService
  ) {}

  async ngOnInit() {
    this.getAllAudits();
  }

  sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  valdiateDateFrom() {
    if (this.DateFrom < '2022-0-01') {
      this.validDateFrom = false;
    } else {
      this.validDateFrom = true;
    }
    this.validateDate();
  }

  valdiateDateTo() {
    let today = new Date().toISOString().split('T', 2);

    if (this.DateTo > today[0]) {
      this.validDateTo = false;
    } else {
      this.validDateTo = true;
    }
    this.validateDate();
  }

  validateDate() {
    if (this.DateFrom > this.DateTo) {
      this.validDate = false;
    } else {
      this.validDate = true;
    }
  }

  async getAllAudits() {
    this.auditLogService.getAllAuditLogs().subscribe((response) => {
      this.audits = response;
      console.log('this is all the audits in the log');
      console.log(this.audits);
      this.getAllSales();
    });
  }

  async getAllSales() {
    this.salesService.getAllSales().subscribe((response) => {
      this.sales = response;
      console.log('this is all the sales');
      console.log(this.sales);
      this.createTable();
    });
  }

  createTable() {
    for (let i = 0; i < this.sales.length; i++) {
      const element = this.sales[i];

      let SaleDate = element.date.toString().split('T', 2);
      this.salesData.push(SaleDate[0]);
    }

    //delete duplicate data
    this.salesData = this.salesData.filter(
      (some, i) => i === this.salesData.indexOf(some)
    );
    this.salesDataTemp = this.salesData;
    console.log(this.salesDataTemp);

    for (let i = 0; i < this.salesData.length; i++) {
      const element = this.salesData[i];

      let x = this.sales.filter((sale) => {
        return sale.date.toString().match(element);
      });

      this.salesDataY[i] = x.length;
    }

    console.log('this sales data y');
    console.log(this.salesDataY);

    //conver the string
    for (let i = 0; i < this.salesData.length; i++) {
      const element = this.salesData[i];

      let re = /-/gi;
      let newString = this.salesData[i].replace(re, ',');
      re = /,0/gi;
      newString = newString.replace(re, ',');
      this.salesData[i] = newString;
    }

    console.log('this is the saleData Array');
    console.log(this.salesData);

    console.log('this is the saleData Temp array');
    console.log(this.salesDataTemp);
  }

  dps = [];

  saleData() {
    var xValue,
      yValue = 0;
    console.log(this.salesData);

    for (let i = 0; i < this.salesData.length; i++) {
      const element = this.salesData[i];

      xValue = new Date(this.salesData[i]);
      // xValue = new Date(startX.getTime() + i * 24 * 60 * 60 * 1000);
      yValue = this.salesDataY[i];

      if (yValue < 0) yValue = yValue * -1;

      this.dps.push({
        x: xValue,
        y: yValue,
      });
    }
    return this.dps;
  }

  createChart() {
    var dps = [];

    var chart = new CanvasJS.Chart('chartContainer', {
      title: {
        text: 'Sales Report',
      },
      data: [
        {
          type: 'line',
          dataPoints: this.saleData(),
        },
      ],
    });
    chart.render();

    var axisXMin = chart.axisX[0].get('minimum');
    var axisXMax = chart.axisX[0].get('maximum');

    $(function () {
      $('#fromDate').val(CanvasJS.formatDate(axisXMin, 'DD MMM YYYY'));
      $('#toDate').val(CanvasJS.formatDate(axisXMax, 'DD MMM YYYY'));
    });

    let minValue = this.DateFrom;
    let maxValue = this.DateTo;
    $(function () {
      if (
        new Date(minValue.toString()).getTime() <
        new Date(maxValue.toString()).getTime()
      ) {
        chart.axisX[0].set('minimum', new Date(minValue.toString()));
        chart.axisX[0].set('maximum', new Date(maxValue.toString()));
      }
    });
  }
}
