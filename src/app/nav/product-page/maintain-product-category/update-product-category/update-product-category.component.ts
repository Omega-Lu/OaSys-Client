import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductCategory } from 'src/app/models/Product-Category.model';
import { ProductCategoryService } from 'src/app/_services/product-category.service';
import { ValidationServicesComponent } from 'src/app/validation-services/validation-services.component';

@Component({
  selector: 'app-update-product-category',
  templateUrl: './update-product-category.component.html',
  styleUrls: ['./update-product-category.component.css'],
})
export class UpdateProductCategoryComponent implements OnInit {
  //product category
  @Input() productCategory: ProductCategory;
  productCategories: ProductCategory[] = [];
  productCategoriesTemp: ProductCategory[] = [];

  @Output() return = new EventEmitter<string>();

  //validation
  details: boolean = true;
  sdetails: boolean = true;
  uniqueName: boolean = true;

  successSubmit: boolean = false;

  constructor(private productCategoryService: ProductCategoryService) {}

  ngOnInit(): void {
    console.log(this.productCategory);
    this.productCategoryService.getAllProductCategories().subscribe((res) => {
      this.productCategories = res;
      this.productCategoriesTemp = res;
    });
  }

  onSubmit() {
    this.productCategoryService
      .updateProductCategory(this.productCategory)
      .subscribe((response) => {
        console.log(response);
        this.successSubmit = true;
      });
  }

  FormValidate() {
    this.namevalidate();
    this.survalidate();
  }

  namevalidate() {
    if (this.productCategory.categorY_NAME == '') this.details = false;
    else this.details = true;
    this.compareName();
  }

  compareName() {
    this.productCategoriesTemp = this.productCategories;
    this.productCategoriesTemp = this.productCategoriesTemp.filter((temp) => {
      return temp.categorY_NAME == this.productCategory.categorY_NAME;
    });
    if (
      this.productCategoriesTemp.length > 0 &&
      this.productCategory.producT_CATEGORY_ID !=
        this.productCategoriesTemp[0].producT_CATEGORY_ID
    )
      this.uniqueName = false;
    else this.uniqueName = true;
  }

  survalidate() {
    if (this.productCategory.categorY_DESCRIPTION == '') this.sdetails = false;
    else this.sdetails = true;
  }

  Return() {
    this.return.emit('false');
  }
}
