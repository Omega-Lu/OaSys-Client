import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/_services/product.service';
import { ProductType } from 'src/app/models/Product-Type.model';
import { ProductTypeService } from 'src/app/_services/product-type.service';
import { ProductCategory } from 'src/app/models/Product-Category.model';
import { ProductCategoryService } from 'src/app/_services/product-category.service';
import { Stocktake } from 'src/app/models/stocktake.model';
import { StocktakeService } from 'src/app/_services/stocktake.service';

import { ValidationServicesComponent } from 'src/app/validation-services/validation-services.component';

//audit log
import { AuditLog } from 'src/app/models/AuditLog.model';
import { AuditLogService } from 'src/app/_services/AuditLog.service';
import { CurrentUserService } from 'src/app/_services/CurrentUser.service';

@Component({
  selector: 'app-complete-stocktake',
  templateUrl: './complete-stocktake.component.html',
  styleUrls: ['./complete-stocktake.component.css'],
})
export class CompleteStocktakeComponent implements OnInit {
  @Output() return = new EventEmitter<string>();

  //product
  product: Product;
  products: Product[] = [];
  productsTemp: Product[] = [];

  //product type
  productType: ProductType;
  productTypes: ProductType[] = [];
  productTypesTemp: ProductType[] = [];

  //product category
  productCategory: ProductCategory;
  productCategories: ProductCategory[] = [];
  productCategoriesTemp: ProductCategory[] = [];

  successSubmit: boolean = false;
  populateTable: boolean = false;
  completeQuantity: boolean = true;

  dynamicArray = [];
  tempArray = [];

  stocktake: Stocktake = {
    stocktakeID: 0,
    employeeID: 0,
    date: '',
  };

  //audit log
  auditLog: AuditLog = {
    auditLogID: 0,
    userID: 0,
    employeeID: 0,
    functionUsed: 'Complete Stocktake',
    date: new Date(),
    month: 'Oct',
  };

  //import validation
  validate: ValidationServicesComponent = new ValidationServicesComponent();

  constructor(
    private productService: ProductService,
    private productTypeService: ProductTypeService,
    private productCategoryService: ProductCategoryService,
    private stocktakeService: StocktakeService,
    private CurrentUserService: CurrentUserService,
    private AuditLogService: AuditLogService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();

    this.CurrentUserService.getAllCurrentUsers().subscribe((res) => {
      this.auditLog.userID = res[res.length - 1].userID;
      this.auditLog.employeeID = res[res.length - 1].employeeID;
    });
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe((response) => {
      response = response.filter((product) => {
        return product.deleted == false;
      });
      this.products = response;
      console.log(response);
    });
    this.getAllProductTypes();
  }

  getAllProductTypes() {
    this.productTypeService.getAllProductTypes().subscribe((response) => {
      this.productTypes = response;
      console.log(response);
    });
    this.getAllProductCategories();
  }

  getAllProductCategories() {
    this.productCategoryService
      .getAllProductCategories()
      .subscribe((response) => {
        response = response.filter((productCat) => {
          return productCat.deleted == false;
        });
        this.productCategories = response;
        console.log(response);
      });
  }

  categorySelect(id: number) {
    this.dynamicArray = [];
    this.productsTemp = this.products;
    this.productTypesTemp = this.productTypes;
    this.productCategoriesTemp = this.productCategories;

    console.log('productsTemp');

    this.productsTemp = this.productsTemp.filter((product) => {
      return product.producT_CATEGORY_ID == id;
    });

    console.log(this.productsTemp);

    for (let index = 0; index < this.productsTemp.length; index++) {
      this.productTypesTemp = this.productTypes;
      this.productCategoriesTemp = this.productCategories;
      console.log('index van die for loop' + index);
      const element = this.productsTemp[index];

      this.productCategoriesTemp = this.productCategoriesTemp.filter(
        (productCategory) => {
          return (
            productCategory.producT_CATEGORY_ID == element.producT_CATEGORY_ID
          );
        }
      );

      this.productTypesTemp = this.productTypesTemp.filter((productType) => {
        return productType.producT_TYPE_ID == element.producT_TYPE_ID;
      });

      console.log('voor dynamic push');

      this.dynamicArray.push({
        CategoryName: this.productCategoriesTemp[0].categorY_NAME,
        TypeName: this.productTypesTemp[0].typE_NAME,
        ProductName: element.producT_NAME,
        Quantity: element.quantitY_ON_HAND,
        productID: element.producT_ID,
      });
      console.log('na dynamic push');
    }
    console.log(this.dynamicArray);
    const tempArray = this.dynamicArray;
    this.tempArray = tempArray;
  }

  quantityVali(quan: number) {
    if (quan >= 0) {
      this.completeQuantity = this.validate.ValidateInteger(quan);
    } else {
      this.completeQuantity = false;
    }
  }

  completeStock() {
    if (this.completeQuantity == true) {
      for (let index = 0; index < this.dynamicArray.length; index++) {
        const element = this.dynamicArray[index];

        console.log('quantity ' + element.Quantity);

        this.productsTemp = this.products.filter((product) => {
          return product.producT_ID == element.productID;
        });

        console.log('updates product');
        this.product = this.productsTemp[0];
        this.product.quantitY_ON_HAND = element.Quantity;
        this.productService
          .updateProduct(this.product)
          .subscribe((response) => {
            console.log(response);
          });
      }
      this.stocktake.date = new Date().toString();
      this.stocktakeService
        .addStocktake(this.stocktake)
        .subscribe((response) => {
          console.log(response);

          this.getAllProducts();
          this.dynamicArray = [];

          //add to audit log
          this.AuditLogService.addAuditLog(this.auditLog).subscribe((res) => {
            console.log('new audit log entry');
            console.log(res);
            this.successSubmit = true;
          });
        });
    }
  }

  Return() {
    this.return.emit('false');
  }
}
