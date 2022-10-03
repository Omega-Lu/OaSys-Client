import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { Supplier } from 'src/app/models/supplier.model';
import { SupplierService } from 'src/app/_services/supplier.service';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/_services/order.service';
import { OrderStatus } from 'src/app/models/orderStatus.model';
import { OrderStatusService } from 'src/app/_services/orderStatus.service';
import { __await } from 'tslib';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-search-supplier-order',
  templateUrl: './search-supplier-order.component.html',
  styleUrls: ['./search-supplier-order.component.css'],
})
export class SearchSupplierOrderComponent implements OnInit {
  @Output() return = new EventEmitter<string>();

  suppliersTemp: Supplier[] = [];
  suppliers: Supplier[] = [];
  supplier: Supplier;

  ordersTemp: Order[] = [];
  orders: Order[] = [];
  order: Order;

  orderStatussesTemp: OrderStatus[] = [];
  orderStatusses: OrderStatus[] = [];
  orderStatus: OrderStatus;

  dynamicArray = [];
  tempArray = [];

  searchText: any = '';

  //help pdf
  pdfPath = 'https://localhost:7113/Resources/pdfs/Search supplier order.pdf';
  displayPDF: boolean = false;

  constructor(
    private supplierService: SupplierService,
    private orderService: OrderService,
    private orderStatusService: OrderStatusService
  ) {}

  async ngOnInit() {
    await this.getAllOrders();
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

  Return() {
    this.return.emit('false');
  }

  async getAllOrders() {
    this.orderService.getAllOrders().subscribe((response) => {
      this.orders = response;
      console.log('this is all the orders');
      console.log(this.orders);
      this.getAllSuppliers();
    });
  }

  async getAllSuppliers() {
    this.supplierService.getAllSuppliers().subscribe((response) => {
      this.suppliers = response;
      console.log('this is all the suppliers');
      console.log(this.suppliers);
      this.getAllOrderStatusses();
    });
  }

  async getAllOrderStatusses() {
    this.orderStatusService.getAllOrderStatuss().subscribe((response) => {
      this.orderStatusses = response;
      console.log('this is all the order statusses');
      console.log(this.orderStatusses);
      this.forLoop();
    });
  }

  x: number = 0;

  async forLoop() {
    console.log(this.orders.length);
    for (let i = 0; i < this.orders.length; i++) {
      const element = this.orders[i];
      this.suppliersTemp = this.suppliers.filter((supplier) => {
        return supplier.supplieR_ID == element.supplierID;
      });

      this.dynamicArray.push({
        SupplierName: this.suppliersTemp[0].name,
        ContactNumber: this.suppliersTemp[0].contacT_NUMBER,
        DatePlaced: element.datePlaced,
        Status: element.orderStatusID,
      });
      this.tempArray = this.dynamicArray;
    }
  }

  sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  Search() {
    this.dynamicArray = this.tempArray;
    if (this.searchText !== '') {
      let searchValue = this.searchText;
      console.log(searchValue);
      this.dynamicArray = this.dynamicArray.filter((dynamic) => {
        console.log(dynamic.SupplierName.match(searchValue));
        return dynamic.SupplierName.match(searchValue);
      });
      console.log(this.supplier);
    } else {
      this.dynamicArray = this.tempArray;
    }
  }
}
