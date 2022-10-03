import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { Rate } from 'src/app/models/rate.model';
import { RateService } from 'src/app/_services/rate.service';
import { ValidationServicesComponent } from 'src/app/validation-services/validation-services.component';

import { EmployeeType } from 'src/app/models/employee-type.model';
import { EmployeeTypeService } from 'src/app/_services/employe-type.service';

//audit log
import { AuditLog } from 'src/app/models/AuditLog.model';
import { AuditLogService } from 'src/app/_services/AuditLog.service';
import { CurrentUserService } from 'src/app/_services/CurrentUser.service';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-update-wage-rate',
  templateUrl: './update-wage-rate.component.html',
  styleUrls: ['./update-wage-rate.component.css'],
})
export class UpdateWageRateComponent implements OnInit {
  @Input() rate: Rate;

  @Output() return = new EventEmitter<string>();

  successSubmit: boolean = false;

  validMoney: boolean = true;
  validRateName: boolean = true;

  rateName: string = '';

  // import validation
  validate: ValidationServicesComponent = new ValidationServicesComponent();

  //audit log
  auditLog: AuditLog = {
    auditLogID: 0,
    userID: 0,
    employeeID: 0,
    functionUsed: 'Update Wage Rate',
    date: new Date(),
    month: 'Oct',
  };

  //help pdf
  pdfPath = 'https://localhost:7113/Resources/pdfs/Maintain wage rate.pdf';
  displayPDF: boolean = false;

  constructor(
    private rateService: RateService,
    private employeeTypeSevice: EmployeeTypeService,
    private AuditLogService: AuditLogService,
    private CurrentUserService: CurrentUserService
  ) {}

  ngOnInit() {
    this.employeeTypeSevice.getAllEmployees().subscribe((res) => {
      res = res.filter((type) => {
        return type.employeE_TYPE_ID == this.rate.ratE_NAME;
      });
      this.rateName = res[0].positioN_NAME;
    });

    this.CurrentUserService.getAllCurrentUsers().subscribe((res) => {
      this.auditLog.userID = res[res.length - 1].userID;
      this.auditLog.employeeID = res[res.length - 1].employeeID;
    });
  }

  ////////////// pdf functions ///////////////////////////////
  @ViewChild(PdfViewerComponent) private pdfComponent: PdfViewerComponent;
  search(stringToSearch: string) {
    this.pdfComponent.eventBus.dispatch('find', {
      query: stringToSearch,
      type: 'again',
      caseSensitive: false,
      findPrevious: undefined,
      highlightAll: true,
      phraseSearch: true,
    });
  }

  Return() {
    this.return.emit('false');
  }

  FormValidate() {
    //validate the money
    this.validateMoney();
  }

  onSubmit() {
    this.rateService.updateEmployee(this.rate).subscribe((response) => {
      console.log(response);
      this.successSubmit = true;
    });

    //add to audit log
    this.AuditLogService.addAuditLog(this.auditLog).subscribe((res) => {
      console.log('new audit log entry');
      console.log(res);
    });
  }

  validateMoney() {
    if (this.rate.ratE_AMOUNT == 0) {
      this.validMoney = false;
    } else this.validMoney = this.validate.ValidateMoney(this.rate.ratE_AMOUNT);
    console.log(this.validMoney);
  }
}
