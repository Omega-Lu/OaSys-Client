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

  //product category
  productCategories: ProductCategory[] = [];
  productCategoriesTemp: ProductCategory[] = [];

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
        this.productCategoriesTemp = response;
      });
  }

  Search() {
    this.productCategoriesTemp = this.productCategories;
    if (this.searchText !== '') {
      this.productCategoriesTemp = this.productCategoriesTemp.filter(
        (product) => {
          return (
            product.categorY_NAME.match(this.searchText) ||
            product.categorY_DESCRIPTION.match(this.searchText)
          );
        }
      );
    }
  }

  Return() {
    this.return.emit('false');
  }
}
