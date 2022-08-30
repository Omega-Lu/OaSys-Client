import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Supplier } from 'src/app/models/supplier.model';
import { SupplierService } from 'src/app/_services/supplier.service';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.css'],
})
export class AddSupplierComponent implements OnInit {
  @Output() return = new EventEmitter<string>();

  details: boolean = true;
  edetails: boolean = true;
  vdetails: boolean = true;
  cdetails: boolean = true;
  adetails: boolean = true;
  successSubmit: boolean = false;

  supplier: Supplier = {
    supplieR_ID: 0,
    name: '',
    vaT_NUMBER: 0,
    contacT_NUMBER: 0,
    alT_NUMBER: 0,
    email: '',
  };

  constructor(private suppliierService: SupplierService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.suppliierService.addSupplier(this.supplier).subscribe((response) => {
      console.log(response);
      this.successSubmit = true;
    });
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

  Return() {
    this.return.emit('false');
  }

  emailvalidate() {
    if (this.supplier.email == '') {
      this.edetails = false;
    } else {
      this.edetails = true;
    }
  }

  Contactvalidate() {
    if (this.supplier.contacT_NUMBER < 1) {
      this.cdetails = false;
    } else {
      this.cdetails = true;
    }
  }

  Vatvalidate() {
    if (this.supplier.vaT_NUMBER < 1) {
      this.vdetails = false;
    } else {
      this.vdetails = true;
    }
  }

  Altvalidate() {
    if (this.supplier.alT_NUMBER < 1) {
      this.adetails = false;
    } else {
      this.adetails = true;
    }
  }
}
