import { Component, OnInit } from '@angular/core';
import { WarningType } from 'src/app/models/warning-type.model';
import { WarningTypeService } from 'src/app/_services/warning-type.service';

@Component({
  selector: 'app-maintain-warning-type',
  templateUrl: './maintain-warning-type.component.html',
  styleUrls: ['./maintain-warning-type.component.css'],
})
export class MaintainWarningTypeComponent implements OnInit {
  //warning types
  warningtype: WarningType;
  warningtypes: WarningType[] = [];
  warningTypesTemp: WarningType[] = [];

  searchText: any = '';
  updateWarning: boolean = false;

  successDelete: boolean = false;

  deleteID;

  constructor(private warningTypeService: WarningTypeService) {}

  ngOnInit() {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.warningTypeService.getAllEmployees().subscribe((response) => {
      this.warningtypes = response;
      this.warningTypesTemp = response;
      console.log(this.warningtypes);
    });
  }

  deletee(delID) {
    this.deleteID = delID;
  }

  deleteEmployee() {
    this.warningTypeService
      .deleteEmployee(this.deleteID)
      .subscribe((response) => {
        this.getAllEmployees();
        console.log(this.warningtypes);
        this.successDelete = true;
      });
  }

  populateForm(warningtype: WarningType) {
    this.warningtype = warningtype;
    this.updateWarning = true;
  }

  Search() {
    this.warningTypesTemp = this.warningtypes;
    if (this.searchText !== '') {
      this.warningTypesTemp = this.warningTypesTemp.filter((warning) => {
        return warning.description.match(this.searchText);
      });
    }
  }

  back() {
    this.updateWarning = false;
    this.getAllEmployees();
  }
}
