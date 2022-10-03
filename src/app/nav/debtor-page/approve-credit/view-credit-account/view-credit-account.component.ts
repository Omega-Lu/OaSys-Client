import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ViewChild,
} from '@angular/core';
import { CustomerApplication } from 'src/app/models/CustomerApplication.model';
import { CustomerApplicationService } from 'src/app/_services/CustomerApplication.service';
import { CustomerAccount } from 'src/app/models/Customer-account.model';
import { CustomerAccountService } from 'src/app/_services/customer-account.service';
import { AccountStatus } from 'src/app/models/AccountStatus.model';
import { AccountStatusService } from 'src/app/_services/AccountStatus.service';
import { ValidationServicesComponent } from 'src/app/validation-services/validation-services.component';
import { Province } from 'src/app/models/province.model';
import { ProvinceService } from 'src/app/_services/Province.service';
import { City } from 'src/app/models/City.model';
import { CityService } from 'src/app/_services/City.service';
import { Debtor } from 'src/app/models/debtor.model';
import { DebtorService } from '../../../../_services/debtor.service';

//audit log
import { AuditLog } from 'src/app/models/AuditLog.model';
import { AuditLogService } from 'src/app/_services/AuditLog.service';
import { CurrentUserService } from 'src/app/_services/CurrentUser.service';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-view-credit-account',
  templateUrl: './view-credit-account.component.html',
  styleUrls: ['./view-credit-account.component.css'],
})
export class ViewCreditAccountComponent implements OnInit {
  //cutomer applications
  @Input() customerApplication: CustomerApplication;
  customerApplications: CustomerApplication[] = [];
  customerApplicationsTemp: CustomerApplication[] = [];

  @Output() return = new EventEmitter<string>();

  //unique
  uniqueContactNumber: boolean = true;
  uniqueEmail: boolean = true;

  //province
  provinces: Province[] = [];
  provincesTemp: Province[] = [];

  //city
  cities: City[] = [];
  citiesTemp: City[] = [];

  //validate
  nameDetails: boolean = true;
  surnameDetails: boolean = true;
  emailDetails: boolean = true;
  contactDetails: boolean = true;
  creditDetails: boolean = true;
  provinceDetails: boolean = true;
  categorySelected: boolean = false;
  cityDetails: boolean = true;
  validate: ValidationServicesComponent = new ValidationServicesComponent();
  successSubmit: boolean = false;
  successDecline: boolean = false;

  //account statuses
  accountStatus: AccountStatus = {
    accountStatusID: 0,
    descrption: '',
  };
  accountStatusses: AccountStatus[] = [];
  accountStatussesTemp: AccountStatus[] = [];

  //debtor
  debtor: CustomerAccount = {
    customeR_ACCOUNT_ID: 0,
    accounT_STATUS_ID: 0,
    provincE_ID: 0,
    cityID: 0,
    name: '',
    surname: '',
    email: '',
    contacT_NUMBER: 0,
    amounT_OWING: 0,
    crediT_LIMIT: 0,
    remindeR_MESSAGE: '',
    deleted: false,
  };
  debtors: Debtor[] = [];
  debtorsTemp: Debtor[] = [];

  //audit log
  auditLog: AuditLog = {
    auditLogID: 0,
    userID: 0,
    employeeID: 0,
    functionUsed: '',
    date: new Date(),
    month: 'Oct',
  };

  //help pdf
  pdfPath = 'https://localhost:7113/Resources/pdfs/Approve credit.pdf';
  displayPDF: boolean = false;

  constructor(
    private customerApplicationService: CustomerApplicationService,
    private accountStatusService: AccountStatusService,
    private customerAccountService: CustomerAccountService,
    private provinceService: ProvinceService,
    private cityService: CityService,
    private debtorService: DebtorService,
    private CurrentUserService: CurrentUserService,
    private AuditLogService: AuditLogService
  ) {}

  ngOnInit(): void {
    this.getProvinces();
    this.getAllAccountStatusses();

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

  /////////////////// get functions //////////////////////////////////////////

  getProvinces() {
    this.provinceService.getAllProvinces().subscribe((res) => {
      this.provinces = res;
      console.log('this is all the provinces');
      console.log(this.provinces);
      this.getCities();
    });
  }

  getCities() {
    this.cityService.getAllCitys().subscribe((res) => {
      this.cities = res;
      console.log('this is all the cities');
      console.log(this.cities);
      this.getDebtors();
    });
  }

  getDebtors() {
    this.debtorService.getAllDebtors().subscribe((res) => {
      this.debtors = res;
      this.getCustomerApplications();
    });
  }

  getCustomerApplications() {
    this.customerApplicationService
      .getAllCustomerApplications()
      .subscribe((res) => {
        this.customerApplications = res;
      });
    this.categorySelect(this.customerApplication.provinceID);
  }

  getAllAccountStatusses() {
    this.accountStatusService.getAllAccountStatusses().subscribe((response) => {
      this.accountStatusses = response;
      console.log(this.accountStatusses);
    });
  }

  ////////////////// validate functions /////////////////////////////////////

  FormValidate() {
    this.nameValidate();
    this.ValidateContactNumber();
    this.surnameValidate();
    this.emailValidate();
    this.Provalidate();
    this.cityValidate();
    this.creditValidate();
    this.compareEmail();
    this.compareContactNumber();
  }

  nameValidate() {
    this.nameDetails = this.validate.ValidateString(
      this.customerApplication.name
    );
    this.compareContactNumber();
    this.compareEmail();
  }

  surnameValidate() {
    this.surnameDetails = this.validate.ValidateString(
      this.customerApplication.surname
    );
    this.compareContactNumber();
    this.compareEmail();
  }

  ValidateContactNumber() {
    this.contactDetails = this.validate.ValidateContactNumber(
      this.customerApplication.contactNumber
    );
    this.compareContactNumber();
  }

  compareContactNumber() {
    this.uniqueContactNumber = true;
    this.debtorsTemp = this.debtors;
    this.debtorsTemp = this.debtorsTemp.filter((debtor) => {
      return debtor.contacT_NUMBER == this.customerApplication.contactNumber;
    });
    if (this.debtorsTemp.length > 0) {
      if (this.debtorsTemp[0].deleted) {
        if (
          this.debtorsTemp[0].name == this.customerApplication.name &&
          this.debtorsTemp[0].surname == this.customerApplication.surname
        ) {
          this.debtor.customeR_ACCOUNT_ID =
            this.debtorsTemp[0].customeR_ACCOUNT_ID;
        } else {
          this.uniqueContactNumber = false;
        }
      } else {
        this.uniqueContactNumber = false;
      }
    }

    this.customerApplicationsTemp = this.customerApplications;
    this.customerApplicationsTemp = this.customerApplicationsTemp.filter(
      (customer) => {
        return customer.contactNumber == this.customerApplication.contactNumber;
      }
    );
    if (
      this.customerApplicationsTemp.length > 0 &&
      this.customerApplication.customerApplicationID !=
        this.customerApplicationsTemp[0].customerApplicationID
    ) {
      this.uniqueContactNumber = false;
    }
  }

  emailValidate() {
    this.emailDetails = this.validate.ValidateEmail(
      this.customerApplication.email
    );
    this.compareEmail();
  }

  compareEmail() {
    this.uniqueEmail = true;
    this.debtorsTemp = this.debtors;
    this.debtorsTemp = this.debtorsTemp.filter((debtor) => {
      return debtor.email == this.customerApplication.email;
    });
    if (this.debtorsTemp.length > 0) {
      if (this.debtorsTemp[0].deleted) {
        if (
          this.debtorsTemp[0].name == this.customerApplication.name &&
          this.debtorsTemp[0].surname == this.customerApplication.surname
        ) {
          this.debtor.customeR_ACCOUNT_ID =
            this.debtorsTemp[0].customeR_ACCOUNT_ID;
        } else {
          this.uniqueEmail = false;
        }
      } else {
        this.uniqueEmail = false;
      }
    }

    this.customerApplicationsTemp = this.customerApplications;
    this.customerApplicationsTemp = this.customerApplicationsTemp.filter(
      (customer) => {
        return customer.email == this.customerApplication.email;
      }
    );
    if (
      this.customerApplicationsTemp.length > 0 &&
      this.customerApplication.customerApplicationID !=
        this.customerApplicationsTemp[0].customerApplicationID
    ) {
      this.uniqueEmail = false;
    }
  }

  Provalidate() {
    if (this.customerApplication.provinceID == -1) {
      this.provinceDetails = false;
    } else {
      this.provinceDetails = true;
    }
  }

  cityValidate() {
    if (this.customerApplication.cityID == -1) {
      this.cityDetails = false;
    } else this.cityDetails = true;
  }

  creditValidate() {
    if (
      this.customerApplication.creditLimit == null ||
      this.customerApplication.creditLimit <= 0
    ) {
      this.creditDetails = false;
    } else
      this.creditDetails = this.validate.ValidateMoney(
        this.customerApplication.creditLimit
      );
  }

  categorySelect(id: number) {
    this.citiesTemp = this.cities;
    this.citiesTemp = this.citiesTemp.filter((city) => {
      return city.provinceID == id;
    });
    this.categorySelected = true;
  }

  Return() {
    this.return.emit('false');
  }

  //////////////////// approve account /////////////////////////////////////

  onSubmit() {
    this.debtor.accounT_STATUS_ID = this.customerApplication.accountStatusID;
    this.debtor.provincE_ID = this.customerApplication.provinceID;
    this.debtor.cityID = this.customerApplication.cityID;
    this.debtor.name = this.customerApplication.name;
    this.debtor.surname = this.customerApplication.surname;
    this.debtor.email = this.customerApplication.email;
    this.debtor.contacT_NUMBER = this.customerApplication.contactNumber;
    this.debtor.crediT_LIMIT = this.customerApplication.creditLimit;

    if (this.debtor.customeR_ACCOUNT_ID == 0) {
      this.customerAccountService
        .addCustomerAccount(this.debtor)
        .subscribe((response) => {
          console.log('new debtor');
          console.log(response);
        });
    } else {
      this.customerAccountService
        .updateCustomerAccount(this.debtor)
        .subscribe((res) => {
          console.log('updated debtor added');
          console.log(res);
        });
    }

    this.customerApplicationService
      .deleteCustomerApplication(this.customerApplication.customerApplicationID)
      .subscribe((response) => {
        console.log('aplication accepted and deleted');
        console.log(response);

        //add to audit log
        this.auditLog.functionUsed = 'Approve Credit Account';
        this.AuditLogService.addAuditLog(this.auditLog).subscribe((res) => {
          console.log('new audit log entry');
          console.log(res);
          this.successSubmit = true;
        });
      });
  }

  //////////////////// Decline account ////////////////////////////////////////

  async Decilne() {
    this.customerApplicationService
      .deleteCustomerApplication(this.customerApplication.customerApplicationID)
      .subscribe((response) => {
        console.log('deleted/declined customer applciation');
        console.log(response);

        //add to audit log
        this.auditLog.functionUsed = 'Decline Credit Account';
        this.AuditLogService.addAuditLog(this.auditLog).subscribe((res) => {
          console.log('new audit log entry');
          console.log(res);
          this.successDecline = true;
        });
      });
  }
}
