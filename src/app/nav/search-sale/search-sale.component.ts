import { Component, OnInit } from '@angular/core';
import { Sale } from 'src/app/models/sale.model';

@Component({
  selector: 'app-search-sale',
  templateUrl: './search-sale.component.html',
  styleUrls: ['./search-sale.component.css']
})
export class SearchSaleComponent implements OnInit {
  sales: Sale[] = []
  sale: Sale;
  viewSale: boolean = false
  constructor() { }

  ngOnInit(): void {
  }

  Return(){

  }
}
