import { Supplier } from './../../models/supplier.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SupplierService } from '../../_services/supplier.service';


@Component({
  selector: 'app-search-supplier',
  templateUrl: './search-supplier.component.html',
  styleUrls: ['./search-supplier.component.css']
})
export class SearchSupplierComponent implements OnInit {
  @Output() return = new EventEmitter<string>();
  suppliers: Supplier[] = [];
  constructor(private supplierService: SupplierService) { }
  searchText: string = ''

  ngOnInit(): void {
    this.getAllSuppliers();
  }

  getAllSuppliers(){
    this.supplierService.getAllSuppliers()
    .subscribe(
      response => {
        this.suppliers = response;
        console.log(this.suppliers)
      });

    }
    Search() {
      if(this.searchText !== ""){
        let searchValue = this.searchText
        console.log(searchValue);
        this.suppliers = this.suppliers.filter((employee) =>{
          console.log(employee.name.match(searchValue));
          return employee.name.match(searchValue);

              });
            }
      else {
        this.getAllSuppliers();
      }
    }

    Return(){
      this.return.emit("false");
    }
}
