import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductCategory } from 'src/app/models/Product-Category.model';
import { ProductCategoryService } from 'src/app/_services/product-category.service';

@Component({
  selector: 'app-update-product-category',
  templateUrl: './update-product-category.component.html',
  styleUrls: ['./update-product-category.component.css'],
})
export class UpdateProductCategoryComponent implements OnInit {
  @Input() productCategory: ProductCategory;

  @Output() return = new EventEmitter<string>();

  details: boolean = true;
  sdetails: boolean = true;

  successSubmit: boolean = false;

  constructor(private productCategoryService: ProductCategoryService) {}

  ngOnInit(): void {
    console.log(this.productCategory);
  }

  onSubmit() {
    this.productCategoryService
      .updateProductCategory(this.productCategory)
      .subscribe((response) => {
        console.log(response);
      });
    this.successSubmit = true;
  }

  namevalidate() {
    var matches = this.productCategory.categorY_NAME.match(/\d+/g);
    if (matches != null) {
      this.details = false;
    } else if (this.productCategory.categorY_NAME == '') {
      this.details = false;
    } else {
      this.details = true;
    }
  }

  survalidate() {
    var matches = this.productCategory.categorY_DESCRIPTION.match(/\d+/g);
    if (matches != null) {
      this.sdetails = false;
    } else if (this.productCategory.categorY_DESCRIPTION == '') {
      this.sdetails = false;
    } else {
      this.sdetails = true;
    }
  }

  Return() {
    this.return.emit('false');
  }
}
