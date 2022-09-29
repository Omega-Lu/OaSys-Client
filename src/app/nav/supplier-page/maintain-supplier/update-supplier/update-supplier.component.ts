import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Supplier } from 'src/app/models/supplier.model';
import { SupplierService } from 'src/app/_services/supplier.service';
import { ValidationServicesComponent } from 'src/app/validation-services/validation-services.component';

//audit log
import { AuditLog } from 'src/app/models/AuditLog.model';
import { AuditLogService } from 'src/app/_services/AuditLog.service';
import { CurrentUserService } from 'src/app/_services/CurrentUser.service';

@Component({
  selector: 'app-update-supplier',
  templateUrl: './update-supplier.component.html',
  styleUrls: ['./update-supplier.component.css'],
})
export class UpdateSupplierComponent implements OnInit {
  @Input() supplier: Supplier;
  suppliers: Supplier[] = [];
  suppliersTemp: Supplier[] = [];

  @Output() return = new EventEmitter<string>();
  details: boolean = true;
  vdetails: boolean = true;
  cdetails: boolean = true;
  adetails: boolean = true;
  edetails: boolean = true;
  validAlt: boolean = true;
  successUpdate: boolean = false;

  //unique variables
  uniqueName: boolean = true;
  uniqueVat: boolean = true;
  uniqueEmail: boolean = true;
  uniqueContactNumber: boolean = true;

  //use validation
  validate: ValidationServicesComponent = new ValidationServicesComponent();

  //audit log
  auditLog: AuditLog = {
    auditLogID: 0,
    userID: 0,
    employeeID: 0,
    functionUsed: 'Update Supplier',
    date: new Date(),
    month: 'Oct',
  };

  constructor(
    private supplierService: SupplierService,
    private CurrentUserService: CurrentUserService,
    private AuditLogService: AuditLogService
  ) {}

  ngOnInit() {
    this.supplierService.getAllSuppliers().subscribe((res) => {
      console.log('this is all the suppliers');
      console.log(res);
      this.suppliers = res;
      this.suppliersTemp = res;
    });

    this.CurrentUserService.getAllCurrentUsers().subscribe((res) => {
      this.auditLog.userID = res[res.length - 1].userID;
      this.auditLog.employeeID = res[res.length - 1].employeeID;
    });
  }

  ///////////////////// update supplier //////////////////////////////////////

  onSubmit() {
    this.supplierService.updateSupplier(this.supplier).subscribe((response) => {
      console.log('updated supplier');
      console.log(response);

      //add to audit log
      this.AuditLogService.addAuditLog(this.auditLog).subscribe((res) => {
        console.log('new audit log entry');
        console.log(res);
        this.successUpdate = true;
      });
    });
  }

  //////////////////// validation functions /////////////////////////////////

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

  compareName() {
    this.suppliersTemp = this.suppliers;
    this.suppliersTemp = this.suppliersTemp.filter((temp) => {
      return (
        temp.name == this.supplier.name &&
        temp.supplieR_ID != this.supplier.supplieR_ID
      );
    });
    if (this.suppliersTemp.length > 0) {
      if (this.suppliersTemp[0].deleted) {
      } else {
        this.uniqueName = false;
      }
    } else this.uniqueName = true;
  }

  ValidateVat() {
    this.vdetails = this.validate.ValdiateVatNumber(this.supplier.vaT_NUMBER);
  }

  compareVat() {
    this.suppliersTemp = this.suppliers;
    this.suppliersTemp = this.suppliersTemp.filter((temp) => {
      return (
        temp.vaT_NUMBER == this.supplier.vaT_NUMBER &&
        temp.supplieR_ID != this.supplier.supplieR_ID
      );
    });
    if (this.suppliersTemp.length > 0) {
      this.uniqueVat = false;
    } else this.uniqueVat = true;
  }

  ValidateContactNumber() {
    this.cdetails = this.validate.ValidateContactNumber(
      this.supplier.contacT_NUMBER
    );
  }

  compareContactNumber() {
    this.suppliersTemp = this.suppliers;
    this.suppliersTemp = this.suppliersTemp.filter((temp) => {
      return (
        temp.contacT_NUMBER == this.supplier.contacT_NUMBER &&
        temp.supplieR_ID != this.supplier.supplieR_ID
      );
    });
    if (this.suppliersTemp.length > 0) {
      if (this.suppliersTemp[0].deleted) {
      } else {
        this.uniqueContactNumber = false;
      }
    } else this.uniqueContactNumber = true;

    if (this.supplier.contacT_NUMBER == this.supplier.alT_NUMBER)
      this.validAlt = false;
    else this.validAlt = true;
  }

  VaildateAltNumber() {
    this.adetails = this.validate.ValidateContactNumber(
      this.supplier.alT_NUMBER
    );
  }

  ValidateEmail() {
    this.edetails = this.validate.ValidateEmail(this.supplier.email);
  }

  compareEmail() {
    this.suppliersTemp = this.suppliers;
    this.suppliersTemp = this.suppliersTemp.filter((temp) => {
      return (
        temp.email == this.supplier.email &&
        temp.supplieR_ID != this.supplier.supplieR_ID
      );
    });
    if (this.suppliersTemp.length > 0) {
      this.uniqueEmail = false;
    } else this.uniqueEmail = true;
  }

  Return() {
    this.return.emit('false');
  }
}
