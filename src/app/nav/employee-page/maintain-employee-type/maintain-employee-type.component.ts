import { Component, OnInit } from '@angular/core';
import { EmployeeType } from 'src/app/models/employee-type.model';
import { EmployeeTypeService } from 'src/app/_services/employe-type.service';

@Component({
  selector: 'app-maintain-employee-type',
  templateUrl: './maintain-employee-type.component.html',
  styleUrls: ['./maintain-employee-type.component.css'],
})
export class MaintainEmployeeTypeComponent implements OnInit {
  //employee type
  employeetype: EmployeeType;
  employeetypes: EmployeeType[] = [];
  employeeTypesTemp: EmployeeType[] = [];

  searchText: any = '';
  updateEmployeeType: boolean = false;

  successDelete: boolean = false;
  IDDelete: any;

  constructor(private employeeService: EmployeeTypeService) {}

  ngOnInit() {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.employeeService.getAllEmployees().subscribe((response) => {
      this.employeetypes = response;
      this.employeeTypesTemp = response;
    });
  }

  deleteEmployeeType() {
    this.employeeService.deleteEmployee(this.IDDelete).subscribe((response) => {
      this.getAllEmployees();
      console.log(this.employeetypes);
      this.successDelete = true;
    });
  }

  populateForm(employeetype: EmployeeType) {
    this.employeetype = employeetype;
    this.updateEmployeeType = true;
  }

  deleteID(id) {
    this.IDDelete = id;
  }

  Search() {
    this.employeeTypesTemp = this.employeetypes;
    if (this.searchText !== '') {
      this.employeeTypesTemp = this.employeeTypesTemp.filter((employeetype) => {
        return employeetype.positioN_NAME.match(this.searchText);
      });
    }
  }

  back() {
    this.updateEmployeeType = false;
    this.getAllEmployees();
  }
}
