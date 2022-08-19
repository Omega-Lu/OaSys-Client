import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Warning } from 'src/app/models/warning.model';
import { WarningService } from 'src/app/_services/warning.service';

@Component({
  selector: 'app-search-warning',
  templateUrl: './search-warning.component.html',
  styleUrls: ['./search-warning.component.css']
})
export class SearchWarningComponent implements OnInit {
  @Output() return = new EventEmitter<string>();

  warnings: Warning[] = [];
  searchText : string = '';

  constructor(private warningService: WarningService ) { 

  }

  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.warningService.getAllEmployees()
    .subscribe(
      response => {
        this.warnings = response;
        console.log(this.warnings);
      }
    );
  }

  Search() {
    if(this.searchText !== ""){
      let searchValue = this.searchText
      console.log(searchValue);
      this.warnings = this.warnings.filter((warning) =>{
        console.log(warning.warininG_NAME.match(searchValue));
        return warning.warininG_NAME.match(searchValue);  
      
            });
          }
    else {
      this.getAllEmployees();
    }
  }

  Return(){
    this.return.emit("false");
  }

}
