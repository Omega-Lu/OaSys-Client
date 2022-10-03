import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/_services/employee.service';
import { Output, EventEmitter } from '@angular/core';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-search-employee',
  templateUrl: './search-employee.component.html',
  styleUrls: ['./search-employee.component.css'],
})
export class SearchEmployeeComponent implements OnInit {
  @Output() return = new EventEmitter<string>();

  //employee
  employees: Employee[] = [];
  employeesTemp: Employee[] = [];

  searchText: string = '';

  imagePath: string;

  name = '';
  surname = '';
  idNumber = 0;

  //help pdf
  pdfPath = 'https://localhost:7113/Resources/pdfs/Search employee.pdf';
  displayPDF: boolean = false;

  constructor(private employeeService: EmployeeService) {}

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
    this.employeeService.getAllEmployees().subscribe((response) => {
      response = response.filter((temp) => {
        return temp.deleted == false;
      });
      this.employees = response;
      this.employeesTemp = response;
    });
  }

  Search() {
    this.employeesTemp = this.employees;
    if (this.searchText !== '') {
      this.employeesTemp = this.employeesTemp.filter((employee) => {
        return employee.name.match(this.searchText);
      });
    }
  }

  Return() {
    this.return.emit('false');
  }

  getPicture(emp: Employee) {
    this.name = emp.name;
    this.surname = emp.surname;
    this.idNumber = emp.employeE_ID_NUMBER;
    this.imagePath = 'https://localhost:7113/' + emp.img;
  }
}
