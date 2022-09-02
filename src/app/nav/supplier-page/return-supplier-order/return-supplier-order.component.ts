import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Supplier } from 'src/app/models/supplier.model';
import { SupplierService } from 'src/app/_services/supplier.service';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/_services/order.service';
import { OrderStatus } from 'src/app/models/orderStatus.model';
import { OrderStatusService } from 'src/app/_services/orderStatus.service';

@Component({
  selector: 'app-return-supplier-order',
  templateUrl: './return-supplier-order.component.html',
  styleUrls: ['./return-supplier-order.component.css'],
})
export class ReturnSupplierOrderComponent implements OnInit {
  @Output() return = new EventEmitter<string>();

  suppliersTemp: Supplier[] = [];
  suppliers: Supplier[] = [];
  supplier: Supplier;

  orders: Order[] = [];
  order: Order;

  orderStatus: OrderStatus;
  orderStatusses: OrderStatus[] = [];
  orderStatussesTemp: OrderStatus[] = [];

  dynamicArray = [];
  tempArray = [];

  boolReturn: boolean = false;

  constructor(
    private supplierService: SupplierService,
    private orderStatusService: OrderStatusService,
    private orderService: OrderService
  ) {}

  async ngOnInit() {
    await this.getAllOrders();
  }

  async forLoop() {
    console.log(this.orders.length);
    for (let i = 0; i < this.orders.length; i++) {
      console.log('for begin');
      const element = this.orders[i];
      this.orderStatussesTemp = this.orderStatusses;
      this.orderStatussesTemp = this.orderStatussesTemp.filter(
        (orderStatus) => {

          return orderStatus.orderID == element.orderID;
        }
      );
      if (this.orderStatussesTemp[0].description == 'Received') {
        this.suppliersTemp = this.suppliers;
        this.suppliersTemp = this.suppliersTemp.filter((supplier) => {

          return supplier.supplieR_ID == element.supplierID;
        });

        this.dynamicArray.push({
          OrderID: element.orderID,
          SupplierName: this.suppliersTemp[0].name,
          DatePlaced: element.datePlaced,
        });
        console.log('for klaar');
        this.tempArray = this.dynamicArray;
      }
    }
  }

  getAllOrders() {
    this.orderService.getAllOrders().subscribe((response) => {
      this.orders = response;
      console.log('this is all the orders');
      console.log(this.orders);
      this.getAllSuppliers();
    });
  }

  getAllSuppliers() {
    this.supplierService.getAllSuppliers().subscribe((response) => {
      this.suppliers = response;
      console.log('this is all the suppliers');
      console.log(this.suppliers);
      this.getAllOrderStatusses();
    });
  }

  getAllOrderStatusses() {
    this.orderStatusService.getAllOrderStatuss().subscribe((response) => {
      this.orderStatusses = response;
      console.log('this is all the order statusses');
      console.log(this.orderStatusses);
      this.forLoop();
    });
  }

  sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  back() {
    this.boolReturn = false;
    this.return.emit('false');
  }

  Return() {
    this.return.emit('false');
  }

  populateForm(i: number) {
    this.suppliersTemp = this.suppliers;
    for (let index = 0; index < this.orders.length; index++) {
      const element = this.orders[index];
      if (this.orders[index].orderID == i) {
        this.order = this.orders[index];
        console.log('order is gevind');
      }
    }
    for (let index = 0; index < this.suppliersTemp.length; index++) {
      const element = this.suppliersTemp[index];
      if (this.suppliersTemp[index].supplieR_ID == this.order.supplierID) {
        this.supplier = this.suppliersTemp[index];
        console.log('supplier is gevind');
      }
    }
    this.boolReturn = true;
  }
}
