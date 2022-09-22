import { Component, OnInit } from '@angular/core';
import { ProductType } from 'src/app/models/Product-Type.model';
import { ProductTypeService } from 'src/app/_services/product-type.service';
import { ProductCategory } from 'src/app/models/Product-Category.model';
import { Output, EventEmitter } from '@angular/core';
import { ProductCategoryService } from 'src/app/_services/product-category.service';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-maintain-product-type',
  templateUrl: './maintain-product-type.component.html',
  styleUrls: ['./maintain-product-type.component.css'],
})
export class MaintainProductTypeComponent implements OnInit {
  @Output() return = new EventEmitter<string>();

  updateProductType: boolean = false;
  successDelete: boolean = false;

  //product Type
  productTypesTemp: ProductType[] = [];
  productTypes: ProductType[] = [];
  productType: ProductType;

  //product Category
  productCategories: ProductCategory[] = [];
  productCategoriesTemp: ProductCategory[] = [];

  //products
  products: Product[] = [];
  productsTemp: Product[] = [];

  searchText: string = '';

  deletenumber: any;

  //dynamic Array
  dynamicArray = [];
  tempArray = [];

  //reference
  hasReference: boolean = false;

  constructor(
    private productTypeService: ProductTypeService,
    private productCategoryService: ProductCategoryService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getAllProductTypes();
  }

  deletee(delet: any) {
    this.productType = delet;
    this.ActiveReferece();
  }

  ActiveReferece() {
    this.hasReference = false;

    //product Reference
    this.productService.getAllProducts().subscribe((res) => {
      res = res.filter((product) => {
        return product.producT_TYPE_ID == this.productType.producT_TYPE_ID;
      });
      let activeArray;
      if (res.length > 0) {
        activeArray = res.filter((product) => {
          return product.deleted == false;
        });
      }
      if (activeArray.length > 0) {
        this.hasReference = true;
      }
    });
  }

  deleteProductType() {
    this.productType.deleted = true;
    this.productTypeService
      .updateProductType(this.productType)
      .subscribe((response) => {
        this.successDelete = true;
        this.getAllProductTypes();
      });
  }

  populateForm(productType: ProductType) {
    this.productType = productType;
    this.updateProductType = true;
  }

  getAllProductTypes() {
    this.productTypeService.getAllProductTypes().subscribe((response) => {
      this.productTypes = response;
      this.productTypesTemp = response;
      this.getProductCategories();
    });
  }

  getProductCategories() {
    this.productCategoryService.getAllProductCategories().subscribe((res) => {
      this.productCategories = res;
      this.createDynamicArray();
    });
  }

  createDynamicArray() {
    this.dynamicArray = [];
    for (let i = 0; i < this.productTypes.length; i++) {
      const element = this.productTypes[i];
      if (!element.deleted) {
        //get category
        this.productCategoriesTemp = this.productCategories;
        this.productCategoriesTemp = this.productCategoriesTemp.filter(
          (temp) => {
            return temp.producT_CATEGORY_ID == element.producT_CATEGORY_ID;
          }
        );

        //dynamic array
        this.dynamicArray.push({
          name: element.typE_NAME,
          category: this.productCategoriesTemp[0].categorY_NAME,
          productType: element,
        });
      }
    }
    this.tempArray = this.dynamicArray;
  }

  Search() {
    this.dynamicArray = this.tempArray;
    if (this.searchText !== '') {
      this.dynamicArray = this.dynamicArray.filter((productType) => {
        return (
          productType.name.match(this.searchText) ||
          productType.category.match(this.searchText)
        );
      });
    }
  }

  back() {
    this.updateProductType = false;
    this.return.emit('false');
    this.getAllProductTypes();
  }
}
