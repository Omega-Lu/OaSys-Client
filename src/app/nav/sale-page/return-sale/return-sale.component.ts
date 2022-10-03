import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { Sale } from 'src/app/models/Sale.model';
import { PaymentService } from 'src/app/_services/Payment.service';
import { SaleService } from 'src/app/_services/Sale.service';
import { Payment } from 'src/app/models/Payment.model';
import { PaymentType } from 'src/app/models/PaymentType.model';
import { PaymentTypeService } from 'src/app/_services/PaymentType.service';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-return-sale',
  templateUrl: './return-sale.component.html',
  styleUrls: ['./return-sale.component.css'],
})
export class ReturnSaleComponent implements OnInit {
  @Output() return = new EventEmitter<string>();

  // sale
  sale: Sale;
  sales: Sale[] = [];
  salesTemp: Sale[] = [];

  // payment
  payment: Payment;
  payments: Payment[] = [];
  paymentsTemp: Payment[] = [];

  // payment type
  paymentType: PaymentType;
  paymentTypes: PaymentType[] = [];
  paymentTypesTemp: PaymentType[] = [];

  dynamicArray = [];
  TempArray = [];

  searchText: number;

  ReturnSale: boolean = false;

  //help pdf
  pdfPath = 'https://localhost:7113/Resources/pdfs/Return Sale.pdf';
  displayPDF: boolean = false;

  constructor(
    private saleService: SaleService,
    private paymentService: PaymentService,
    private paymentTypeService: PaymentTypeService
  ) {}

  async ngOnInit() {
    this.getAllSales();
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

  ////////////////////////////// get Funtions /////////////////////////////////

  getAllSales() {
    this.saleService.getAllSales().subscribe((response) => {
      response = response.filter((res) => {
        return res.returned == false;
      });
      this.sales = response;
      this.salesTemp = response;
      console.log('this is all the sales');
      console.log(this.sales);
      this.getAllPayments();
    });
  }

  getAllPayments() {
    this.paymentService.getAllPayments().subscribe((response) => {
      this.payments = response;
      this.paymentsTemp = response;
      console.log('this is all the payments');
      console.log(this.payments);
      this.getAllPaymentTypes();
    });
  }

  getAllPaymentTypes() {
    this.paymentTypeService.getAllPaymentTypes().subscribe((response) => {
      this.paymentTypes = response;
      console.log('this is all the paymentTypes');
      console.log(this.paymentTypes);

      this.createDynamicArray();
    });
  }

  /////////////////////// create the dynamic array ////////////////////////////////

  createDynamicArray() {
    this.dynamicArray = [];

    for (let i = 0; i < this.salesTemp.length; i++) {
      const element = this.salesTemp[i];

      this.paymentsTemp = this.payments.filter((payment) => {
        return payment.paymentID == element.paymentID;
      });

      this.dynamicArray.push({
        saleID: element.saleID,
        date: element.date,
        method: this.paymentsTemp[0].paymentTypeID,
        total: element.total,
        sale: element,
      });
    }
    this.TempArray = this.dynamicArray;
  }

  delete(id) {
    this.saleService.deleteSale(id).subscribe((res) => {
      console.log('deleted sale');
      console.log(res);
    });
  }

  ///////////////////////// search function /////////////////////////////////////

  Search() {
    this.TempArray = this.dynamicArray;
    this.salesTemp = this.sales;
    console.log(this.searchText);
    if (
      this.searchText < -1 ||
      this.searchText == null ||
      this.searchText.toString() == ''
    ) {
      this.TempArray = this.dynamicArray;
    } else {
      let searchValue = this.searchText;
      console.log(searchValue);
      this.TempArray = this.TempArray.filter((dynamic) => {
        return (
          dynamic.saleID.toString().match(searchValue) ||
          dynamic.date.toString().match(searchValue) ||
          dynamic.method.match(searchValue)
        );
      });
      console.log(this.sale);
    }
  }

  //////////////////////// populate next Form ////////////////////////////

  populateForm(i) {
    this.sale = i;
    this.ReturnSale = true;
  }

  back() {
    this.ReturnSale = false;
    this.ngOnInit();
  }
}
