import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Supplier } from 'src/app/models/supplier.model';
import { SupplierService } from 'src/app/_services/supplier.service';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/_services/order.service';

@Component({
  selector: 'app-return-supplier-order',
  templateUrl: './return-supplier-order.component.html',
  styleUrls: ['./return-supplier-order.component.css'],
})
export class ReturnSupplierOrderComponent implements OnInit {
  @Output() return = new EventEmitter<string>();

  //supplier
  suppliersTemp: Supplier[] = [];
  suppliers: Supplier[] = [];
  supplier: Supplier;

  //orders
  ordersTemp: Order[] = [];
  orders: Order[] = [];
  order: Order;

  dynamicArray = [];
  tempArray = [];

  boolReturn: boolean = false;

  constructor(
    private supplierService: SupplierService,
    private orderService: OrderService
  ) {}

  async ngOnInit() {
    await this.getAllOrders();
  }

  async createDynamicArray() {
    this.dynamicArray = [];

    //get placed orders
    this.ordersTemp = this.orders.filter((order) => {
      return order.orderStatusID == 'Received';
    });

    for (let i = 0; i < this.ordersTemp.length; i++) {
      const element = this.ordersTemp[i];

      //get supplier from order
      this.suppliersTemp = this.suppliers.filter((supplier) => {
        return supplier.supplieR_ID == element.supplierID;
      });
      let supplierName = this.suppliersTemp[0].name;

      //push to dynamic array
      this.dynamicArray.push({
        OrderID: element.orderID,
        SupplierName: supplierName,
        DatePlaced: element.datePlaced,
        order: element,
        supplier: this.suppliersTemp[0],
      });
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
      this.createDynamicArray();
    });
  }

  back() {
    this.boolReturn = false;
    this.return.emit('false');
    this.getAllOrders();
  }

  populateForm(order, supplier) {
    this.order = order;
    this.supplier = supplier;
    this.boolReturn = true;
  }
}
