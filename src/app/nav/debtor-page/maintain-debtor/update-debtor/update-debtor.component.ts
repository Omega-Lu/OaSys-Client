import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { Debtor } from 'src/app/models/debtor.model';
import { DebtorService } from '../../../../_services/debtor.service';
import { Province } from 'src/app/models/province.model';
import { ProvinceService } from 'src/app/_services/Province.service';
import { City } from 'src/app/models/City.model';
import { CityService } from 'src/app/_services/City.service';
import { ValidationServicesComponent } from 'src/app/validation-services/validation-services.component';
import { CustomerApplication } from '../../../../models/CustomerApplication.model';
import { CustomerApplicationService } from '../../../../_services/CustomerApplication.service';

//audit log
import { AuditLog } from 'src/app/models/AuditLog.model';
import { AuditLogService } from 'src/app/_services/AuditLog.service';
import { CurrentUserService } from 'src/app/_services/CurrentUser.service';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-update-debtor',
  templateUrl: './update-debtor.component.html',
  styleUrls: ['./update-debtor.component.css'],
})
export class UpdateDebtorComponent implements OnInit {
  @Input() title: string = 'Update Debtor';

  //debtor
  @Input() debtor: Debtor;
  debtors: Debtor[] = [];
  debtorsTemp: Debtor[] = [];

  //cutomer applications
  customerApplications: CustomerApplication[] = [];
  customerApplicationsTemp: CustomerApplication[] = [];

  //unique
  uniqueContactNumber: boolean = true;
  uniqueEmail: boolean = true;

  //province
  provinces: Province[] = [];
  provincesTemp: Province[] = [];

  //city
  cities: City[] = [];
  citiesTemp: City[] = [];

  @Output() return = new EventEmitter<string>();

  //validation
  nDetails: boolean = true;
  sDetails: boolean = true;
  eDetails: boolean = true;
  cnDetails: boolean = true;
  pDetails: boolean = true;
  creditDetails: boolean = true;
  cityDetails: boolean = true;
  successSubmit: boolean = false;
  categorySelected: boolean = false;
  validate: ValidationServicesComponent = new ValidationServicesComponent();

  //audit log
  auditLog: AuditLog = {
    auditLogID: 0,
    userID: 0,
    employeeID: 0,
    functionUsed: 'Update Debtor',
    date: new Date(),
    month: 'Oct',
  };

  //help pdf
  pdfPath = 'https://localhost:7113/Resources/pdfs/Maintain debtor.pdf';
  displayPDF: boolean = false;

  constructor(
    private debtorService: DebtorService,
    private provinceService: ProvinceService,
    private cityService: CityService,
    private customerApplicationService: CustomerApplicationService,
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
  }

  nameValidate() {
    this.nDetails = this.validate.ValidateString(this.debtor.name);
  }

  ValidateContactNumber() {
    this.cnDetails = this.validate.ValidateContactNumber(
      this.debtor.contacT_NUMBER
    );
    this.compareContactNumber();
  }

  compareContactNumber() {
    this.uniqueContactNumber = true;
    this.debtorsTemp = this.debtors;
    this.debtorsTemp = this.debtorsTemp.filter((debtor) => {
      return debtor.contacT_NUMBER == this.debtor.contacT_NUMBER;
    });
    if (
      this.debtorsTemp.length > 0 &&
      this.debtorsTemp[0].customeR_ACCOUNT_ID != this.debtor.customeR_ACCOUNT_ID
    ) {
      this.uniqueContactNumber = false;
    }

    this.customerApplicationsTemp = this.customerApplications;
    this.customerApplicationsTemp = this.customerApplicationsTemp.filter(
      (customer) => {
        return customer.contactNumber == this.debtor.contacT_NUMBER;
      }
    );
    if (this.customerApplicationsTemp.length > 0) {
      this.uniqueContactNumber = false;
    }
  }

  surnameValidate() {
    this.sDetails = this.validate.ValidateString(this.debtor.surname);
  }

  emailValidate() {
    this.eDetails = this.validate.ValidateEmail(this.debtor.email);
    this.compareEmail();
  }

  compareEmail() {
    this.uniqueEmail = true;
    this.debtorsTemp = this.debtors;
    this.debtorsTemp = this.debtorsTemp.filter((debtor) => {
      return debtor.email == this.debtor.email;
    });
    if (
      this.debtorsTemp.length > 0 &&
      this.debtorsTemp[0].customeR_ACCOUNT_ID != this.debtor.customeR_ACCOUNT_ID
    ) {
      this.uniqueEmail = false;
    }

    this.customerApplicationsTemp = this.customerApplications;
    this.customerApplicationsTemp = this.customerApplicationsTemp.filter(
      (customer) => {
        return customer.email == this.debtor.email;
      }
    );
    if (this.customerApplicationsTemp.length > 0) {
      this.uniqueEmail = false;
    }
  }

  Provalidate() {
    if (this.debtor.provincE_ID == -1) {
      this.pDetails = false;
    } else {
      this.pDetails = true;
    }
  }

  cityValidate() {
    if (this.debtor.cityID == -1) {
      this.cityDetails = false;
    } else this.cityDetails = true;
  }

  creditValidate() {
    if (this.debtor.crediT_LIMIT == null || this.debtor.crediT_LIMIT <= 0) {
      this.creditDetails = false;
    } else
      this.creditDetails = this.validate.ValidateMoney(
        this.debtor.crediT_LIMIT
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
    this.categorySelect(this.debtor.provincE_ID);
  }

  onSubmit() {
    this.debtorService.updateDebtor(this.debtor).subscribe((response) => {
      console.log(response);

      //add to audit log
      this.AuditLogService.addAuditLog(this.auditLog).subscribe((res) => {
        console.log('new audit log entry');
        console.log(res);
        this.successSubmit = true;
      });
    });
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
}
