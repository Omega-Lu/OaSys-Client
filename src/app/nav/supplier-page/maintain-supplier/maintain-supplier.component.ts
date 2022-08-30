import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Supplier } from 'src/app/models/supplier.model';
import { SupplierService } from 'src/app/_services/supplier.service';

@Component({
  selector: 'app-maintain-supplier',
  templateUrl: './maintain-supplier.component.html',
  styleUrls: ['./maintain-supplier.component.css'],
})
export class MaintainSupplierComponent implements OnInit {
  @Output() return = new EventEmitter<string>();
  suppliers: Supplier[] = [];
  supplier: Supplier;
  successDelete: boolean = false;
  model: any;
  delete: boolean = false;
  searchText: any = '';
  updateSupplier: boolean = false;
  lekke: any;
  deletenumber: any;

  constructor(private supplierService: SupplierService) {}

  ngOnInit(): void {
    this.getAllSuppliers();
  }

  deletee(delet: any) {
    this.deletenumber = delet;
  }

  getAllSuppliers() {
    this.supplierService.getAllSuppliers().subscribe((response) => {
      this.suppliers = response;
      console.log(this.suppliers);
    });
  }

  deleteSupplier() {
    this.supplierService
      .deleteSupplier(this.deletenumber)
      .subscribe((response) => {
        this.getAllSuppliers();
        console.log(this.supplier);
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
  }
}
