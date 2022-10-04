import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Vat } from 'src/app/models/Vat.model';
import { VatService } from 'src/app/_services/Vat.service';

import { ValidationServicesComponent } from 'src/app/validation-services/validation-services.component';

//audit log
import { AuditLog } from 'src/app/models/AuditLog.model';
import { AuditLogService } from 'src/app/_services/AuditLog.service';
import { CurrentUserService } from 'src/app/_services/CurrentUser.service';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-update-vat',
  templateUrl: './update-vat.component.html',
  styleUrls: ['./update-vat.component.css'],
})
export class UpdateVatComponent implements OnInit {
  @Output() return = new EventEmitter<string>();
  //vat
  vat: Vat;
  vats: Vat[] = [];
  vatsTemp: Vat[] = [];

  successSubmit: boolean = false;

  //validate
  validate: ValidationServicesComponent = new ValidationServicesComponent();
  validVat: boolean = true;

  //audit log
  auditLog: AuditLog = {
    auditLogID: 0,
    userID: 0,
    employeeID: 0,
    functionUsed: 'Update VAT',
    date: new Date(),
    month: 'Oct',
  };
  constructor(
    private vatService: VatService,
    private CurrentUserService: CurrentUserService,
    private AuditLogService: AuditLogService
  ) {}

  ngOnInit(): void {
    this.vatService.getAllVatses().subscribe((res) => {
      this.vats = res;
      this.vat = res[0];
    });

    this.CurrentUserService.getAllCurrentUsers().subscribe((res) => {
      this.auditLog.userID = res[res.length - 1].userID;
      this.auditLog.employeeID = res[res.length - 1].employeeID;
    });
  }

  validateVat() {
    console.log(this.vat.vatAmount);
    this.validVat = this.validate.ValidateMoney(this.vat.vatAmount);
  }

  onSubmit() {
    if (this.vats.length > 0) {
      this.vats[0].vatAmount = this.vat.vatAmount;
      this.vatService.updateVat(this.vats[0]).subscribe((res) => {
        console.log('updated.vat');
        console.log(res);
      });
    } else {
      this.vatService.addVat(this.vat).subscribe((res) => {
        console.log('new vat');
        console.log(res);
      });
    }

    //add to audit log
    this.AuditLogService.addAuditLog(this.auditLog).subscribe((res) => {
      console.log('new audit log entry');
      console.log(res);
      this.successSubmit = true;
    });
  }

  Return() {
    this.return.emit('false');
  }
}
