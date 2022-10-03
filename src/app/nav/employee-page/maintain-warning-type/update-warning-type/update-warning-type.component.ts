import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { WarningType } from 'src/app/models/warning-type.model';
import { WarningTypeService } from 'src/app/_services/warning-type.service';
import { ValidationServicesComponent } from 'src/app/validation-services/validation-services.component';

//audit log
import { AuditLog } from 'src/app/models/AuditLog.model';
import { AuditLogService } from 'src/app/_services/AuditLog.service';
import { CurrentUserService } from 'src/app/_services/CurrentUser.service';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-update-warning-type',
  templateUrl: './update-warning-type.component.html',
  styleUrls: ['./update-warning-type.component.css'],
})
export class UpdateWarningTypeComponent implements OnInit {
  @Input() warningType: WarningType;
  warningTypes: WarningType[] = [];
  warningTypesTemp: WarningType[] = [];

  //unique
  uniqueName: boolean = true;

  @Output() return = new EventEmitter<string>();
  //import validation
  validate: ValidationServicesComponent = new ValidationServicesComponent();

  successSubmit: boolean = false;
  validWarning: boolean = true;

  //audit log
  auditLog: AuditLog = {
    auditLogID: 0,
    userID: 0,
    employeeID: 0,
    functionUsed: 'Update Warning Type',
    date: new Date(),
    month: 'Oct',
  };

  //help pdf
  pdfPath = 'https://localhost:7113/Resources/pdfs/Maintain warning type.pdf';
  displayPDF: boolean = false;

  constructor(
    private warningTypeService: WarningTypeService,
    private CurrentUserService: CurrentUserService,
    private AuditLogService: AuditLogService
  ) {}

  ngOnInit() {
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

  onSubmit() {
    this.warningTypeService
      .updateEmployee(this.warningType)
      .subscribe((response) => {
        console.log('updated Warning Type');
        console.log(response);

        //add to audit log
        this.AuditLogService.addAuditLog(this.auditLog).subscribe((res) => {
          console.log('new audit log entry');
          console.log(res);
          this.successSubmit = true;
        });
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
      if (
        this.warningTypesTemp[0].warninG_TYPE_ID ==
        this.warningType.warninG_TYPE_ID
      ) {
      } else this.uniqueName = false;
    } else this.uniqueName = true;
  }

  Return() {
    this.return.emit('false');
  }
}
