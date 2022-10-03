import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { CustomerApplication } from '../../../models/CustomerApplication.model';
import { CustomerApplicationService } from '../../../_services/CustomerApplication.service';
import { Province } from 'src/app/models/province.model';
import { ProvinceService } from 'src/app/_services/Province.service';
import { City } from 'src/app/models/City.model';
import { CityService } from 'src/app/_services/City.service';
import { ValidationServicesComponent } from 'src/app/validation-services/validation-services.component';
import { Debtor } from 'src/app/models/debtor.model';
import { DebtorService } from 'src/app/_services/debtor.service';

//audit log
import { AuditLog } from 'src/app/models/AuditLog.model';
import { AuditLogService } from 'src/app/_services/AuditLog.service';
import { CurrentUserService } from 'src/app/_services/CurrentUser.service';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-apply-for-credit',
  templateUrl: './apply-for-credit.component.html',
  styleUrls: ['./apply-for-credit.component.css'],
})
export class ApplyForCreditComponent implements OnInit {
  @Output() return = new EventEmitter<string>();

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

  //unique
  uniqueContactNumber: boolean = true;
  uniqueEmail: boolean = true;

  //cutomer Application
  customerApplication: CustomerApplication = {
    customerApplicationID: 0,
    name: '',
    surname: '',
    email: '',
    contactNumber: null,
    creditLimit: null,
    accountStatusID: 0,
    provinceID: -1,
    cityID: -1,
  };
  customerApplications: CustomerApplication[] = [];
  customerApplicationsTemp: CustomerApplication[] = [];

  //debtor
  debtor: Debtor;
  debtors: Debtor[] = [];
  debtorsTemp: Debtor[] = [];

  //province
  provinces: Province[] = [];
  provincesTemp: Province[] = [];

  //city
  cities: City[] = [];
  citiesTemp: City[] = [];

  //audit log
  auditLog: AuditLog = {
    auditLogID: 0,
    userID: 0,
    employeeID: 0,
    functionUsed: 'Add Credit Application',
    date: new Date(),
    month: 'Oct',
  };

  //help pdf
  pdfPath = 'https://localhost:7113/Resources/pdfs/Apply for credit.pdf';
  displayPDF: boolean = false;

  constructor(
    private customerApplicationService: CustomerApplicationService,
    private provinceService: ProvinceService,
    private cityService: CityService,
    private debtorService: DebtorService,
    private CurrentUserService: CurrentUserService,
    private AuditLogService: AuditLogService
  ) {}

  ngOnInit() {
    this.getProvinces();

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
    if (this.customerApplicationsTemp.length > 0) {
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
    if (this.customerApplicationsTemp.length > 0) {
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
  }

  categorySelect(id: number) {
    this.citiesTemp = this.cities;
    this.citiesTemp = this.citiesTemp.filter((city) => {
      return city.provinceID == id;
    });
    this.categorySelected = true;
  }

  onSubmit() {
    if (
      !this.nameDetails ||
      !this.surnameDetails ||
      !this.emailDetails ||
      !this.contactDetails ||
      !this.creditDetails
    ) {
      console.log('if statement true');
    } else {
      console.log('if statement false');
      this.customerApplicationService
        .addCustomerApplication(this.customerApplication)
        .subscribe((response) => {
          console.log(response);
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
}
