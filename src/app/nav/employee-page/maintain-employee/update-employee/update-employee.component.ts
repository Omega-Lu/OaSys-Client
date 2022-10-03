import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/_services/employee.service';
import { ValidationServicesComponent } from 'src/app/validation-services/validation-services.component';
import { EmployeeType } from 'src/app/models/employee-type.model';
import { EmployeeTypeService } from 'src/app/_services/employe-type.service';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/_services/user.service';

//audit log
import { AuditLog } from 'src/app/models/AuditLog.model';
import { AuditLogService } from 'src/app/_services/AuditLog.service';
import { CurrentUserService } from 'src/app/_services/CurrentUser.service';
import { HttpClient } from '@angular/common/http';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css'],
})
export class UpdateEmployeeComponent implements OnInit {
  //employee
  @Input() employee: Employee;
  employees: Employee[] = [];
  employeesTemp: Employee[] = [];

  @Output() return = new EventEmitter<string>();

  details: boolean = true;
  sdetails: boolean = true;
  tdetails: boolean = true;
  edetails: boolean = true;
  adetails: boolean = true;
  numberVal: boolean = true;
  passportVal: boolean = true;
  successSubmit: boolean = false;

  validRole: boolean = true;
  validType: boolean = true;

  employeeType: EmployeeType;
  employeeTypes: EmployeeType[] = [];

  employeeSelected: boolean = false;

  // import validation
  validate: ValidationServicesComponent = new ValidationServicesComponent();

  //user models
  user: User;
  users: User[] = [];
  usersTemp: User[] = [];

  role = -1;

  //unique variables
  uniquePassport: boolean = true;
  uniqueContactNumber: boolean = true;
  uniqueEmail: boolean = true;

  auditLog: AuditLog = {
    auditLogID: 0,
    userID: 0,
    employeeID: 0,
    functionUsed: 'Update Employee',
    date: new Date(),
    month: 'Oct',
  };

  //upload
  public message: string;
  public progress: number;
  @Output() public onUploadFinished = new EventEmitter();
  public response: { dbPath: '' };
  validFile: boolean = true;

  //help pdf
  pdfPath = 'https://localhost:7113/Resources/pdfs/Maintain employee.pdf';
  displayPDF: boolean = false;

  constructor(
    private employeeService: EmployeeService,
    private employeeTypeService: EmployeeTypeService,
    private userService: UserService,
    private CurrentUserService: CurrentUserService,
    private AuditLogService: AuditLogService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    console.log('this is the employee');
    console.log(this.employee);

    this.GetUsers();
    this.GetEmployeeTypes();
    this.employeeService.getAllEmployees().subscribe((res) => {
      console.log('this is all the employees');
      console.log(res);
      this.employees = res;
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

  ///////////////// uploading an image////////////////////////

  public uploadFile = (files) => {
    let fileToUpload = <File>files[0];

    if (fileToUpload.name.match(/png|jpg|jpeg/g)) {
      const formData = new FormData();
      formData.append('file', fileToUpload, fileToUpload.name);

      this.http
        .post('https://localhost:7113/api/upload', formData)
        .subscribe((res) => {
          console.log(res['dbPath']);
          this.employee.img = res['dbPath'];
          this.validFile = true;
        });
    } else {
      this.validFile = false;
    }
  };

  ////////////////// validate ///////////////////////////////////////

  FormValidate() {
    // validate name
    this.ValidateName();

    //validate surname
    this.ValidateSurname();

    // validate contact number
    this.ValidateContactNumber();

    // validate id number
    this.ValidateIDNumber();

    //validate email
    this.ValidateEmail();

    //validate address
    this.addressvalidate();

    //validate title
    this.titlevalidate(this.employee.title);

    //compare details
    this.compareContactNumber();
    this.compareEmail();
    this.comparePassport();

    if (this.employee.img == '') {
      this.validFile = false;
    } else {
      this.validFile = true;
    }
  }

  comparePassport() {
    this.employeesTemp = this.employees;
    this.employeesTemp = this.employeesTemp.filter((employee) => {
      return employee.employeE_ID_NUMBER == this.employee.employeE_ID_NUMBER;
    });
    if (
      this.employeesTemp.length > 0 &&
      this.employee.employeE_ID != this.employeesTemp[0].employeE_ID
    )
      this.uniquePassport = false;
    else this.uniquePassport = true;
  }

  compareContactNumber() {
    this.employeesTemp = this.employees;
    this.employeesTemp = this.employeesTemp.filter((employee) => {
      return employee.contacT_NUMBER == this.employee.contacT_NUMBER;
    });
    if (
      this.employeesTemp.length > 0 &&
      this.employee.employeE_ID != this.employeesTemp[0].employeE_ID
    )
      this.uniqueContactNumber = false;
    else this.uniqueContactNumber = true;
  }

  compareEmail() {
    this.employeesTemp = this.employees;
    this.employeesTemp = this.employeesTemp.filter((employee) => {
      return employee.email == this.employee.email;
    });
    if (
      this.employeesTemp.length > 0 &&
      this.employee.employeE_ID != this.employeesTemp[0].employeE_ID
    )
      this.uniqueEmail = false;
    else this.uniqueEmail = true;
  }

  //////////////////////////////update employee ///////////////////////////////
  onSubmit() {
    if (this.employeeSelected == false) {
      this.employee.employeE_TYPE_ID = 0;
    }

    this.employeeService.updateEmployee(this.employee).subscribe((response) => {
      console.log('this is the new updated employee');
      console.log(response);
      this.userService.updateUser(this.user).subscribe((res) => {
        console.log('this is the updated user');
        console.log(res);
        this.successSubmit = true;
      });
    });

    //add to audit log
    this.AuditLogService.addAuditLog(this.auditLog).subscribe((res) => {
      console.log('new audit log entry');
      console.log(res);
    });
  }

  ValidateName() {
    console.log(this.employee.name);
    this.details = this.validate.ValidateString(this.employee.name);
  }

  ValidateSurname() {
    this.sdetails = this.validate.ValidateString(this.employee.surname);
  }

  ValidateEmail() {
    this.edetails = this.validate.ValidateEmail(this.employee.email);
    this.compareEmail();
  }

  ValidateContactNumber() {
    this.numberVal = this.validate.ValidateContactNumber(
      this.employee.contacT_NUMBER
    );
    this.compareContactNumber();
  }

  ValidateIDNumber() {
    this.passportVal = this.validate.ValidateIDNumber(
      this.employee.employeE_ID_NUMBER
    );
    this.comparePassport();
  }

  titlevalidate(title) {
    if (title == '-1' || title == '') {
      this.tdetails = false;
    } else {
      this.tdetails = true;
      this.employee.title = title;
    }
  }

  addressvalidate() {
    if (this.employee.address == '') {
      this.adetails = false;
    } else {
      this.adetails = true;
    }
  }

  Return() {
    this.return.emit('false');
  }

  roleValidate() {
    if ($('#employeeRoleID option:selected').val() == '0') {
      this.validRole = false;
    } else {
      this.validRole = true;
    }
    if (this.user.useR_ROLE_ID == 4 || this.user.useR_ROLE_ID == 3) {
      this.employeeSelected = true;
      console.log(
        'employee selected' + this.employeeSelected + this.user.useR_ROLE_ID
      );
    } else {
      this.employeeSelected = false;
      console.log(
        'else employee' + this.employeeSelected + this.user.useR_ROLE_ID
      );
    }
  }

  typeValidate() {
    if (this.employeeSelected == true) {
      if ($('#employeeTypeID option:selected').val() == '0') {
        this.validType = false;
      } else {
        this.validType = true;
        if ($('#employeeTypeID option:selected').val() == '1002') {
          this.user.useR_ROLE_ID = 3;
        } else this.user.useR_ROLE_ID = 4;
      }
    }
  }

  ///////////////////////// get functions/////////////////////////////////////

  GetEmployeeTypes() {
    this.employeeTypeService.getAllEmployees().subscribe((res) => {
      this.employeeTypes = res;

      this.getCurrentUser();
    });
  }

  getCurrentUser() {
    this.CurrentUserService.getAllCurrentUsers().subscribe((res) => {
      this.auditLog.userID = res[res.length - 1].userID;
      this.auditLog.employeeID = res[res.length - 1].employeeID;
    });
  }

  GetUsers() {
    this.userService.getAllUsers().subscribe((res) => {
      this.usersTemp = res.filter((user) => {
        return user.employeE_ID == this.employee.employeE_ID;
      });
      this.user = this.usersTemp[0];
      if (this.user.useR_ROLE_ID == 3 || this.user.useR_ROLE_ID == 4) {
        this.employeeSelected = true;
      } else {
        this.employeeSelected = false;
      }
    });
  }
}
