import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EmployeeType } from 'src/app/models/employee-type.model';
import { EmployeeTypeService } from 'src/app/_services/employe-type.service';

@Component({
  selector: 'app-search-employee-type',
  templateUrl: './search-employee-type.component.html',
  styleUrls: ['./search-employee-type.component.css']
})
export class SearchEmployeeTypeComponent implements OnInit {
  @Output() return = new EventEmitter<string>();
  employeetypes : EmployeeType[] = [];
  searchText : string = '';

  constructor(private employeetypeService: EmployeeTypeService ) { 

  }

  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.employeetypeService.getAllEmployees()
    .subscribe(
      response => {
        this.employeetypes = response;
        console.log(this.employeetypes);
      }
    );
  }

  Search() {
    if(this.searchText !== ""){
      let searchValue = this.searchText
      console.log(searchValue);
      this.employeetypes = this.employeetypes.filter((employeetype) =>{
        console.log(employeetype.positioN_NAME.match(searchValue));
        return employeetype.positioN_NAME.match(searchValue);  
      
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
