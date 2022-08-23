import { Component, OnInit } from '@angular/core';
import { EmployeeType } from 'src/app/models/employee-type.model';
import { EmployeeTypeService } from 'src/app/_services/employe-type.service';

@Component({
  selector: 'app-maintain-employee-type',
  templateUrl: './maintain-employee-type.component.html',
  styleUrls: ['./maintain-employee-type.component.css'],
})
export class MaintainEmployeeTypeComponent implements OnInit {
  employeetypes: EmployeeType[] = [];
  employeetype: EmployeeType;

  model: any;
  searchText: any = '';
  updateEmployeeType: boolean = false;

  lekke: any;

  successDelete: boolean = false;
  IDDelete: any;

  constructor(private employeeService: EmployeeTypeService) {}

  ngOnInit() {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.employeeService.getAllEmployees().subscribe((response) => {
      this.employeetypes = response;
      console.log('this is all the employee types');
      console.log(this.employeetypes);
    });
  }

  deleteEmployeeType() {
    this.employeeService.deleteEmployee(this.IDDelete).subscribe((response) => {
      this.getAllEmployees();
      console.log(this.employeetypes);
    });
  }

  populateForm(employeetype: EmployeeType) {
    this.employeetype = employeetype;
  }

  deleteID(id) {
    this.IDDelete = id;
  }

  Search() {
    if (this.searchText !== '') {
      let searchValue = this.searchText;
      console.log(searchValue);
      this.employeetypes = this.employeetypes.filter((employeetype) => {
        console.log(employeetype.positioN_NAME.match(searchValue));
        return employeetype.positioN_NAME.match(searchValue);
      });
      console.log(this.employeetype);
    } else {
      this.getAllEmployees();
    }
  }

  back() {
    this.updateEmployeeType = false;
    this.getAllEmployees();
  }
}
