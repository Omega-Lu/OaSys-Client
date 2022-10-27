import { Component, OnInit } from '@angular/core';

import { Vat } from 'src/app/models/Vat.model';
import { VatService } from 'src/app/_services/Vat.service';

@Component({
  selector: 'app-search-vat',
  templateUrl: './search-vat.component.html',
  styleUrls: ['./search-vat.component.css'],
})
export class SearchVatComponent implements OnInit {
  //vat
  vat: Vat;
  vats: Vat[] = [];
  vatsTemp: Vat[] = [];

  searchText: string = '';

  constructor(private vatService: VatService) {}

  ngOnInit() {
    this.vatService.getAllVatses().subscribe((res) => {
      this.vats = res;
      this.vatsTemp = res;
    });
  }

  Search() {
    this.vats = this.vatsTemp;
    if (this.searchText !== '') {
      this.vats = this.vats.filter((vat) => {
        return (
          vat.vatAmount.toString().match(this.searchText) ||
          vat.dateModified.match(this.searchText)
        );
      });
    }
  }


}
