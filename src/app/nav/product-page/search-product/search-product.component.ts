import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/_services/product.service';
import { ProductType } from 'src/app/models/Product-Type.model';
import { ProductTypeService } from 'src/app/_services/product-type.service';
import { ProductCategory } from 'src/app/models/Product-Category.model';
import { ProductCategoryService } from 'src/app/_services/product-category.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css'],
})
export class SearchProductComponent implements OnInit {
  @Output() return = new EventEmitter<string>();

  // products
  products: Product[] = [];
  productsTemp: Product[] = [];

  //product Type
  productTypes: ProductType[] = [];
  productTypesTemp: ProductType[] = [];

  //Product Category
  productCategories: ProductCategory[] = [];
  productCategoriesTemp: ProductCategory[] = [];

  //dynamicArray
  dynamicArray = [];
  tempArray = [];

  searchText: string = '';

  constructor(
    private productService: ProductService,
    private productCategoryService: ProductCategoryService,
    private productTypeService: ProductTypeService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe((response) => {
      console.log('this is all the products');
      console.log(response);
      this.products = response;
      this.productsTemp = response;
      this.getProductCategories();
    });
  }

  getProductCategories() {
    this.productCategoryService.getAllProductCategories().subscribe((res) => {
      this.productCategories = res;
      this.getProductTypes();
    });
  }

  getProductTypes() {
    this.productTypeService.getAllProductTypes().subscribe((res) => {
      this.productTypes = res;
      this.createDynamicArray();
    });
  }

  createDynamicArray() {
    this.dynamicArray = [];
    for (let i = 0; i < this.products.length; i++) {
      const element = this.products[i];
      if (!element.deleted) {
        //get category
        this.productCategoriesTemp = this.productCategories;
        this.productCategoriesTemp = this.productCategoriesTemp.filter(
          (temp) => {
            return temp.producT_CATEGORY_ID == element.producT_CATEGORY_ID;
          }
        );

        //get type
        this.productTypesTemp = this.productTypes;
        this.productTypesTemp = this.productTypesTemp.filter((temp) => {
          return temp.producT_TYPE_ID == element.producT_TYPE_ID;
        });

        //push
        this.dynamicArray.push({
          name: element.producT_NAME,
          description: element.producT_DESCRIPTION,
          type: this.productTypesTemp[0].typE_NAME,
          category: this.productCategoriesTemp[0].categorY_NAME,
          product: element,
        });
      }
    }
    this.tempArray = this.dynamicArray;
  }

  Search() {
    this.dynamicArray = this.tempArray;
    if (this.searchText !== '') {
      this.dynamicArray = this.dynamicArray.filter((product) => {
        return (
          product.name.match(this.searchText) ||
          product.description.match(this.searchText) ||
          product.type.match(this.searchText) ||
          product.category.match(this.searchText)
        );
      });
    }
  }

  Return() {
    this.return.emit('false');
  }
}
