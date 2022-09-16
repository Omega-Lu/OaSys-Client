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

  //warning types
  warningtypes: WarningType[] = [];
  warningTypesTemp: WarningType[] = [];

  searchText: string = '';

  constructor(private warningtypesService: WarningTypeService) {}

  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.warningtypesService.getAllEmployees().subscribe((response) => {
      this.warningtypes = response;
      this.warningTypesTemp = response;
      console.log(this.warningtypes);
    });
  }

  Search() {
    this.warningTypesTemp = this.warningtypes;
    if (this.searchText !== '') {
      this.warningTypesTemp = this.warningTypesTemp.filter((warning) => {
        return warning.description.match(this.searchText);
      });
    }
  }

  Return() {
    this.return.emit('false');
  }
}
