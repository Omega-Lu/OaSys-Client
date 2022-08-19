import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CustomerApplication } from 'src/app/models/CustomerApplication.model';
import { CustomerApplicationService } from 'src/app/_services/CustomerApplication.service';

@Component({
  selector: 'app-approve-credit',
  templateUrl: './approve-credit.component.html',
  styleUrls: ['./approve-credit.component.css'],
})
export class ApproveCreditComponent implements OnInit {
  @Output() return = new EventEmitter<string>();

  customerApplicationsTemp: CustomerApplication[] = [];
  customerApplications: CustomerApplication[] = [];
  customerApplication: CustomerApplication;

  approveCredit: boolean = false;

  searchText: string = '';
  model: any;

  constructor(private customerAppicationService: CustomerApplicationService) {}

  async ngOnInit() {
    this.getAllCustomerApplications();

    await this.sleep(150);

    this.customerApplications = this.customerApplications.filter(
      (customerApplication) => {
        console.log(customerApplication.accountStatusID == 0);
        return customerApplication.accountStatusID == 0;
      }
    );
    this.customerApplicationsTemp = this.customerApplications;
  }

  sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  getAllCustomerApplications() {
    this.customerAppicationService
      .getAllCustomerApplications()
      .subscribe((response) => {
        this.customerApplications = response;
        console.log(this.customerApplications);
      });
  }

  Search() {
    this.customerApplicationsTemp = this.customerApplications;
    console.log(this.searchText);
    if (this.searchText !== '') {
      let searchValue = this.searchText;
      console.log(searchValue);
      this.customerApplicationsTemp = this.customerApplicationsTemp.filter(
        (customerApplication) => {
          console.log(customerApplication.name.match(searchValue));
          return customerApplication.name.match(searchValue);
        }
      );
      console.log(this.customerApplication);
    } else {
      this.customerApplicationsTemp = this.customerApplications;
    }
  }

  Return() {
    this.return.emit('false');
  }

  back() {
    this.approveCredit = false;
    this.return.emit('false');
  }

  populateForm(customerApplication: CustomerApplication) {
    this.customerApplication = customerApplication;
  }
}
