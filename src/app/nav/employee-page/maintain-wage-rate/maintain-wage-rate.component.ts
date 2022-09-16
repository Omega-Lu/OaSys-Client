import { Component, OnInit } from '@angular/core';
import { Rate } from 'src/app/models/rate.model';
import { RateService } from 'src/app/_services/rate.service';

@Component({
  selector: 'app-maintain-wage-rate',
  templateUrl: './maintain-wage-rate.component.html',
  styleUrls: ['./maintain-wage-rate.component.css'],
})
export class MaintainWageRateComponent implements OnInit {
  updateRate: boolean = false;

  //rate
  rate: Rate;
  rates: Rate[] = [];
  ratesTemp: Rate[] = [];

  searchText: any = '';

  constructor(private rateService: RateService) {}

  ngOnInit() {
    this.getRates();
  }

  getRates() {
    this.rateService.getAllEmployees().subscribe((response) => {
      this.rates = response;
      this.ratesTemp = response;
      console.log(this.rates);
    });
  }

  deleteID: number;
  deletee(id) {
    this.deleteID = id;
  }

  deleteWageRate() {
    this.rateService.deleteEmployee(this.deleteID).subscribe((response) => {
      this.getRates();
      console.log(this.rates);
    });
  }

  populateForm(employeetype: Rate) {
    this.rate = employeetype;
    this.updateRate = true;
  }

  Search() {
    this.ratesTemp = this.rates;
    if (this.searchText !== '') {
      this.ratesTemp = this.ratesTemp.filter((rate) => {
        return rate.ratE_NAME.match(this.searchText);
      });
    }
  }

  back() {
    this.updateRate = false;
    this.getRates();
  }
}
