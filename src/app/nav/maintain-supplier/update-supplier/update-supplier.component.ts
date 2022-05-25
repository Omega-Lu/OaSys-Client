import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Supplier } from 'src/app/models/supplier.model';
import { SupplierService } from 'src/app/_services/supplier.service';

@Component({
  selector: 'app-update-supplier',
  templateUrl: './update-supplier.component.html',
  styleUrls: ['./update-supplier.component.css']
})
export class UpdateSupplierComponent implements OnInit {
  @Input() supplier: Supplier;

  @Output() return = new EventEmitter<string>();
  details: boolean = true;
  vdetails: boolean = true;
  cdetails: boolean = true;
  adetails: boolean = true;
  edetails: boolean = true;
  successSubmit : boolean = false;

  constructor(private supplierService: SupplierService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.supplierService.updateSupplier(this.supplier)
    .subscribe( response => {
      console.log(response);
    })
    this.successSubmit = true;
  }

  namevalidate() {
    var matches = this.supplier.name.match(/\d+/g);
    if (matches != null) {
     this.details = false;
    } else if (this.supplier.name == '') {
     this.details = false;
    } else {
      this.details = true;
    }
  }

  emailvalidate() {
    if (this.supplier.email == '') {
        this.edetails = false;
       } else {
         this.edetails = true;
       }
     }

}
