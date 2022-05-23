import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/_services/employee.service';

@Component({
  selector: 'app-maintain-employee',
  templateUrl: './maintain-employee.component.html',
  styleUrls: ['./maintain-employee.component.css'],
})
export class MaintainEmployeeComponent implements OnInit {
  @Output() return = new EventEmitter<string>();
  employees: Employee[] = [];
  employee: Employee;
  successDelete : boolean = false;
  model: any;
  delete : boolean = false;
  searchText: any = '';
  updateEmployee: boolean = false;
  lekke : any;
  deletenumber : any;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.getAllEmployees();
  }

  deletee(delet : any){
    this.deletenumber = delet;
  }

  getAllEmployees() {
    this.employeeService.getAllEmployees().subscribe((response) => {
      this.employees = response;
      console.log(this.employees);
    });
  }

  deleteEmployee() {
    this.employeeService.deleteEmployee(this.deletenumber).subscribe((response) => {
      this.getAllEmployees();
      console.log(this.employees);
    });
  }

  populateForm(employee : Employee){
    this.employee = employee;
  }

  Search() {
    if(this.searchText !== ""){
      let searchValue = this.searchText
      console.log(searchValue);
      this.employees = this.employees.filter((employee) =>{
        console.log(employee.name.match(searchValue));
        return employee.name.match(searchValue);  
      
            });
            console.log(this.employee);
          }
    else {
      this.getAllEmployees();
    }
  }

  back(){
    this.return.emit('false');
  }


}
