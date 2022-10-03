import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { EmployeeType } from 'src/app/models/employee-type.model';
import { EmployeeTypeService } from 'src/app/_services/employe-type.service';
import { ValidationServicesComponent } from 'src/app/validation-services/validation-services.component';

//audit log
import { AuditLog } from 'src/app/models/AuditLog.model';
import { AuditLogService } from 'src/app/_services/AuditLog.service';
import { CurrentUser } from 'src/app/models/CurrentUser.model';
import { CurrentUserService } from 'src/app/_services/CurrentUser.service';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-update-employee-type',
  templateUrl: './update-employee-type.component.html',
  styleUrls: ['./update-employee-type.component.css'],
})
export class UpdateEmployeeTypeComponent implements OnInit {
  @Output() return = new EventEmitter<string>();

  //employee type
  @Input() employeetype: EmployeeType;
  employeeTypes: EmployeeType[] = [];
  employeeTypesTemp: EmployeeType[] = [];

  //import validation
  validate: ValidationServicesComponent = new ValidationServicesComponent();

  //unique variables
  uniqueName: boolean = true;

  validName: boolean = true;

  successSubmit: boolean = false;

  //audit log
  auditLog: AuditLog = {
    auditLogID: 0,
    userID: 0,
    employeeID: 0,
    functionUsed: 'Update Employee Type',
    date: new Date(),
    month: 'Oct',
  };

  //help pdf
  pdfPath =
    'https://localhost:7113/Resources/pdfs/Maintain employee type-1.pdf';
  displayPDF: boolean = false;

  constructor(
    private employeeTypeService: EmployeeTypeService,
    private currentUserService: CurrentUserService,
    private auditLogService: AuditLogService
  ) {}

  ngOnInit(): void {
    this.employeeTypeService.getAllEmployees().subscribe((res) => {
      console.log('This is all the employeeTypes');
      console.log(res);
      this.employeeTypes = res;
    });

    this.currentUserService.getAllCurrentUsers().subscribe((res) => {
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
    this.employeeTypeService
      .updateEmployee(this.employeetype)
      .subscribe((response) => {
        console.log('this is the new updates employee type');
        console.log(response);
        this.successSubmit = true;
      });

    /// add to audit log
    this.auditLogService.addAuditLog(this.auditLog).subscribe((res) => {
      console.log('new audit log entry');
      console.log(res);
    });
  }

  FormValidate() {
    this.namevalidate();
    this.compareName();
  }

  compareName() {
    this.employeeTypesTemp = this.employeeTypes;
    this.employeeTypesTemp = this.employeeTypesTemp.filter((type) => {
      return type.positioN_NAME == this.employeetype.positioN_NAME;
    });
    if (
      this.employeeTypesTemp.length > 0 &&
      this.employeeTypesTemp[0].employeE_TYPE_ID !=
        this.employeetype.employeE_TYPE_ID
    )
      this.uniqueName = false;
    else this.uniqueName = true;
  }

  namevalidate() {
    this.validName = this.validate.ValidateString(
      this.employeetype.positioN_NAME
    );
    this.compareName();
  }

  Return() {
    this.return.emit('false');
  }
}
