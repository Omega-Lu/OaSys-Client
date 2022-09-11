import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Supplier } from 'src/app/models/supplier.model';
import { SupplierService } from 'src/app/_services/supplier.service';
import { ValidationServicesComponent } from 'src/app/validation-services/validation-services.component';

@Component({
  selector: 'app-update-supplier',
  templateUrl: './update-supplier.component.html',
  styleUrls: ['./update-supplier.component.css'],
})
export class UpdateSupplierComponent implements OnInit {
  @Input() supplier: Supplier;

  @Output() return = new EventEmitter<string>();
  details: boolean = true;
  vdetails: boolean = true;
  cdetails: boolean = true;
  adetails: boolean = true;
  edetails: boolean = true;
  successUpdate: boolean = false;

  //use validation
  validate: ValidationServicesComponent = new ValidationServicesComponent();

  constructor(private supplierService: SupplierService) {}

  ngOnInit() {}

  onSubmit() {
    this.supplierService.updateSupplier(this.supplier).subscribe((response) => {
      console.log(response);
      this.successUpdate = true;
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
