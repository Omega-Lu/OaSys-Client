import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductCategory } from 'src/app/models/Product-Category.model';
import { ProductCategoryService } from 'src/app/_services/product-category.service';
import { ValidationServicesComponent } from 'src/app/validation-services/validation-services.component';

@Component({
  selector: 'app-add-product-category',
  templateUrl: './add-product-category.component.html',
  styleUrls: ['./add-product-category.component.css'],
})
export class AddProductCategoryComponent implements OnInit {
  @Output() return = new EventEmitter<string>();

  //validations
  validCategory: boolean = true;
  validDescription: boolean = true;
  validate: ValidationServicesComponent = new ValidationServicesComponent();
  uniqueCatName: boolean = true;

  successSubmit: boolean = false;

  //product Categories
  productCategory: ProductCategory = {
    producT_CATEGORY_ID: 0,
    categorY_NAME: '',
    categorY_DESCRIPTION: '',
  };
  productCategories: ProductCategory[] = [];
  productCategoriesTemp: ProductCategory[] = [];

  constructor(private productCategoryService: ProductCategoryService) {}

  ngOnInit() {
    this.getProductCategories();
  }

  onSubmit() {
    this.productCategoryService
      .addProductCategory(this.productCategory)
      .subscribe((response) => {
        console.log(response);
        this.successSubmit = true;
      });
  }

  FormValidate() {
    this.nameValidate();
    this.descriptionValidate();
  }

  nameValidate() {
    this.validCategory = this.validate.ValidateString(
      this.productCategory.categorY_NAME
    );
    this.compareName();
  }

  compareName() {
    this.productCategoriesTemp = this.productCategories;
    this.productCategoriesTemp = this.productCategoriesTemp.filter(
      (category) => {
        return category.categorY_NAME == this.productCategory.categorY_NAME;
      }
    );
    console.log(this.productCategoriesTemp);
    if (this.productCategoriesTemp.length > 0) {
      this.uniqueCatName = false;
    } else this.uniqueCatName = true;
  }

  getProductCategories() {
    this.productCategoryService.getAllProductCategories().subscribe((res) => {
      this.productCategories = res;
      console.log('this is all the product categories');
      console.log(this.productCategories);
    });
  }

  descriptionValidate() {
    if (this.productCategory.categorY_DESCRIPTION == '') {
      this.validDescription = false;
    } else {
      this.validDescription = true;
    }
  }

  Return() {
    this.return.emit('false');
  }
}
