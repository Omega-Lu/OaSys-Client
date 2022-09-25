import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Supplier } from 'src/app/models/supplier.model';
import { SupplierService } from 'src/app/_services/supplier.service';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/_services/order.service';

@Component({
  selector: 'app-maintain-supplier',
  templateUrl: './maintain-supplier.component.html',
  styleUrls: ['./maintain-supplier.component.css'],
})
export class MaintainSupplierComponent implements OnInit {
  @Output() return = new EventEmitter<string>();

  //supplier
  suppliers: Supplier[] = [];
  supplier: Supplier;

  //order
  orders: Order[] = [];
  ordersTemp: Order[] = [];

  //valdiation
  hasReference: boolean = false;

  successDelete: boolean = false;
  model: any;
  delete: boolean = false;
  searchText: any = '';
  updateSupplier: boolean = false;
  lekke: any;
  deletenumber: any;

  constructor(
    private supplierService: SupplierService,
    private OrderService: OrderService
  ) {}

  ngOnInit(): void {
    this.getAllSuppliers();
  }

  deletee(delet: any) {
    this.supplier = delet;
    this.checkReference();
  }

  getAllSuppliers() {
    this.supplierService.getAllSuppliers().subscribe((res) => {
      res = res.filter((supplier) => {
        return supplier.deleted == false;
      });
      this.suppliers = res;
      this.getAllOrders();
    });
  }

  getAllOrders() {
    this.OrderService.getAllOrders().subscribe((res) => {
      this.orders = res;
      this.ordersTemp = res;
    });
  }

  checkReference() {
    this.ordersTemp = this.orders.filter((order) => {
      return order.supplierID == this.supplier.supplieR_ID;
    });

    if (this.ordersTemp.length > 0) this.hasReference = true;
    else this.hasReference = false;
  }

  deleteSupplier() {
    this.supplierService
      .deleteSupplier(this.supplier.supplieR_ID)
      .subscribe((response) => {
        this.getAllSuppliers();
        console.log('deleted supplier');
        console.log(response);
        this.successDelete = true;
      });
  }

  populateForm(supplier: Supplier) {
    this.supplier = supplier;
    this.updateSupplier = true;
  }

  Search() {
    if (this.searchText !== '') {
      let searchValue = this.searchText;
      console.log(searchValue);
      this.suppliers = this.suppliers.filter((supplier) => {
        console.log(supplier.name.match(searchValue));
        return supplier.name.match(searchValue);
      });
      console.log(this.supplier);
    } else {
      this.getAllSuppliers();
    }
  }

  back() {
    this.return.emit('false');
    this.updateSupplier = false;
    this.getAllSuppliers();
  }
}
