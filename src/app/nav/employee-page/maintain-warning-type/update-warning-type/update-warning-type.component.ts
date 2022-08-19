import { Component, Input, OnInit } from '@angular/core';
import { WarningType } from 'src/app/models/warning-type.model';
import { WarningTypeService } from 'src/app/_services/warning-type.service';

@Component({
  selector: 'app-update-warning-type',
  templateUrl: './update-warning-type.component.html',
  styleUrls: ['./update-warning-type.component.css']
})
export class UpdateWarningTypeComponent implements OnInit {
  @Input() warningtype : WarningType;

  constructor(private warningTypeService: WarningTypeService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.warningTypeService.updateEmployee(this.warningtype)
    .subscribe( response => {
      console.log(response);
    })
  }

}
