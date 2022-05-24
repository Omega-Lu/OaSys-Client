import { Supplier } from './../../models/supplier.model';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SupplierService } from '../../_services/supplier.service';



@Component({
  selector: 'app-maintain-supplier',
  templateUrl: './maintain-supplier.component.html',
  styleUrls: ['./maintain-supplier.component.css']
})
export class MaintainSupplierComponent implements OnInit {
  @Output() Return = new EventEmitter<string>();
  suppliers: Supplier[] = [];
  supplier: Supplier;
  successDelete: boolean = false;
  model: any;
  delete: boolean = false;
  updateSupplier: boolean = false;
  searchText: any = ''
  deleteNumber: any
  constructor(private supplierService: SupplierService) { }

  ngOnInit(): void {
    this.getAllSuppliers()
  }
  getAllSuppliers(){
    this.supplierService.getAllSuppliers()
    .subscribe(
      response =>
      {this.suppliers = response;
      console.log(this.suppliers)
      }
    );
  }

  deleteSupplier(){
    this.supplierService.deleteSupplier(this.deleteNumber).subscribe((response) =>
    {this.getAllSuppliers();
    console.log(this.suppliers)
    });
  }
  populateForm(supplier: Supplier){
    this.supplier = supplier;
  }
  Search() {
    if(this.searchText !== ""){
      let searchValue = this.searchText
      console.log(searchValue);
      this.suppliers = this.suppliers.filter((supplier) =>{
        console.log(supplier.name.match(searchValue));
        return supplier.name.match(searchValue);

            });
            console.log(this.supplier);
          }
    else {
      this.getAllSuppliers();
    }
  }

  back(){
    this.Return.emit('false');
  }

}
