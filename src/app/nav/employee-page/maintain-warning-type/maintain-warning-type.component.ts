import { Component, OnInit } from '@angular/core';
import { WarningType } from 'src/app/models/warning-type.model';
import { WarningTypeService } from 'src/app/_services/warning-type.service';

@Component({
  selector: 'app-maintain-warning-type',
  templateUrl: './maintain-warning-type.component.html',
  styleUrls: ['./maintain-warning-type.component.css'],
})
export class MaintainWarningTypeComponent implements OnInit {
  warningtypes: WarningType[] = [];
  warningtype: WarningType;
  model: any;
  searchText: any = '';
  updateWarning: boolean = false;
  lekke: any;

  constructor(private warningTypeService: WarningTypeService) {}

  ngOnInit() {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.warningTypeService.getAllEmployees().subscribe((response) => {
      this.warningtypes = response;
      console.log(this.warningtypes);
    });
  }

  deleteEmployee(id: number) {
    console.log(id);
    this.warningTypeService.deleteEmployee(id).subscribe((response) => {
      this.getAllEmployees();
      console.log(this.warningtypes);
    });
  }

  populateForm(warningtype: WarningType) {
    this.warningtype = warningtype;
    this.updateWarning = true;
  }

  Search() {
    if (this.searchText !== '') {
      let searchValue = this.searchText;
      console.log(searchValue);
      this.warningtypes = this.warningtypes.filter((warningtype) => {
        console.log(warningtype.description.match(searchValue));
        return warningtype.description.match(searchValue);
      });
    } else {
      this.getAllEmployees();
    }
  }
  back() {
    this.updateWarning = false;
    this.getAllEmployees();
  }
}
