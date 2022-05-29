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

  details: boolean = true;
  cdetails: boolean = false;

  successSubmit: boolean = false;

  productCategory: ProductCategory;
  productCategories: ProductCategory[] = [];

  productType: ProductType = {
    producT_TYPE_ID: 0,
    producT_CATEGORY_ID: 0,
    typE_NAME: '',
  };

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
      });
    this.successSubmit = true;
  }

  categoryValidate(){
    this.cdetails = true;
  }

  getAllProductCategories() {
    this.productCategoryService
      .getAllProductCategories()
      .subscribe((response) => {
        this.productCategories = response;
        console.log(this.productCategories);
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
  }

  Return() {
    this.return.emit('false');
  }
}
