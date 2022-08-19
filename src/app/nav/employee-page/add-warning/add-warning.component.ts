import { Component, OnInit } from '@angular/core';
import { Warning } from 'src/app/models/warning.model';
import { WarningService } from 'src/app/_services/warning.service';

@Component({
  selector: 'app-add-warning',
  templateUrl: './add-warning.component.html'
})
export class AddWarningComponent implements OnInit {

  warning: Warning = {
    warninG_ID: 0,
    warininG_NAME: "",
    employeE_ID: "",
    warninG_TYPE_ID: 0,
    reason: ""
  }

  constructor(private warningService: WarningService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.warningService.addEmployee(this.warning).subscribe(response =>{
      console.log(response);
    })
    
  }

}
