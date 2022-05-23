import { Component, Input, OnInit } from '@angular/core';
import { Warning } from 'src/app/models/warning.model';
import { WarningService } from 'src/app/_services/warning.service';

@Component({
  selector: 'app-update-warning',
  templateUrl: './update-warning.component.html',
  styleUrls: ['./update-warning.component.css']
})
export class UpdateWarningComponent implements OnInit {
  iets : any;
  @Input() warning : Warning;

  constructor(private warningService: WarningService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.warning);
    this.warningService.updateEmployee(this.warning)
    .subscribe( response => {
      console.log(response);
    })
  }

  onInput(){
    console.log(this.warning);
  }

}
