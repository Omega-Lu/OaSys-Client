import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/_services/product.service';
import { ProductType } from 'src/app/models/Product-Type.model';
import { ProductCategoryService } from 'src/app/_services/product-category.service';
import { ProductCategory } from 'src/app/models/Product-Category.model';
import { ProductTypeService } from 'src/app/_services/product-type.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  @Output() return = new EventEmitter<string>();

  details: boolean = true;
  pdetails: boolean = true;
  categorySelected: boolean = false;
  successSubmit: boolean = false;

  cdetails: boolean = true;
  sdetails: boolean = true;

  productCategory: ProductCategory;
  productCategories: ProductCategory[] = [];

  productType: ProductType;
  productTypes: ProductType[] = [];
  productTemp: ProductType[] = [];

  product: Product = {
    producT_ID: 0,
    producT_CATEGORY_ID: 0,
    producT_TYPE_ID: 0,
    producT_NAME: '',
    producT_DESCRIPTION: '',
    quantitY_ON_HAND: 0,
    cosT_PRICE: 0,
    sellinG_PRICE: 0,
    reordeR_LIMIT: 0,
  };

  constructor(
    private productService: ProductService,
    private productCategoryService: ProductCategoryService,
    private productTypeService: ProductTypeService
  ) {}

  ngOnInit(): void {
    this.getAllProductCategories();
    this.getAllProductTypes();
  }

  getAllProductCategories() {
    this.productCategoryService
      .getAllProductCategories()
      .subscribe((response) => {
        this.productCategories = response;
        console.log(this.productCategories);
      });
  }

  getAllProductTypes() {
    this.productTypeService.getAllProductTypes().subscribe((response) => {
      this.productTemp = response;
      console.log(this.productTypes);
    });
  }

  onSubmit() {
    this.productService.addProduct(this.product).subscribe((response) => {
      console.log(response);
    });
    this.successSubmit = true;
  }

  namevalidate() {
    var matches = this.product.producT_NAME.match(/\d+/g);
    if (matches != null) {
      this.details = false;
    } else if (this.product.producT_NAME == '') {
      this.details = false;
    } else {
      this.details = true;
    }
  }

  survalidate() {
    var matches = this.product.producT_DESCRIPTION.match(/\d+/g);
    if (matches != null) {
      this.pdetails = false;
    } else if (this.product.producT_DESCRIPTION == '') {
      this.pdetails = false;
    } else {
      this.pdetails = true;
    }
  }

  Return() {
    this.return.emit('false');
  }

  async categorySelect(id: number) {
    this.productTypeService.getAllProductTypes().subscribe((response) => {
      this.productTemp = response;
      console.log(this.productTypes);
    });
    this.productTypes = this.productTemp.filter((productType) => {
      console.log(productType.producT_CATEGORY_ID == id);
      return productType.producT_CATEGORY_ID == id;
    });
    console.log(this.productTypes);
    this.categorySelected = true;
  }

  Costvalidate() {
    if (this.product.cosT_PRICE < 1) {
      this.cdetails = false;
    } else {
      this.cdetails = true;
    }
  }

  Sellvalidate() {
    if (this.product.sellinG_PRICE < 1) {
      this.sdetails = false;
    } else {
      this.sdetails = true;
    }
  }
}
