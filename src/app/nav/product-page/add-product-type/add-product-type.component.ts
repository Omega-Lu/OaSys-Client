import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductType } from 'src/app/models/Product-Type.model';
import { ProductTypeService } from 'src/app/_services/product-type.service';
import { ProductCategoryService } from 'src/app/_services/product-category.service';
import { ProductCategory } from 'src/app/models/Product-Category.model';

@Component({
  selector: 'app-add-product-type',
  templateUrl: './add-product-type.component.html',
  styleUrls: ['./add-product-type.component.css'],
})
export class AddProductTypeComponent implements OnInit {
  @Output() return = new EventEmitter<string>();

  //validation
  details: boolean = true;
  cdetails: boolean = true;
  uniqueName: boolean = true;

  successSubmit: boolean = false;

  //product Category
  productCategory: ProductCategory;
  productCategories: ProductCategory[] = [];

  //product Type
  productType: ProductType = {
    producT_TYPE_ID: 0,
    producT_CATEGORY_ID: -1,
    typE_NAME: '',
  };
  productTypes: ProductType[] = [];
  productTypesTemp: ProductType[] = [];

  constructor(
    private productTypeService: ProductTypeService,
    private productCategoryService: ProductCategoryService
  ) {}

  ngOnInit(): void {
    this.getAllProductCategories();
  }

  onSubmit() {
    this.productTypeService
      .addProductType(this.productType)
      .subscribe((response) => {
        console.log(response);
        this.successSubmit = true;
      });
  }

  FormValidate() {
    this.categoryValidate();
    this.namevalidate();
    this.compareNames();
  }

  categoryValidate() {
    if (this.productType.producT_CATEGORY_ID == -1) {
      this.cdetails = false;
    } else this.cdetails = true;
  }

  getAllProductCategories() {
    this.productCategoryService
      .getAllProductCategories()
      .subscribe((response) => {
        this.productCategories = response;
        console.log(this.productCategories);
        this.getProductTypes();
      });
  }

  getProductTypes() {
    this.productTypeService.getAllProductTypes().subscribe((res) => {
      this.productTypes = res;
    });
  }

  namevalidate() {
    var matches = this.productType.typE_NAME.match(/\d+/g);
    if (matches != null) {
      this.details = false;
    } else if (this.productType.typE_NAME == '') {
      this.details = false;
    } else {
      this.details = true;
    }
    this.compareNames();
  }

  compareNames() {
    this.productTypesTemp = this.productTypes;
    this.productTypesTemp = this.productTypesTemp.filter((type) => {
      return type.producT_CATEGORY_ID == this.productType.producT_CATEGORY_ID;
    });
    this.productTypesTemp = this.productTypesTemp.filter((type) => {
      return type.typE_NAME == this.productType.typE_NAME;
    });
    if (this.productTypesTemp.length > 0) {
      this.uniqueName = false;
    } else this.uniqueName = true;
  }

  Return() {
    this.return.emit('false');
  }
}
