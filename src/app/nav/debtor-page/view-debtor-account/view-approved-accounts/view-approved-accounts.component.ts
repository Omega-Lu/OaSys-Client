import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Debtor } from 'src/app/models/debtor.model';
import { DebtorService } from '../../../../_services/debtor.service';
import { Province } from 'src/app/models/province.model';
import { ProvinceService } from 'src/app/_services/Province.service';
import { City } from 'src/app/models/City.model';
import { CityService } from 'src/app/_services/City.service';

@Component({
  selector: 'app-view-approved-accounts',
  templateUrl: './view-approved-accounts.component.html',
  styleUrls: ['./view-approved-accounts.component.css'],
})
export class ViewApprovedAccountsComponent implements OnInit {
  @Input() debtor: Debtor;
  @Output() return = new EventEmitter<string>();

  categorySelected: boolean = false;
  successSubmit: boolean = false;
  capturePayment: boolean = false;

  //province
  provinces: Province[] = [];
  provincesTemp: Province[] = [];

  //city
  cities: City[] = [];
  citiesTemp: City[] = [];

  constructor(
    private debtorService: DebtorService,
    private provinceService: ProvinceService,
    private cityService: CityService
  ) {}

  ngOnInit(): void {
    this.getProvinces();
  }

  getProvinces() {
    this.provinceService.getAllProvinces().subscribe((res) => {
      this.provinces = res;
      console.log('this is all the provinces');
      console.log(this.provinces);
      this.getCities();
    });
  }

  getCities() {
    this.cityService.getAllCitys().subscribe((res) => {
      this.cities = res;
      console.log('this is all the cities');
      console.log(this.cities);
      this.categorySelect(this.debtor.provincE_ID);
    });
  }

  categorySelect(id: number) {
    this.citiesTemp = this.cities;
    this.citiesTemp = this.citiesTemp.filter((city) => {
      return city.provinceID == id;
    });
    this.categorySelected = true;
  }

  Return() {
    this.return.emit('false');
  }

  onSubmit() {}

  populateForm() {
    this.capturePayment = true;
  }
}
