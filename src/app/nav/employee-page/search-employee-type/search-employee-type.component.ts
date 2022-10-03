import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { EmployeeType } from 'src/app/models/employee-type.model';
import { EmployeeTypeService } from 'src/app/_services/employe-type.service';

@Component({
  selector: 'app-search-employee-type',
  templateUrl: './search-employee-type.component.html',
  styleUrls: ['./search-employee-type.component.css'],
})
export class SearchEmployeeTypeComponent implements OnInit {
  @Output() return = new EventEmitter<string>();

  //employee types
  employeetypes: EmployeeType[] = [];
  employeeTypesTemp: EmployeeType[] = [];

  searchText: string = '';

  //help pdf
  pdfPath = 'https://localhost:7113/Resources/pdfs/Search employee type.pdf';
  displayPDF: boolean = false;

  constructor(private employeetypeService: EmployeeTypeService) {}

  ngOnInit(): void {
    this.getAllEmployees();
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

  getAllEmployees() {
    this.employeetypeService.getAllEmployees().subscribe((response) => {
      response = response.filter((employeeType) => {
        return employeeType.deleted == false;
      });
      this.employeetypes = response;
      this.employeeTypesTemp = response;
    });
  }

  Search() {
    this.employeeTypesTemp = this.employeetypes;
    if (this.searchText !== '') {
      this.employeeTypesTemp = this.employeeTypesTemp.filter((employeetype) => {
        return employeetype.positioN_NAME.match(this.searchText);
      });
    }
  }

  Return() {
    this.return.emit('false');
  }
}
