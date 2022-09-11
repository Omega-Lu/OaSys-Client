import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Supplier } from 'src/app/models/supplier.model';
import { SupplierService } from 'src/app/_services/supplier.service';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/_services/order.service';
import { OrderStatus } from 'src/app/models/orderStatus.model';
import { OrderStatusService } from 'src/app/_services/orderStatus.service';

@Component({
  selector: 'app-receive-supplier-order',
  templateUrl: './receive-supplier-order.component.html',
  styleUrls: ['./receive-supplier-order.component.css'],
})
export class ReceiveSupplierOrderComponent implements OnInit {
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

  boolReceive: boolean = false;

  constructor(
    private supplierService: SupplierService,
    private orderService: OrderService,
    private orderStatusService: OrderStatusService
  ) {}

  async ngOnInit() {
    this.getAllOrders();
  }

  async forLoop() {
    this.dynamicArray = [];
    this.suppliersTemp = this.suppliers;
    console.log(this.orders.length);
    for (let i = 0; i < this.orders.length; i++) {
      console.log('for begin');
      const element = this.orders[i];
      console.log('this is the order of index ' + i);
      console.log(element);
      this.orderStatussesTemp = this.orderStatusses;
      console.log('this is the order status of index ' + i);
      console.log(this.orderStatussesTemp);
      this.orderStatussesTemp = this.orderStatussesTemp.filter(
        (orderStatus) => {
          return orderStatus.orderID == element.orderID;
        }
      );
      if (this.orderStatussesTemp[0].description == 'Placed') {
        this.suppliersTemp = this.suppliers;
        this.suppliersTemp = this.suppliersTemp.filter((supplier) => {
          return supplier.supplieR_ID == element.supplierID;
        });

        //
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
    this.boolReceive = false;
    this.return.emit('false');
    this.getAllOrders();
  }

  populateForm(i: number) {
    for (let index = 0; index < this.orders.length; index++) {
      const element = this.orders[index];
      if (this.orders[index].orderID == i) this.order = this.orders[index];
      console.log('order is gevind');
    }
    this.boolReceive = true;
  }
}
