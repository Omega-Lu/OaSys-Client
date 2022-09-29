import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Rate } from 'src/app/models/rate.model';
import { RateService } from 'src/app/_services/rate.service';

import { EmployeeType } from 'src/app/models/employee-type.model';
import { EmployeeTypeService } from 'src/app/_services/employe-type.service';

@Component({
  selector: 'app-search-wage-rate',
  templateUrl: './search-wage-rate.component.html',
  styleUrls: ['./search-wage-rate.component.css'],
})
export class SearchWageRateComponent implements OnInit {
  //rate
  rate: Rate;
  rates: Rate[] = [];
  ratesTemp: Rate[] = [];

  // employeeType
  employeeType: EmployeeType;
  employeeTypes: EmployeeType[] = [];
  employeeTypesTemp: EmployeeType[] = [];

  searchText: string = '';

  constructor(
    private rateService: RateService,
    private employeeTypeService: EmployeeTypeService
  ) {}

  ngOnInit(): void {
    this.getRates();
  }

  getRates() {
    this.rateService.getAllEmployees().subscribe((response) => {
      response = response.filter((rate) => {
        return rate.deleted == false;
      });
      this.rates = response;
      this.ratesTemp = response;
      console.log('all rates');
      console.log(this.rates);

      this.getEmployeeTypes();
    });
  }

  getEmployeeTypes() {
    this.employeeTypeService.getAllEmployees().subscribe((res) => {
      this.employeeTypes = res;
      this.employeeTypesTemp = res;

      this.createDynamicArray();
    });
  }

  ////////////////////////////create dynamic Array //////////////////////////

  dynamicArray = [];
  tempArray = [];

  createDynamicArray() {
    for (let i = 0; i < this.rates.length; i++) {
      const element = this.rates[i];

      let rateName = this.employeeTypes.filter((employeeType) => {
        return employeeType.employeE_TYPE_ID == element.ratE_NAME;
      });

      this.dynamicArray.push({
        name: rateName[0].positioN_NAME,
        amount: element.ratE_AMOUNT.toFixed(2),
        rate: element,
      });
    }
    this.tempArray = this.dynamicArray;
  }

  Search() {
    this.dynamicArray = this.tempArray;
    if (this.searchText !== '') {
      this.dynamicArray = this.dynamicArray.filter((rate) => {
        return rate.name.match(this.searchText);
      });
    }
  }
}
