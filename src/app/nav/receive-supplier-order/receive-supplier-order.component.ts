import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Supplier } from 'src/app/models/supplier.model';
import { SupplierService } from 'src/app/_services/supplier.service';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/_services/order.service';

@Component({
  selector: 'app-receive-supplier-order',
  templateUrl: './receive-supplier-order.component.html',
  styleUrls: ['./receive-supplier-order.component.css'],
})
export class ReceiveSupplierOrderComponent implements OnInit {
  @Output() return = new EventEmitter<string>();

  suppliers: Supplier[] = [];
  supplier: Supplier;

  orders: Order[] = [];
  order: Order;

  dynamicArray = [];
  tempArray = [];

  boolReceive: boolean = false;

  constructor(
    private supplierService: SupplierService,
    private orderService: OrderService
  ) {}

  async ngOnInit() {
    await this.getAllOrders();
    await this.getAllSuppliers();

    await this.sleep(150);

    await this.forLoop();
  }

  async forLoop() {
    console.log(this.orders.length);
    for (let i = 0; i < this.orders.length; i++) {
      console.log('for begin');
      const element = this.orders[i];
      this.getAllSuppliers();
      await this.sleep(75);
      this.suppliers = this.suppliers.filter((supplier) => {
        console.log(supplier.supplieR_ID == element.supplierID);
        return supplier.supplieR_ID == element.supplierID;
      });

      this.dynamicArray.push({
        OrderID: element.orderID,
        SupplierName: this.suppliers[0].name,
        DatePlaced: element.datePlaced,
      });
      console.log('for klaar');
      this.tempArray = this.dynamicArray;
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
      if (this.orders[index].orderID == i)
        this.order = this.orders[index];
        console.log('order is gevind');
    }
  }
}
