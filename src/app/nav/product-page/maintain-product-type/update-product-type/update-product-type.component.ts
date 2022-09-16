import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductType } from 'src/app/models/Product-Type.model';
import { ProductTypeService } from 'src/app/_services/product-type.service';
import { ProductCategoryService } from 'src/app/_services/product-category.service';
import { ProductCategory } from 'src/app/models/Product-Category.model';

@Component({
  selector: 'app-update-product-type',
  templateUrl: './update-product-type.component.html',
  styleUrls: ['./update-product-type.component.css'],
})
export class UpdateProductTypeComponent implements OnInit {
  //product type
  @Input() productType: ProductType;
  productTypes: ProductType[] = [];
  productTypesTemp: ProductType[] = [];

  @Output() return = new EventEmitter<string>();

  //validation
  details: boolean = true;
  cdetails: boolean = true;

  //unique
  uniqueName: boolean = true;

  successSubmit: boolean = false;

  //product categories
  productCategory: ProductCategory;
  productCategories: ProductCategory[] = [];

  constructor(
    private productTypeService: ProductTypeService,
    private productCategoryService: ProductCategoryService
  ) {}

  ngOnInit(): void {
    this.getAllProductCategories();
    this.productTypeService.getAllProductTypes().subscribe((res) => {
      this.productTypes = res;
      this.productTypesTemp = res;
    });
  }

  onSubmit() {
    this.productTypeService
      .updateProductType(this.productType)
      .subscribe((response) => {
        console.log(response);
        this.successSubmit = true;
      });
  }

  categoryValidate() {
    if (this.productType.producT_CATEGORY_ID == -1) this.cdetails = false;
    else this.cdetails = true;
  }

  getAllProductCategories() {
    this.productCategoryService
      .getAllProductCategories()
      .subscribe((response) => {
        this.productCategories = response;
        console.log(this.productCategories);
      });
  }

  nameValidate() {
    if (this.productType.typE_NAME == '') this.details = false;
    else this.details = true;
    this.compareName();
  }

  compareName() {
    this.productTypesTemp = this.productTypes;
    this.productTypesTemp = this.productTypesTemp.filter((temp) => {
      return temp.producT_CATEGORY_ID == this.productType.producT_CATEGORY_ID;
    });

    this.productTypesTemp = this.productTypesTemp.filter((temp) => {
      return temp.typE_NAME == this.productType.typE_NAME;
    });

    if (
      this.productTypesTemp.length > 0 &&
      this.productTypesTemp[0].producT_TYPE_ID !=
        this.productType.producT_TYPE_ID
    )
      this.uniqueName = false;
    else this.uniqueName = true;
  }

  Return() {
    this.return.emit('false');
  }
}
