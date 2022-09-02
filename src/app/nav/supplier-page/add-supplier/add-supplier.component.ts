import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Supplier } from 'src/app/models/supplier.model';
import { SupplierService } from 'src/app/_services/supplier.service';
import { ValidationServicesComponent } from 'src/app/validation-services/validation-services.component';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.css'],
})
export class AddSupplierComponent implements OnInit {
  @Output() return = new EventEmitter<string>();

  details: boolean = true;
  sdeta;
  edetails: boolean = true;
  vdetails: boolean = true;
  cdetails: boolean = true;
  adetails: boolean = true;
  successSubmit: boolean = false;

  //supplier model
  supplier: Supplier = {
    supplieR_ID: 0,
    name: '',
    vaT_NUMBER: 0,
    contacT_NUMBER: 0,
    alT_NUMBER: 0,
    email: '',
  };

  //use validation
  validate: ValidationServicesComponent = new ValidationServicesComponent();

  constructor(private suppliierService: SupplierService) {}

  ngOnInit() {}

  onSubmit() {
    this.suppliierService.addSupplier(this.supplier).subscribe((response) => {
      console.log(response);
      this.successSubmit = true;
    });
  }

  FormValidate() {
    this.ValidateName();
    this.ValidateVat();
    this.ValidateContactNumber();
    this.VaildateAltNumber();
    this.ValidateEmail();
  }

  ValidateName() {
    this.details = this.validate.ValidateString(this.supplier.name);
  }

  ValidateVat() {
    this.vdetails = this.validate.ValdiateVatNumber(this.supplier.vaT_NUMBER);
  }

  ValidateContactNumber() {
    this.cdetails = this.validate.ValidateContactNumber(
      this.supplier.contacT_NUMBER
    );
  }

  VaildateAltNumber() {
    this.adetails = this.validate.ValidateContactNumber(
      this.supplier.alT_NUMBER
    );
  }

  ValidateEmail() {
    this.edetails = this.validate.ValidateEmail(this.supplier.email);
  }

  Return() {
    this.return.emit('false');
  }
}
