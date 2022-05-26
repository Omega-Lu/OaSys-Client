import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/models/Product-Category.model';
import { ProductCategoryService } from 'src/app/_services/product-category.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-product-category',
  templateUrl: './search-product-category.component.html',
  styleUrls: ['./search-product-category.component.css'],
})
export class SearchProductCategoryComponent implements OnInit {
  @Output() return = new EventEmitter<string>();

  productCategories: ProductCategory[] = [];
  searchText: string = '';

  constructor(private productCategoryService: ProductCategoryService) {}

  ngOnInit(): void {
    this.getAllProductCategories();
  }

  getAllProductCategories() {
    this.productCategoryService
      .getAllProductCategories()
      .subscribe((response) => {
        this.productCategories = response;
        console.log(this.productCategories);
      });
  }

  Search() {
    if (this.searchText !== '') {
      let searchValue = this.searchText;
      console.log(searchValue);
      this.productCategories = this.productCategories.filter((product) => {
        console.log(product.categorY_NAME.match(searchValue));
        return product.categorY_NAME.match(searchValue);
      });
    } else {
      this.getAllProductCategories();
    }
  }

  Return() {
    this.return.emit('false');
  }
}
