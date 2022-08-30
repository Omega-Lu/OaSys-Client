import { Component, OnInit } from '@angular/core';
import { Rate } from 'src/app/models/rate.model';
import { RateService } from 'src/app/_services/rate.service';

@Component({
  selector: 'app-maintain-wage-rate',
  templateUrl: './maintain-wage-rate.component.html',
  styleUrls: ['./maintain-wage-rate.component.css']
})
export class MaintainWageRateComponent implements OnInit {
  updateRate : boolean = false;
  rates: Rate[] = [];
  rate: Rate;
  model: any;
  searchText: any = '';
  lekke : any;

  constructor(private rateService: RateService) {}

  ngOnInit() {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.rateService.getAllEmployees().subscribe((response) => {
      this.rates = response;
      console.log(this.rates);
    });
  }

  deleteEmployee(id: number) {
    console.log(id);
    this.rateService.deleteEmployee(id).subscribe((response) => {
      this.getAllEmployees();
      console.log(this.rates);
    });
  }

  populateForm(employeetype : Rate){
    this.rate = employeetype;
    this.updateRate = true;
  }

  Search() {
    if(this.searchText !== ""){
      let searchValue = this.searchText
      console.log(searchValue);
      this.rates = this.rates.filter((rate) =>{
        console.log(rate.ratE_NAME.match(searchValue));
        return rate.ratE_NAME.match(searchValue);

            });
            console.log(this.rate);
          }
    else {
      this.getAllEmployees();
    }
  }

}
