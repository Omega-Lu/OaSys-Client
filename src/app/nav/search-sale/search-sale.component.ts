import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Sale } from 'src/app/models/Sale.model';
import { PaymentService } from 'src/app/_services/Payment.service';
import { SaleService } from 'src/app/_services/Sale.service';
import { Payment } from 'src/app/models/Payment.model';
import { PaymentType } from 'src/app/models/PaymentType.model';
import { PaymentTypeService } from 'src/app/_services/PaymentType.service';

@Component({
  selector: 'app-search-sale',
  templateUrl: './search-sale.component.html',
  styleUrls: ['./search-sale.component.css'],
})
export class SearchSaleComponent implements OnInit {
  @Output() return = new EventEmitter<string>();

  sale: Sale;
  sales: Sale[] = [];
  salesTemp: Sale[] = [];

  payment: Payment;
  payments: Payment[] = [];
  paymentsTemp: Payment[] = [];

  paymentType: PaymentType;
  paymentTypes: PaymentType[] = [];
  paymentTypesTemp: PaymentType[] = [];

  dynamicArray = [];
  TempArray = [];

  searchText: number;

  viewSale: boolean = false;

  constructor(
    private saleService: SaleService,
    private paymentService: PaymentService,
    private paymentTypeService: PaymentTypeService
  ) {}

  async ngOnInit() {
    await this.sleep(150);
    this.getAllPaymentTypes();
    this.getAllPayments();
    this.getAllSales();
    await this.sleep(150);

    this.salesTemp = this.sales;
    this.paymentsTemp = this.payments;
    this.paymentTypesTemp = this.paymentTypes;

    for (let i = 0; i < this.salesTemp.length; i++) {
      const element = this.salesTemp[i];

      this.paymentTypesTemp = this.paymentTypes;

      this.paymentTypesTemp = this.paymentTypesTemp.filter((paymentType) => {
        console.log(
          paymentType.paymentTypeID == this.paymentsTemp[i].paymentTypeID
        );
        return paymentType.paymentTypeID == this.paymentsTemp[i].paymentTypeID;
      });

      this.dynamicArray.push({
        saleID: element.saleID,
        date: element.date,
        method: this.paymentTypesTemp[0].description,
        total: element.total,
      });
    }
    this.TempArray = this.dynamicArray;
  }

  sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  getAllSales() {
    this.saleService.getAllSales().subscribe((response) => {
      this.sales = response;
      console.log(this.sales);
    });
  }

  getAllPayments() {
    this.paymentService.getAllPayments().subscribe((response) => {
      this.payments = response;
      console.log(this.payments);
    });
  }

  getAllPaymentTypes() {
    this.paymentTypeService.getAllPaymentTypes().subscribe((response) => {
      this.paymentTypes = response;
      console.log(this.paymentTypes);
    });
  }

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
        console.log(dynamic.saleID == searchValue);
        return dynamic.saleID == searchValue;
      });
      console.log(this.sale);
    }
  }

  populateForm(i: number) {
    let id = i;
    this.sales = this.sales.filter((sale) => {
      console.log(sale.saleID == id);
      return sale.saleID == id;
    });

    this.sale = this.sales[0];

    this.payments = this.payments.filter((payment) => {
      console.log(payment.saleID == id);
      return payment.saleID == id;
    });

    this.payment = this.payments[0];
  }

  Return() {
    this.return.emit('false');
  }
}
