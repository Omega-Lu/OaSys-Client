import { Component, OnInit, ViewChild } from '@angular/core';
import { AuditLogService } from 'src/app/_services/AuditLog.service';
import { AuditLog } from 'src/app/models/AuditLog.model';
import { Sale } from 'src/app/models/Sale.model';
import { SaleService } from 'src/app/_services/Sale.service';
import { CanvasJS } from 'src/assets/js/canvasjs.angular.component';
import * as $ from 'jquery';

//audit log
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { CurrentUserService } from 'src/app/_services/CurrentUser.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-sale-return-report',
  templateUrl: './sale-return-report.component.html',
  styleUrls: ['./sale-return-report.component.css'],
})
export class SaleReturnReportComponent implements OnInit {
  //audit log
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

  //audit log
  auditLog: AuditLog = {
    auditLogID: 0,
    userID: 0,
    employeeID: 0,
    functionUsed: 'Print Sales Return Report',
    date: new Date(),
    month: 'Oct',
  };

  generatedBy: string = '';

  generatedChart: boolean = false;

  Date: Date = new Date();

  //help pdf
  pdfPath = 'https://localhost:7113/Resources/pdfs/Sales Return report.pdf';
  displayPDF: boolean = false;

  constructor(
    private auditLogService: AuditLogService,
    private salesService: SaleService,
    private currentUserService: CurrentUserService
  ) {}

  async ngOnInit() {
    this.getAllAudits();

    this.currentUserService.getAllCurrentUsers().subscribe((res) => {
      this.auditLog.userID = res[res.length - 1].userID;
      this.auditLog.employeeID = res[res.length - 1].employeeID;
      this.generatedBy = res[res.length - 1].username;
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

  ////////////////// get functions ///////////////////////////////////////////

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
      response = response.filter((sale) => {
        return sale.returned == true;
      });
      this.sales = response;
      console.log('this is all the sales');
      console.log(this.sales);
      this.createTable();
    });
  }

  //////////////////// valiation ///////////////////////////////////////////

  FormValidate() {
    this.validateDate();
    this.valdiateDateFrom();
    this.valdiateDateTo();
  }

  valdiateDateFrom() {
    if (this.DateFrom < '2022-0-01' || this.DateFrom == null) {
      this.validDateFrom = false;
    } else {
      this.validDateFrom = true;
    }
    this.validateDate();
  }

  valdiateDateTo() {
    let today = new Date().toISOString().split('T', 2);

    if (this.DateTo > today[0] || this.DateTo == null) {
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

  ////////////////////////// create the data for the table //////////////////

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

  /////////////////// create the chart ////////////////////////////////////

  createChart() {
    var dps = [];

    let chart = null;

    chart = new CanvasJS.Chart('chartContainer', {
      title: {
        text: 'Sales Return Report',
      },
      data: [
        {
          type: 'line',
          dataPoints: 0,
        },
      ],
    });
    chart.render();

    chart = new CanvasJS.Chart('chartContainer', {
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

    let axisXMin = null;
    let axisXMax = null;

    axisXMin = chart.axisX[0].get('minimum');
    axisXMax = chart.axisX[0].get('maximum');

    $(function () {
      $('#fromDate').val(CanvasJS.formatDate(axisXMin, 'DD MMM YYYY'));
      $('#toDate').val(CanvasJS.formatDate(axisXMax, 'DD MMM YYYY'));
    });

    chart.axisX[0].set('minimum', new Date(this.DateFrom.toString()));
    chart.axisX[0].set('maximum', new Date(this.DateTo.toString()));

    this.salesData = [];
    this.salesDataTemp = [];
    this.salesDataY = [];

    this.generatedChart = true;
  }

  //////////////////// create the sale data //////////////////////////////////

  dps = [];

  saleData() {
    var xValue = null,
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

  ///////////////// print ///////////////////////////////////////////////////

  PDF;

  print() {
    let ccanvas = document.getElementById('htmlData');
    html2canvas(ccanvas).then((canvas) => {
      let fileWidth = 590;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      this.PDF = new jsPDF('p', 'pt', 'a4');
      let position = 0;
      this.PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      this.PDF.save('Sale-Returns-Report.pdf');
    });

    //add to audit log
    this.auditLogService.addAuditLog(this.auditLog).subscribe((res) => {
      console.log('new audit log entry');
      console.log(res);
    });
  }
}
