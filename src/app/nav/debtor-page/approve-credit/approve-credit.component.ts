import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
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

  //help pdf
  pdfPath = 'https://localhost:7113/Resources/pdfs/Approve credit.pdf';
  displayPDF: boolean = false;

  constructor(private customerAppicationService: CustomerApplicationService) {}

  async ngOnInit() {
    this.getAllCustomerApplications();
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
        this.customerApplications = this.customerApplications.filter(
          (customerApplication) => {
            return customerApplication.accountStatusID == 0;
          }
        );
        this.customerApplicationsTemp = this.customerApplications;
      });
  }

  Search() {
    this.customerApplicationsTemp = this.customerApplications;
    if (this.searchText !== '') {
      this.customerApplicationsTemp = this.customerApplicationsTemp.filter(
        (customerApplication) => {
          return (
            customerApplication.name.match(this.searchText) ||
            customerApplication.surname.match(this.searchText)
          );
        }
      );
    }
  }

  Return() {
    this.return.emit('false');
  }

  back() {
    this.approveCredit = false;
    this.return.emit('false');
    this.getAllCustomerApplications();
  }

  populateForm(customerApplication: CustomerApplication) {
    this.customerApplication = customerApplication;
  }
}
