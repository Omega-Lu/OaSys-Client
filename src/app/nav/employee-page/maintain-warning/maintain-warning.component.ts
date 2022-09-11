import { Component, OnInit } from '@angular/core';
import { Warning } from 'src/app/models/warning.model';
import { WarningService } from 'src/app/_services/warning.service';

@Component({
  selector: 'app-maintain-warning',
  templateUrl: './maintain-warning.component.html',
  styleUrls: ['./maintain-warning.component.css'],
})
export class MaintainWarningComponent implements OnInit {
  warnings: Warning[] = [];
  warning: Warning;
  model: any;
  searchText: any = '';
  updateWarning: boolean = false;
  lekke: any;

  deleteNumber: number;

  successDelete: boolean;

  constructor(private warningService: WarningService) {}

  ngOnInit() {
    this.getAllEmployees();
  }

  deletee(delet: any) {
    this.deleteNumber = delet;
  }

  getAllEmployees() {
    this.warningService.getAllEmployees().subscribe((response) => {
      this.warnings = response;
      console.log(this.warnings);
    });
  }

  deleteEmployee() {
    console.log(this.deleteNumber);
    this.warningService
      .deleteEmployee(this.deleteNumber)
      .subscribe((response) => {
        this.getAllEmployees();
        console.log(this.warning);
        this.successDelete = true;
      });
  }

  populateForm(warning: Warning) {
    this.warning = warning;
    this.updateWarning = true;
  }

  Search() {
    if (this.searchText !== '') {
      let searchValue = this.searchText;
      console.log(searchValue);
      this.warnings = this.warnings.filter((warning) => {
        console.log(warning.warininG_NAME.match(searchValue));
        return warning.warininG_NAME.match(searchValue);
      });
    } else {
      this.getAllEmployees();
    }
  }
}
