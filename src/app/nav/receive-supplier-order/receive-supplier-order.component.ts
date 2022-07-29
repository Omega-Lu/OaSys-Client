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
    await this.getAllOrders();
    await this.getAllSuppliers();
    await this.getAllOrderStatusses();

    await this.sleep(100);

    await this.forLoop();
    this.suppliersTemp = this.suppliers;
  }

  async forLoop() {
    console.log(this.orders.length);
    for (let i = 0; i < this.orders.length; i++) {
      console.log('for begin');
      const element = this.orders[i];
      this.orderStatussesTemp = this.orderStatusses;
      this.orderStatussesTemp = this.orderStatussesTemp.filter(
        (orderStatus) => {
          console.log(orderStatus.orderID == element.orderID);
          return orderStatus.orderID == element.orderID;
        }
      );
      if (this.orderStatussesTemp[0].description == 'Placed') {
        this.suppliersTemp = this.suppliers;
        this.suppliersTemp = this.suppliersTemp.filter((supplier) => {
          console.log(supplier.supplieR_ID == element.supplierID);
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

  Return() {
    this.return.emit('false');
  }

  getAllOrders() {
    this.orderService.getAllOrders().subscribe((response) => {
      this.orders = response;
      console.log(this.orders);
    });
  }

  getAllSuppliers() {
    this.supplierService.getAllSuppliers().subscribe((response) => {
      this.suppliers = response;
      console.log(this.suppliers);
    });
  }

  getAllOrderStatusses() {
    this.orderStatusService.getAllOrderStatuss().subscribe((response) => {
      this.orderStatusses = response;
      console.log(this.orderStatusses);
    });
  }

  sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  back() {
    this.boolReceive = false;
  }

  populateForm(i: number) {
    for (let index = 0; index < this.orders.length; index++) {
      const element = this.orders[index];
      if (this.orders[index].orderID == i) this.order = this.orders[index];
      console.log('order is gevind');
    }
  }
}
