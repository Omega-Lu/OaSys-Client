import { Component, OnInit } from '@angular/core';
import { ProductType } from 'src/app/models/Product-Type.model';
import { ProductTypeService } from 'src/app/_services/product-type.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-product-type',
  templateUrl: './search-product-type.component.html',
  styleUrls: ['./search-product-type.component.css'],
})
export class SearchProductTypeComponent implements OnInit {
  @Output() return = new EventEmitter<string>();

  //product Type
  productTypes: ProductType[] = [];
  productTypesTemp: ProductType[] = [];

  searchText: string = '';

  constructor(private productTypeService: ProductTypeService) {}

  ngOnInit(): void {
    this.getAllProductTypes();
  }

  getAllProductTypes() {
    this.productTypeService.getAllProductTypes().subscribe((response) => {
      this.productTypes = response;
      this.productTypesTemp = response;
    });
  }

  Search() {
    this.productTypesTemp = this.productTypes;
    if (this.searchText !== '') {
      this.productTypesTemp = this.productTypesTemp.filter((productType) => {
        return productType.typE_NAME.match(this.searchText);
      });
    }
  }

  Return() {
    this.return.emit('false');
  }
}
