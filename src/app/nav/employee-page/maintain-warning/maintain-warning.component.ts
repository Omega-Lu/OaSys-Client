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

  constructor(private warningService: WarningService) {}

  ngOnInit() {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.warningService.getAllEmployees().subscribe((response) => {
      this.warnings = response;
      console.log(this.warnings);
    });
  }

  deleteEmployee(id: number) {
    console.log(id);
    this.warningService.deleteEmployee(id).subscribe((response) => {
      this.getAllEmployees();
      console.log(this.warnings);
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
