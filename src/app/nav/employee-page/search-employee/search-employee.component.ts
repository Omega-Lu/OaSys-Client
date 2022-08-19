import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/_services/employee.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-employee',
  templateUrl: './search-employee.component.html',
  styleUrls: ['./search-employee.component.css']
})
export class SearchEmployeeComponent implements OnInit {
  @Output() return = new EventEmitter<string>();
  //title = 'employees';
  employees: Employee[] = [];
  searchText : string = '';

  constructor(private employeeService: EmployeeService ) { 

  }

  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.employeeService.getAllEmployees()
    .subscribe(
      response => {
        this.employees = response;
        console.log(this.employees);
      }
    );
  }

  Search() {
    if(this.searchText !== ""){
      let searchValue = this.searchText
      console.log(searchValue);
      this.employees = this.employees.filter((employee) =>{
        console.log(employee.name.match(searchValue));
        return employee.name.match(searchValue);  
      
            });
          }
    else {
      this.getAllEmployees();
    }
  }

  Return(){
    this.return.emit("false");
  }


}
