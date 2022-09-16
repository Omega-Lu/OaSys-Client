import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/models/Product-Category.model';
import { ProductCategoryService } from 'src/app/_services/product-category.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-maintain-product-category',
  templateUrl: './maintain-product-category.component.html',
  styleUrls: ['./maintain-product-category.component.css'],
})
export class MaintainProductCategoryComponent implements OnInit {
  @Output() return = new EventEmitter<string>();

  updateProductCategory: boolean = false;
  successDelete: boolean = false;

  //product category
  productCategoriesTemp: ProductCategory[] = [];
  productCategories: ProductCategory[] = [];
  productCategory: ProductCategory;

  searchText: string = '';

  deletenumber: any;

  constructor(private productCategoryService: ProductCategoryService) {}

  ngOnInit(): void {
    this.getAllProductCategories();
  }

  deletee(delet: any) {
    this.deletenumber = delet;
  }

  deleteProductCategory() {
    this.productCategoryService
      .deleteProductCategory(this.deletenumber)
      .subscribe((response) => {
        this.getAllProductCategories();
        console.log(response);
        this.successDelete = true;
      });
  }

  populateForm(productCategory: ProductCategory) {
    this.productCategory = productCategory;
    this.updateProductCategory = true;
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

  back() {
    this.return.emit('false');
    this.updateProductCategory = false;
    this.getAllProductCategories();
  }
}
