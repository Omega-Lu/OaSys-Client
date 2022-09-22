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

  //supplier
  supplier: Supplier;
  suppliers: Supplier[] = [];
  suppliersTemp: Supplier[] = [];

  searchText: any = '';

  createSupplierOrder: boolean = false;

  constructor(private supplierService: SupplierService) {}

  ngOnInit(): void {
    this.getAllSuppliers();
  }

  getAllSuppliers() {
    this.supplierService.getAllSuppliers().subscribe((response) => {
      response = response.filter((supplier) => {
        return supplier.deleted == false;
      });
      this.suppliersTemp = response;
      this.suppliers = response;
      console.log('All the Suppliers');
      console.log(this.suppliers);
    });
  }

  populateForm(supplier: Supplier) {
    this.supplier = supplier;
    this.createSupplierOrder = true;
  }

  Search() {
    this.suppliersTemp = this.suppliers.filter((supplier) => {
      return (
        supplier.name.match(this.searchText) ||
        supplier.email.match(this.searchText)
      );
    });
  }

  back() {
    this.createSupplierOrder = false;
    this.return.emit('false');
  }
}
