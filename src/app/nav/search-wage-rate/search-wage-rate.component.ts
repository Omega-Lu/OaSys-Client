import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Rate } from 'src/app/models/rate.model';
import { RateService } from 'src/app/_services/rate.service';

@Component({
  selector: 'app-search-wage-rate',
  templateUrl: './search-wage-rate.component.html',
  styleUrls: ['./search-wage-rate.component.css']
})
export class SearchWageRateComponent implements OnInit {
  @Output() return = new EventEmitter<string>();
  rates: Rate[] = [];
  searchText : string = '';

  constructor(private rateervice: RateService ) { 

  }

  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.rateervice.getAllEmployees()
    .subscribe(
      response => {
        this.rates = response;
        console.log(this.rates);
      }
    );
  }

  Search() {
    if(this.searchText !== ""){
      let searchValue = this.searchText
      console.log(searchValue);
      this.rates = this.rates.filter((rate) =>{
        console.log(rate.ratE_NAME.match(searchValue));
        return rate.ratE_NAME.match(searchValue);  
      
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
