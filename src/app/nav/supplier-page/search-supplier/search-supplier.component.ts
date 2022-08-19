
import { Component, OnInit } from '@angular/core';
import { Supplier } from 'src/app/models/supplier.model';
import { SupplierService } from 'src/app/_services/supplier.service';
import { Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-search-supplier',
  templateUrl: './search-supplier.component.html',
  styleUrls: ['./search-supplier.component.css']
})
export class SearchSupplierComponent implements OnInit {
  @Output() return = new EventEmitter<string>();
  //title = 'employees';
  suppliers: Supplier[] = [];
  searchText : string = '';

  constructor(private supplierService: SupplierService ) { 

  }

  ngOnInit(): void {
    this.getAllSuppliers();
  }

  getAllSuppliers() {
    this.supplierService.getAllSuppliers()
    .subscribe(
      response => {
        this.suppliers = response;
        console.log(this.suppliers);
      }
    );
  }

  Search() {
    if(this.searchText !== ""){
      let searchValue = this.searchText
      console.log(searchValue);
      this.suppliers = this.suppliers.filter((supplier) =>{
        console.log(supplier.name.match(searchValue));
        return supplier.name.match(searchValue);  
      
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
