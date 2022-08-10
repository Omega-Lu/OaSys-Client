import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Supplier } from 'src/app/models/supplier.model';
import { SupplierService } from 'src/app/_services/supplier.service';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/_services/order.service';
import { OrderStatus } from 'src/app/models/orderStatus.model';
import { OrderStatusService } from 'src/app/_services/orderStatus.service';
import { __await } from 'tslib';

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

  constructor(
    private supplierService: SupplierService,
    private orderService: OrderService,
    private orderStatusService: OrderStatusService
  ) {}

  async ngOnInit() {
    await this.getAllOrderStatusses();
    await this.getAllOrders();
    await this.getAllSuppliers();

    await this.sleep(150);
    console.log('voor for');
    await this.forLoop();
    console.log('na for');
    console.log(this.orders.length);
  }

  Return() {
    this.return.emit('false');
  }

  async getAllSuppliers() {
    this.supplierService.getAllSuppliers().subscribe((response) => {
      this.suppliers = response;
      console.log(this.suppliers);
    });
  }

  async getAllOrders() {
    this.orderService.getAllOrders().subscribe((response) => {
      this.orders = response;
      console.log(this.orders);
    });
  }

  async getAllOrderStatusses() {
    this.orderStatusService.getAllOrderStatuss().subscribe((response) => {
      this.orderStatusses = response;
      console.log(this.orderStatusses);
    });
  }

  x: number = 0;

  async forLoop() {
    console.log(this.orders.length);
    for (let i = 0; i < this.orders.length; i++) {
      console.log('for begin');
      const element = this.orders[i];
      this.suppliersTemp = this.suppliers;
      this.suppliersTemp = this.suppliersTemp.filter((supplier) => {
        console.log(supplier.supplieR_ID == element.supplierID);
        return supplier.supplieR_ID == element.supplierID;
      });
      this.orderStatussesTemp = this.orderStatusses;
      this.orderStatussesTemp = this.orderStatussesTemp.filter(
        (orderStatus) => {
          console.log(orderStatus.orderID == element.orderID);
          return orderStatus.orderID == element.orderID;
        }
      );

      if (this.orderStatussesTemp[0].description == 'Placed') {
        this.dynamicArray.push({
          SupplierName: this.suppliersTemp[0].name,
          ContactNumber: this.suppliersTemp[0].contacT_NUMBER,
          DatePlaced: element.datePlaced,
          Status: this.orderStatussesTemp[0].description,
        });
        console.log('for klaar');
        this.tempArray = this.dynamicArray;
      }
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
