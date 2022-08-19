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

  productTypes: ProductType[] = [];
  searchText: string = '';

  constructor(private productTypeService: ProductTypeService) {}

  ngOnInit(): void {
    this.getAllProductTypes();
  }

  getAllProductTypes() {
    this.productTypeService.getAllProductTypes().subscribe((response) => {
      this.productTypes = response;
      console.log(this.productTypes);
    });
  }

  Search() {
    if (this.searchText !== '') {
      let searchValue = this.searchText;
      console.log(searchValue);
      this.productTypes = this.productTypes.filter((productType) => {
        console.log(productType.typE_NAME.match(searchValue));
        return productType.typE_NAME.match(searchValue);
      });
    } else {
      this.getAllProductTypes();
    }
  }

  Return() {
    this.return.emit('false');
  }
}
