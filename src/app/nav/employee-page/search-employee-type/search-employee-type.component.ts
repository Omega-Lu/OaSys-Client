import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

  constructor(private employeetypeService: EmployeeTypeService) {}

  ngOnInit(): void {
    this.getAllEmployees();
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
