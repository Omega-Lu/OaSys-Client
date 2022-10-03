import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/_services/product.service';
import { ProductCategory } from 'src/app/models/Product-Category.model';
import { ProductCategoryService } from 'src/app/_services/product-category.service';
import { CurrentUser } from 'src/app/models/CurrentUser.model';
import { CurrentUserService } from 'src/app/_services/CurrentUser.service';
import {
  Chart,
  ChartConfiguration,
  ChartItem,
  registerables,
} from 'node_modules/chart.js';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
//import * as $ from 'jQuery';

//audit log
import { AuditLog } from 'src/app/models/AuditLog.model';
import { AuditLogService } from 'src/app/_services/AuditLog.service';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-stock-report',
  templateUrl: './stock-report.component.html',
  styleUrls: ['./stock-report.component.css'],
})
export class StockReportComponent implements OnInit {
  @Output() return = new EventEmitter<string>();

  product: Product;
  products: Product[] = [];
  productsTemp: Product[] = [];

  productCategory: ProductCategory;
  productCategories: ProductCategory[] = [];
  productCategoriesTemp: ProductCategory[] = [];

  selectedCategory;
  imgData;

  generatedBy: string = '';

  Date: Date = new Date();

  currentUser: CurrentUser;
  currentUsers: CurrentUser[] = [];
  currentUsersTemp: CurrentUser[] = [];

  //audit log
  auditLog: AuditLog = {
    auditLogID: 0,
    userID: 0,
    employeeID: 0,
    functionUsed: 'Print Stock Report',
    date: new Date(),
    month: 'Oct',
  };

  //help pdf
  pdfPath = 'https://localhost:7113/Resources/pdfs/Stock report.pdf';
  displayPDF: boolean = false;

  constructor(
    private productService: ProductService,
    private currentUserService: CurrentUserService,
    private productCategoryService: ProductCategoryService,
    private AuditLogService: AuditLogService
  ) {}

  async ngOnInit() {
    await this.getAllCurrentUsers();

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

  ////////////// get functions///////////////////////////////////

  async getAllCurrentUsers() {
    this.currentUserService.getAllCurrentUsers().subscribe((response) => {
      this.currentUsers = response;
      console.log('this is the current user for stock report');
      this.currentUser = this.currentUsers[this.currentUsers.length - 1];
      console.log(this.currentUser);
      this.generatedBy = this.currentUser.username;
      this.getAllProducts();
    });
  }

  async getAllProducts() {
    this.productService.getAllProducts().subscribe((res) => {
      res = res.filter((product) => {
        return product.deleted == false;
      });
      this.products = res;
      console.log('this is all the products');
      console.log(this.products);
      this.getAllCategories();
    });
  }

  async getAllCategories() {
    this.productCategoryService.getAllProductCategories().subscribe((res) => {
      res = res.filter((productCat) => {
        return productCat.deleted == false;
      });
      this.productCategories = res;
      console.log('this is all the product categories');
      console.log(this.productCategories);
    });
    this.buildTable();
  }

  categorySelect(id) {
    this.productsTemp = this.products;
    this.productsTemp = this.productsTemp.filter((product) => {
      console.log(product.producT_CATEGORY_ID == id);
      return product.producT_CATEGORY_ID == id;
    });

    for (let i = 0; i < this.productCategories.length; i++) {
      const element = this.productCategories[i];
      if (id == element.producT_CATEGORY_ID) {
        this.selectedCategory = element.categorY_NAME;
        break;
      }
    }

    this.createChart();
  }

  createChart() {
    var chartExist = Chart.getChart('my-chart'); // <canvas> id
    if (chartExist != undefined) chartExist.destroy();
    Chart.register(...registerables);

    let productName = [];
    let quantity = [];
    for (let i = 0; i < this.productsTemp.length; i++) {
      const element = this.productsTemp[i];
      productName[i] = element.producT_NAME;
      quantity[i] = element.quantitY_ON_HAND;
    }

    const data = {
      labels: productName,
      datasets: [
        {
          label: this.selectedCategory,
          backgroundColor: 'var(--bs-orange)',
          borderColor: 'var(--bs-orange)',
          data: quantity,
        },
      ],
    };

    const options = {
      scales: {
        y: {
          beginAtZero: true,
          display: false,
        },
      },
    };

    const config: ChartConfiguration = {
      type: 'bar',
      data: data,
      options: {
        scales: {
          y: {
            suggestedMax: 100,
            suggestedMin: 0,
          },
        },
      },
    };

    const chartItem: ChartItem = document.getElementById(
      'my-chart'
    ) as ChartItem;

    new Chart(chartItem, config);
  }

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
      this.PDF.save('Stock-Report.pdf');
    });

    //add to audit log
    this.AuditLogService.addAuditLog(this.auditLog).subscribe((res) => {
      console.log('new audit log entry');
      console.log(res);
    });
  }

  buildTable() {
    this.productsTemp = this.products;
  }

  //////////////////////////// Get Functions /////////////////////////////
}
