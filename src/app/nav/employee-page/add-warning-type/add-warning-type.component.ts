import { Component, OnInit } from '@angular/core';
import { WarningType } from 'src/app/models/warning-type.model';
import { WarningTypeService } from 'src/app/_services/warning-type.service';
import { ValidationServicesComponent } from 'src/app/validation-services/validation-services.component';

//audit log
import { AuditLog } from 'src/app/models/AuditLog.model';
import { AuditLogService } from 'src/app/_services/AuditLog.service';
import { CurrentUserService } from 'src/app/_services/CurrentUser.service';

@Component({
  selector: 'app-add-warning-type',
  templateUrl: './add-warning-type.component.html',
  styleUrls: ['./add-warning-type.component.css'],
})
export class AddWarningTypeComponent implements OnInit {
  //import validation
  validate: ValidationServicesComponent = new ValidationServicesComponent();

  successSubmit: boolean = false;
  validWarning: boolean = true;

  //warning type
  warningType: WarningType = {
    warninG_TYPE_ID: 0,
    description: '',
    deleted: false,
  };
  warningTypes: WarningType[] = [];
  warningTypesTemp: WarningType[] = [];

  //unique Vaiables
  uniqueName: boolean = true;

  //audit log
  auditLog: AuditLog = {
    auditLogID: 0,
    userID: 0,
    employeeID: 0,
    functionUsed: 'Add Warning Type',
    date: new Date(),
    month: 'Oct',
  };

  constructor(
    private warningTypeService: WarningTypeService,
    private CurrentUserService: CurrentUserService,
    private AuditLogService: AuditLogService
  ) {}

  ngOnInit(): void {
    this.warningTypeService.getAllEmployees().subscribe((res) => {
      console.log('this is all the warning types');
      console.log(res);
      this.warningTypes = res;
    });

    this.CurrentUserService.getAllCurrentUsers().subscribe((res) => {
      this.auditLog.userID = res[res.length - 1].userID;
      this.auditLog.employeeID = res[res.length - 1].employeeID;
    });
  }

  FormValidate() {
    this.validateName();
  }

  /////////////////////// add warning type ///////////////////////////////////

  onSubmit() {
    if (this.warningType.warninG_TYPE_ID != 0) {
      this.warningType.deleted = false;
      this.warningTypeService
        .updateEmployee(this.warningType)
        .subscribe((res) => {
          console.log('reActivated Warning Type');
          console.log(res);
        });
    } else {
      this.warningTypeService
        .addEmployee(this.warningType)
        .subscribe((response) => {
          console.log('new warning type');
          console.log(response);
        });
    }

    //add to audit log
    this.AuditLogService.addAuditLog(this.auditLog).subscribe((res) => {
      console.log('new audit log entry');
      console.log(res);
      this.successSubmit = true;
    });
  }

  validateName() {
    this.validWarning = this.validate.ValidateString(
      this.warningType.description
    );
    this.compareName();
  }

  compareName() {
    this.warningTypesTemp = this.warningTypes;
    this.warningTypesTemp = this.warningTypesTemp.filter((type) => {
      return type.description == this.warningType.description;
    });

    if (this.warningTypesTemp.length > 0) {
      if (this.warningTypesTemp[0].deleted) {
        this.warningType.warninG_TYPE_ID =
          this.warningTypesTemp[0].warninG_TYPE_ID;
      } else this.uniqueName = false;
    } else this.uniqueName = true;
  }
}
