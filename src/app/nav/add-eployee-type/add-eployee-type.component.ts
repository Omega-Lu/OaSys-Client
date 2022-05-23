import { Component, OnInit } from '@angular/core';
import { EmployeeType } from 'src/app/models/employee-type.model';
import { EmployeeTypeService } from 'src/app/_services/employe-type.service';

@Component({
  selector: 'app-add-eployee-type',
  templateUrl: './add-eployee-type.component.html'
})
export class AddEployeeTypeComponent implements OnInit {

  details: boolean = true;

  employeetype: EmployeeType = {
  employeE_TYPE_ID: 0,
  useR_ROLE_ID: 0,
  positioN_NAME: ""
  }

  constructor(private employeetypeService: EmployeeTypeService ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.employeetypeService.addEmployee(this.employeetype).subscribe(response =>{
      console.log(response);
    })
    
  }

  namevalidate() {
    var matches = this.employeetype.positioN_NAME.match(/\d+/g);
 if (this.employeetype.positioN_NAME == '') {
     this.details = false;
    } else {
      this.details = true;
    }
  }

}
