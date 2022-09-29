import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/_services/product.service';
import { ProductType } from 'src/app/models/Product-Type.model';
import { ProductCategoryService } from 'src/app/_services/product-category.service';
import { ProductCategory } from 'src/app/models/Product-Category.model';
import { ProductTypeService } from 'src/app/_services/product-type.service';
import { CurrentUser } from 'src/app/models/CurrentUser.model';

import * as $ from 'jquery';

import { ValidationServicesComponent } from 'src/app/validation-services/validation-services.component';

//audit log
import { AuditLog } from 'src/app/models/AuditLog.model';
import { AuditLogService } from 'src/app/_services/AuditLog.service';
import { CurrentUserService } from 'src/app/_services/CurrentUser.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
})
export class UpdateProductComponent implements OnInit {
  @Output() return = new EventEmitter<string>();

  //validation
  validate: ValidationServicesComponent = new ValidationServicesComponent();
  validName: boolean = true;
  validDescription: boolean = true;
  validCost: boolean = true;
  validSell: boolean = true;
  validReorder: boolean = true;
  validBarcode: boolean = true;
  validCategory: boolean = true;
  validType: boolean = true;
  categorySelected: boolean = false;

  //unique
  uniqueNameAndDesc: boolean = true;
  uniqueBarcode: boolean = true;

  successSubmit: boolean = false;

  //product Categorys
  productCategory: ProductCategory;
  productCategories: ProductCategory[] = [];
  productCategoriesTemp: ProductCategory[] = [];

  //product Type
  productType: ProductType;
  productTypes: ProductType[] = [];
  productTypesTemp: ProductType[] = [];

  //product
  @Input() product: Product;
  products: Product[] = [];
  productsTemp: Product[] = [];

  //audit log
  auditLog: AuditLog = {
    auditLogID: 0,
    userID: 0,
    employeeID: 0,
    functionUsed: 'Update Product',
    date: new Date(),
    month: 'Oct',
  };

  constructor(
    private productService: ProductService,
    private productCategoryService: ProductCategoryService,
    private productTypeService: ProductTypeService,
    private CurrentUserService: CurrentUserService,
    private AuditLogService: AuditLogService
  ) {}

  ngOnInit() {
    console.log('this is the product');
    console.log(this.product);

    this.getProducts();

    this.CurrentUserService.getAllCurrentUsers().subscribe((res) => {
      this.auditLog.userID = res[res.length - 1].userID;
      this.auditLog.employeeID = res[res.length - 1].employeeID;
    });
  }

  //////////// get functions /////////////////////////////////////////////

  getProducts() {
    this.productService.getAllProducts().subscribe((res) => {
      this.products = res;
      console.log('this is all the products');
      console.log(this.products);

      this.getAllProductCategories();
    });
  }

  getAllProductCategories() {
    this.productCategoryService
      .getAllProductCategories()
      .subscribe((response) => {
        this.productCategories = response;
        console.log('product categories');
        console.log(this.productCategories);

        this.getAllProductTypes();
      });
  }

  getAllProductTypes() {
    this.productTypeService.getAllProductTypes().subscribe((response) => {
      this.productTypes = response;
      console.log('product types');
      console.log(this.productTypes);

      this.categorySelect(this.product.producT_CATEGORY_ID);
    });
  }

  //////////////////////// validate functions ////////////////////////////////

  FormValidate() {
    this.Costvalidate();
    this.nameValidate();
    this.DescriptionValdate();
    this.Sellvalidate();
    this.BarcodeValidate();
    this.ReorderValidate();
    this.validateCategory();
    this.validateType();
    this.compareBarcode();
    this.CompareNameAndDescription();
  }

  nameValidate() {
    if (this.product.producT_NAME == '') this.validName = false;
    else this.validName = true;
  }

  DescriptionValdate() {
    if (this.product.producT_DESCRIPTION == '') this.validDescription = false;
    else this.validDescription = true;
    this.CompareNameAndDescription();
  }

  CompareNameAndDescription() {
    this.uniqueNameAndDesc = true;
    this.productsTemp = this.products;
    this.productsTemp = this.productsTemp.filter((product) => {
      return (
        product.producT_DESCRIPTION == this.product.producT_DESCRIPTION &&
        product.producT_NAME == this.product.producT_NAME &&
        product.producT_ID != this.product.producT_ID
      );
    });

    if (this.productsTemp.length > 0) {
      this.uniqueNameAndDesc = false;
    } else {
      this.uniqueNameAndDesc = true;
    }
  }

  Costvalidate() {
    if (this.product.cosT_PRICE <= 0) this.validCost = false;
    else {
      this.validCost = this.validate.ValidateMoney(this.product.cosT_PRICE);
    }
  }

  Sellvalidate() {
    if (
      this.product.sellinG_PRICE <= 0 ||
      this.product.cosT_PRICE > this.product.sellinG_PRICE
    )
      this.validSell = false;
    else {
      this.validSell = this.validate.ValidateMoney(this.product.sellinG_PRICE);
    }
  }

  BarcodeValidate() {
    if (this.product.barcode == '') {
      this.validBarcode = false;
    } else {
      this.validBarcode = this.validate.ValidateInteger(this.product.barcode);
      if (this.validBarcode) {
        this.compareBarcode();
      }
    }
  }

  compareBarcode() {
    this.productsTemp = this.products;
    this.productsTemp = this.products.filter((product) => {
      return (
        product.barcode == this.product.barcode &&
        product.producT_ID != this.product.producT_ID
      );
    });
    if (this.productsTemp.length > 0) {
      this.uniqueBarcode = false;
    } else {
      this.uniqueBarcode = true;
    }
  }

  ReorderValidate() {
    if (this.product.reordeR_LIMIT <= 0) {
      this.validReorder = false;
    } else {
      this.validReorder = this.validate.ValidateInteger(
        this.product.reordeR_LIMIT
      );
    }
  }

  async categorySelect(id: number) {
    console.log('categorySelect ' + id);
    console.log($('#productCategory').val());
    this.productTypesTemp = this.productTypes.filter((productType) => {
      return productType.producT_CATEGORY_ID == id;
    });
    console.log('shown types');
    console.log(this.productTypesTemp);
    this.categorySelected = true;
  }

  validateCategory() {
    if (this.product.producT_CATEGORY_ID == -1) {
      this.validCategory = false;
    } else this.validCategory = true;
  }

  validateType() {
    if (this.product.producT_TYPE_ID == -1) {
      this.validType = false;
    } else this.validType = true;
  }

  ////////////// update product //////////////////////////////////////////////

  onSubmit() {
    this.productService.updateProduct(this.product).subscribe((response) => {
      console.log('updated product');
      console.log(response);

      //add to audit log
      this.AuditLogService.addAuditLog(this.auditLog).subscribe((res) => {
        console.log('new audit log entry');
        console.log(res);
        this.successSubmit = true;
      });
    });
  }

  Return() {
    this.return.emit('false');
  }
}
