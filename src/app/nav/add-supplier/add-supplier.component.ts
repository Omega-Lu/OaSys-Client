import { Component, OnInit } from '@angular/core';
import { Supplier } from 'src/app/models/supplier.model';
import { SupplierService } from 'src/app/_services/supplier.service';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.css']
})
export class AddSupplierComponent implements OnInit {

  details: boolean = true;

  supplier: Supplier = {
    supplieR_ID: 0,
    name: "",
    vaT_NUMBER: 0,
    contacT_NUMBER: 0,
    alT_NUMBER: 0,
    email: ""
  }

  constructor(private suppliierService: SupplierService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.suppliierService.addSupplier(this.supplier).subscribe(response =>{
      console.log(response);
    })
    
  }

 namevalidate() {
    var matches = this.supplier.name.match(/\d+/g);
 if (this.supplier.name == '') {
     this.details = false;
    } else {
      this.details = true;
    }
  }

}
