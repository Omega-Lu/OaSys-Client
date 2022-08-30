import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Supplier } from 'src/app/models/supplier.model';
import { SupplierService } from 'src/app/_services/supplier.service';

@Component({
  selector: 'app-create-supplier-order',
  templateUrl: './create-supplier-order.component.html',
  styleUrls: ['./create-supplier-order.component.css'],
})
export class CreateSupplierOrderComponent implements OnInit {
  @Output() return = new EventEmitter<string>();
  suppliers: Supplier[] = [];
  supplier: Supplier;
  model: any;
  delete: boolean = false;
  searchText: any = '';
  updateSupplier: boolean = false;
  lekke: any;
  deletenumber: any;
  createSupplierOrder: boolean = false;

  constructor(private supplierService: SupplierService) {}

  ngOnInit(): void {
    this.getAllSuppliers();
  }

  getAllSuppliers() {
    this.supplierService.getAllSuppliers().subscribe((response) => {
      this.suppliers = response;
      console.log(this.suppliers);
    });
  }

  populateForm(supplier: Supplier) {
    this.supplier = supplier;
    this.createSupplierOrder = true;
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

  Return() {
    this.return.emit('false');
  }

  back() {
    this.createSupplierOrder = false;
    this.return.emit('false');
  }
}
