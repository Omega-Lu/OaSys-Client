import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { WarningType } from 'src/app/models/warning-type.model';
import { WarningTypeService } from 'src/app/_services/warning-type.service';

@Component({
  selector: 'app-search-warning-type',
  templateUrl: './search-warning-type.component.html',
  styleUrls: ['./search-warning-type.component.css'],
})
export class SearchWarningTypeComponent implements OnInit {
  @Output() return = new EventEmitter<string>();

  warningtypes: WarningType[] = [];
  searchText: string = '';

  constructor(private warningtypesService: WarningTypeService) {}

  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.warningtypesService.getAllEmployees().subscribe((response) => {
      this.warningtypes = response;
      console.log(this.warningtypes);
    });
  }

  Search() {
    if (this.searchText !== '') {
      let searchValue = this.searchText;
      console.log(searchValue);
      this.warningtypes = this.warningtypes.filter((warning) => {
        console.log(warning.description.match(searchValue));
        return warning.description.match(searchValue);
      });
    } else {
      this.getAllEmployees();
    }
  }

  Return() {
    this.return.emit('false');
  }
}
