import { Component, OnInit } from '@angular/core';
import { WarningType } from 'src/app/models/warning-type.model';
import { WarningTypeService } from 'src/app/_services/warning-type.service';

@Component({
  selector: 'app-add-warning-type',
  templateUrl: './add-warning-type.component.html',
  styleUrls: ['./add-warning-type.component.css']
})
export class AddWarningTypeComponent implements OnInit {
  warningType: WarningType = {
    warninG_TYPE_ID: 0,
    description: ""
  }

  constructor(private warningTypeService: WarningTypeService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.warningTypeService.addEmployee(this.warningType).subscribe(response =>{
      console.log(response);
    })
    
  }

}
