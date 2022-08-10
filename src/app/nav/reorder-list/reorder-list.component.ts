import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/_services/product.service';
import { ProductType } from 'src/app/models/Product-Type.model';
import { ProductCategoryService } from 'src/app/_services/product-category.service';
import { ProductCategory } from 'src/app/models/Product-Category.model';
import { ProductTypeService } from 'src/app/_services/product-type.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-reorder-list',
  templateUrl: './reorder-list.component.html',
  styleUrls: ['./reorder-list.component.css'],
})
export class ReorderListComponent implements OnInit {
  @Output() return = new EventEmitter<string>();

  product: Product;
  products: Product[] = [];
  productsTemp: Product[] = [];
  productsTemp2: Product[] = [];
  productsTemp3: Product[] = [];

  productCategory: ProductCategory;
  productCategories: ProductCategory[] = [];
  productCategoriesTemp: ProductCategory[] = [];
  productCategoriesTemp2: ProductCategory[] = [];

  productType: ProductType;
  productTypes: ProductType[] = [];
  productTypesTemp: ProductType[] = [];
  productTypesTemp2: ProductType[] = [];

  dynamicArray = [];
  tempArray = [];
  pID: number;
  quantity: number;

  successSubmit: boolean = false;
  completeQuantity: boolean = true;
  activateQuantity: boolean = true;
  addQuan: boolean = true;
  addComplete: boolean = true;

  typeSelected: boolean = false;
  categorySelected: boolean = false;
  completeSelection: boolean = false;

  constructor(
    private productService: ProductService,
    private productCategoryService: ProductCategoryService,
    private productTypeService: ProductTypeService
  ) {}

  async ngOnInit() {
    this.getAllProductCategories();
    this.getAllProductTypes();
    this.getAllProducts();
    await this.sleep(100);

    this.productsTemp = this.products;
    this.productsTemp = this.productsTemp.filter((product) => {
      console.log(product.quantitY_ON_HAND < product.reordeR_LIMIT);
      return product.quantitY_ON_HAND < product.reordeR_LIMIT;
    });

    for (let index = 0; index < this.productsTemp.length; index++) {
      const element = this.productsTemp[index];
      this.productCategoriesTemp = this.productCategories;
      this.productTypesTemp = this.productTypes;

      //filter categories

      this.productCategoriesTemp = this.productCategoriesTemp.filter(
        (productCategory) => {
          console.log(
            productCategory.producT_CATEGORY_ID == element.producT_CATEGORY_ID
          );
          return (
            productCategory.producT_CATEGORY_ID == element.producT_CATEGORY_ID
          );
        }
      );

      //filter types
      this.productTypesTemp = this.productTypesTemp.filter((productType) => {
        console.log(productType.producT_TYPE_ID == element.producT_TYPE_ID);
        return productType.producT_TYPE_ID == element.producT_TYPE_ID;
      });

      this.dynamicArray.push({
        CategoryName: this.productCategoriesTemp[0].categorY_NAME,
        TypeName: this.productTypesTemp[0].typE_NAME,
        ProductName: element.producT_NAME,
        QuanHand: element.quantitY_ON_HAND,
        Quantity: element.reordeR_LIMIT,
        productID: element.producT_ID,
      });
    }
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe((response) => {
      this.products = response;
      console.log(this.products);
    });
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
      this.productTypes = response;
      console.log(this.productTypes);
    });
  }

  quantityVali(quan: number) {
    if (quan >= 0) {
      this.completeQuantity = true;
    } else {
      this.completeQuantity = false;
    }
  }

  addQuantityVali(quan: number) {
    if (this.quantity > 0) {
      this.addQuan = true;
    } else {
      this.addQuan = false;
    }
  }

  sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  async categorySelect(id: number) {
    this.typeSelected = false;
    $('#typeID').val('-1');
    this.activateQuantity = true;
    $('#nameID').val('-1');
    $('#quantityID').val('');

    this.productTypesTemp2 = this.productTypes;
    console.log(this.productTypes);
    this.productTypesTemp2 = this.productTypesTemp2.filter((productType) => {
      console.log(productType.producT_CATEGORY_ID == id);
      return productType.producT_CATEGORY_ID == id;
    });
    console.log('the selected product types from the category are');
    console.log(this.productTypesTemp);
    this.categorySelected = true;
  }

  async typeSelect(id: number) {
    $('#nameID').val('-1');
    this.activateQuantity = true;
    $('#quantityID').val('');

    this.productsTemp2 = this.products;
    console.log(id);
    this.productsTemp2 = this.productsTemp2.filter((product) => {
      console.log(product.producT_TYPE_ID == id);
      return product.producT_TYPE_ID == id;
    });
    console.log('the selected products from the product types are');
    console.log(this.productsTemp);
    this.typeSelected = true;
  }

  nameSelect() {
    $('#quantityID').val('');
    this.completeSelection = true;
    this.addComplete = true;
  }

  printReorder() {
    if (this.completeQuantity == true) {
    } else {
    }
  }

  Return() {
    this.return.emit('false');
  }

  addProduct() {
    if (this.activateQuantity == true) {
      this.addComplete = false;
    } else if (
      this.addQuan == false ||
      this.quantity == null ||
      this.quantity < 1
    ) {
      this.addQuan = false;
    } else {
      const categoryText = $('#categoryID option:selected').text();
      const typeText = $('#typeID option:selected').text();
      const nameText = $('#nameID option:selected').text();
      const quanText = $('#quantityID').val();

      this.productsTemp3 = this.products;
      this.productsTemp3 = this.productsTemp3.filter((product) => {
        console.log(product.producT_ID == this.pID);
        return product.producT_ID == this.pID;
      });

      console.log(categoryText);
      console.log(typeText);
      console.log(nameText);
      console.log(quanText);
      console.log(this.pID);

      this.dynamicArray.push({
        CategoryName: categoryText,
        TypeName: typeText,
        ProductName: nameText,
        QuanHand: this.productsTemp3[0].quantitY_ON_HAND,
        Quantity: quanText,
        productID: this.pID,
      });

      this.quantity = null;

      console.log(this.dynamicArray);
    }
  }
}
