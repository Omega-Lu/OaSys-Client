import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Supplier } from 'src/app/models/supplier.model';
import { SupplierService } from 'src/app/_services/supplier.service';
import { ValidationServicesComponent } from 'src/app/validation-services/validation-services.component';

//audit log
import { AuditLog } from 'src/app/models/AuditLog.model';
import { AuditLogService } from 'src/app/_services/AuditLog.service';
import { CurrentUserService } from 'src/app/_services/CurrentUser.service';
import { of } from 'rxjs';

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
  validAlt: boolean = true;

  //supplier model
  supplier: Supplier = {
    supplieR_ID: 0,
    name: '',
    vaT_NUMBER: null,
    contacT_NUMBER: null,
    alT_NUMBER: null,
    email: '',
    deleted: false,
  };
  suppliers: Supplier[] = [];
  suppliersTemp: Supplier[] = [];

  //use validation
  validate: ValidationServicesComponent = new ValidationServicesComponent();

  //unique variables
  uniqueName: boolean = true;
  uniqueVat: boolean = true;
  uniqueEmail: boolean = true;
  uniqueContactNumber: boolean = true;

  //audit log
  auditLog: AuditLog = {
    auditLogID: 0,
    userID: 0,
    employeeID: 0,
    functionUsed: 'Add Supplier',
    date: new Date(),
    month: 'Oct',
  };

  constructor(
    private suppliierService: SupplierService,
    private CurrentUserService: CurrentUserService,
    private AuditLogService: AuditLogService
  ) {}

  ngOnInit() {
    this.suppliierService.getAllSuppliers().subscribe((res) => {
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

  ///////////////////////// add supplier ////////////////////////////////////

  onSubmit() {
    if (this.supplier.supplieR_ID == 0) {
      this.suppliierService.addSupplier(this.supplier).subscribe((response) => {
        console.log(response);
        this.successSubmit = true;
      });
    } else {
      this.supplier.deleted == false;
      this.suppliierService.updateSupplier(this.supplier).subscribe((res) => {
        console.log('reActivated Supplier');
        console.log(res);
        this.successSubmit = true;
      });
    }
    //add to audit log
    this.AuditLogService.addAuditLog(this.auditLog).subscribe((res) => {
      console.log('new audit log entry');
      console.log(res);
      this.successSubmit = true;
    });
  }

  /////////////////// validate functions/////////////////////////////////////

  FormValidate() {
    this.ValidateName();
    this.ValidateVat();
    this.ValidateContactNumber();
    this.VaildateAltNumber();
    this.ValidateEmail();
  }

  ValidateName() {
    this.details = this.validate.ValidateString(this.supplier.name);
    this.compareName();
  }

  compareName() {
    this.suppliersTemp = this.suppliers;
    this.suppliersTemp = this.suppliersTemp.filter((temp) => {
      return temp.name == this.supplier.name;
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
    this.compareVat();
  }

  compareVat() {
    this.suppliersTemp = this.suppliers;
    this.suppliersTemp = this.suppliersTemp.filter((temp) => {
      return temp.vaT_NUMBER == this.supplier.vaT_NUMBER;
    });
    if (this.suppliersTemp.length > 0) {
      if (this.suppliersTemp[0].deleted)
        this.supplier.supplieR_ID = this.suppliersTemp[0].supplieR_ID;
      else {
        this.uniqueVat = false;
      }
    } else this.uniqueVat = true;
  }

  ValidateContactNumber() {
    this.cdetails = this.validate.ValidateContactNumber(
      this.supplier.contacT_NUMBER
    );
    this.compareContactNumber();
  }

  compareContactNumber() {
    this.suppliersTemp = this.suppliers;
    this.suppliersTemp = this.suppliersTemp.filter((temp) => {
      return temp.contacT_NUMBER == this.supplier.contacT_NUMBER;
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
    this.compareEmail();
  }

  compareEmail() {
    this.suppliersTemp = this.suppliers;
    this.suppliersTemp = this.suppliersTemp.filter((temp) => {
      return temp.email == this.supplier.email;
    });
    if (this.suppliersTemp.length > 0) {
      if (this.suppliersTemp[0].deleted) {
      } else {
        this.uniqueEmail = false;
      }
    } else this.uniqueEmail = true;
  }
}
