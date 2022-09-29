import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Supplier } from 'src/app/models/supplier.model';
import { SupplierService } from 'src/app/_services/supplier.service';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/_services/order.service';

//audit log
import { AuditLog } from 'src/app/models/AuditLog.model';
import { AuditLogService } from 'src/app/_services/AuditLog.service';
import { CurrentUserService } from 'src/app/_services/CurrentUser.service';

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

  //audit log
  auditLog: AuditLog = {
    auditLogID: 0,
    userID: 0,
    employeeID: 0,
    functionUsed: 'Delete Supplier',
    date: new Date(),
    month: 'Oct',
  };

  constructor(
    private supplierService: SupplierService,
    private OrderService: OrderService,
    private CurrentUserService: CurrentUserService,
    private AuditLogService: AuditLogService
  ) {}

  ngOnInit(): void {
    this.getAllSuppliers();
    this.CurrentUserService.getAllCurrentUsers().subscribe((res) => {
      this.auditLog.userID = res[res.length - 1].userID;
      this.auditLog.employeeID = res[res.length - 1].employeeID;
    });
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
      return (
        order.supplierID == this.supplier.supplieR_ID &&
        order.orderStatusID == 'Placed'
      );
    });

    if (this.ordersTemp.length > 0) this.hasReference = true;
    else this.hasReference = false;
  }

  deleteSupplier() {
    this.ordersTemp = this.orders.filter((order) => {
      return order.supplierID == this.supplier.supplieR_ID;
    });

    if (this.ordersTemp.length > 0) {
      this.supplier.deleted = true;
      this.supplierService.updateSupplier(this.supplier).subscribe((res) => {
        console.log('Hidden Supplier');
        console.log(res);
        this.successDelete = true;
      });
    } else {
      this.supplierService
        .deleteSupplier(this.supplier.supplieR_ID)
        .subscribe((response) => {
          this.getAllSuppliers();
          console.log('deleted supplier');
          console.log(response);
          this.successDelete = true;
        });
    }

    //add to audit log
    this.AuditLogService.addAuditLog(this.auditLog).subscribe((res) => {
      console.log('new audit log entry');
      console.log(res);
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
