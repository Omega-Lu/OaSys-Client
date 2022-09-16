import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Rate } from 'src/app/models/rate.model';
import { RateService } from 'src/app/_services/rate.service';

@Component({
  selector: 'app-search-wage-rate',
  templateUrl: './search-wage-rate.component.html',
  styleUrls: ['./search-wage-rate.component.css'],
})
export class SearchWageRateComponent implements OnInit {
  @Output() return = new EventEmitter<string>();
  rates: Rate[] = [];
  ratesTemp: Rate[] = [];
  searchText: string = '';

  constructor(private rateervice: RateService) {}

  ngOnInit(): void {
    this.getRates();
  }

  getRates() {
    this.rateervice.getAllEmployees().subscribe((response) => {
      this.rates = response;
      this.ratesTemp = response;
      console.log(this.rates);
    });
  }

  Search() {
    this.ratesTemp = this.rates;
    if (this.searchText !== '') {
      this.ratesTemp = this.ratesTemp.filter((rate) => {
        return rate.ratE_NAME.match(this.searchText);
      });
    }
  }

  Return() {
    this.return.emit('false');
  }
}
