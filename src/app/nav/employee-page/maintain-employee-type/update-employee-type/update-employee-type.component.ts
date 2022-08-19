import { Component, Input, OnInit } from '@angular/core';
import { EmployeeType } from 'src/app/models/employee-type.model';
import { EmployeeTypeService } from 'src/app/_services/employe-type.service';

@Component({
  selector: 'app-update-employee-type',
  templateUrl: './update-employee-type.component.html',
  styleUrls: ['./update-employee-type.component.css']
})
export class UpdateEmployeeTypeComponent implements OnInit {
  @Input() employeetype : EmployeeType;

  constructor(private employeeTypeService: EmployeeTypeService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.employeeTypeService.updateEmployee(this.employeetype)
    .subscribe( response => {
      console.log(response);
    })
  }

}
