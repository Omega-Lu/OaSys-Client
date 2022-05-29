import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductType } from 'src/app/models/Product-Type.model';
import { ProductTypeService } from 'src/app/_services/product-type.service';
import { ProductCategoryService } from 'src/app/_services/product-category.service';
import { ProductCategory } from 'src/app/models/Product-Category.model';

@Component({
  selector: 'app-update-product-type',
  templateUrl: './update-product-type.component.html',
  styleUrls: ['./update-product-type.component.css']
})
export class UpdateProductTypeComponent implements OnInit {

  @Input() productType: ProductType

  @Output() return = new EventEmitter<string>();

  details: boolean = true;
  cdetails: boolean = true;

  successSubmit : boolean = false;

  productCategory: ProductCategory;
  productCategories: ProductCategory[] = [];

  constructor(private productTypeService: ProductTypeService,
    private productCategoryService: ProductCategoryService) { }

  ngOnInit(): void {
    this.getAllProductCategories();
  }

  onSubmit() {
    this.productTypeService.updateProductType(this.productType).subscribe((response) => {
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
