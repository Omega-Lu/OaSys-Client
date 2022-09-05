import { Component, OnInit } from '@angular/core';
import { AuditLogService } from 'src/app/_services/AuditLog.service';
import { AuditLog } from 'src/app/models/AuditLog.model';
import { Sale } from 'src/app/models/Sale.model';
import { SaleService } from 'src/app/_services/Sale.service';
import { CanvasJS } from 'src/assets/js/canvasjs.angular.component';
import * as $ from 'jquery';

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

  DateFrom;
  DateTo;

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

  createChart() {
    var dps = [];

    var chart = new CanvasJS.Chart('chartContainer', {
      title: {
        text: 'Sales Report',
      },
      data: [
        {
          type: 'line',
          dataPoints: randomData(new Date(2022, 0, 1), 400),
        },
      ],
    });
    chart.render();

    var axisXMin = chart.axisX[0].get('minimum');
    var axisXMax = chart.axisX[0].get('maximum');

    function randomData(startX, numberOfY) {
      var xValue,
        yValue = 0;
      for (var i = 0; i < 400; i += 1) {
        xValue = new Date(startX.getTime() + i * 24 * 60 * 60 * 1000);
        yValue += (Math.random() * 10 - 5) << 0;

        if (yValue < 0) yValue = yValue * -1;

        dps.push({
          x: xValue,
          y: yValue,
        });
      }
      return dps;
    }

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
