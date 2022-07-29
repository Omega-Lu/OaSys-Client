import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/_services/product.service';
import { ProductCategory } from 'src/app/models/Product-Category.model';
import { ProductCategoryService } from 'src/app/_services/product-category.service';
import { ProductType } from 'src/app/models/Product-Type.model';
import { ProductTypeService } from 'src/app/_services/product-type.service';
import { ProductWriteOff } from 'src/app/models/ProductWriteOff.model';
import { ProductWriteOffService } from 'src/app/_services/productWriteOff.service';
import { WriteOff } from 'src/app/models/WriteOff.model';
import { WriteOffService } from 'src/app/_services/WriteOff.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-write-off',
  templateUrl: './write-off.component.html',
  styleUrls: ['./write-off.component.css'],
})
export class WriteOffComponent implements OnInit {
  @Output() return = new EventEmitter<string>();

  product: Product;
  products: Product[] = [];
  productsTemp: Product[] = [];
  productsTempQuan: Product[] = [];

  productType: ProductType;
  productTypes: ProductType[] = [];
  productTypesTemp: ProductType[] = [];

  productCategory: ProductCategory;
  productCategories: ProductCategory[] = [];

  productWriteOff: ProductWriteOff = {
    productWriteOffID: 0,
    productID: 0,
    writeOffID: 1,
    quantity: 0,
  };
  productWriteOffs: ProductWriteOff[] = [];

  writeOff: WriteOff = {
    writeOffID: 0,
    date: '',
    reason: '',
  };
  writeOffs: WriteOff[] = [];

  dynamicArray = [];

  successSubmit: boolean = false;
  categorySelected: boolean = false;
  typeSelected: boolean = false;
  productSelected: boolean = false;
  activateQuantity: boolean = true;
  activateReason: boolean = true;
  booloff: boolean = false;
  completeSelection: boolean = true;
  completeQuantity: boolean = true;
  QuanOnHand: boolean = true;

  reason: string;

  constructor(
    private productService: ProductService,
    private productWriteOffService: ProductWriteOffService,
    private writeOffService: WriteOffService,
    private productCategoryService: ProductCategoryService,
    private productTypeService: ProductTypeService
  ) {}

  async ngOnInit() {
    await this.sleep(150);
    this.getAllProducts();
    this.getAllProductCategories();
    this.getAllProductTypes();
    this.getAllProductWriteOffs();
    this.getAllWriteOffs();
    await this.sleep(150);
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe((response) => {
      this.products = response;
      console.log(this.products);
    });
  }

  getAllProductTypes() {
    this.productTypeService.getAllProductTypes().subscribe((response) => {
      this.productTypes = response;
      console.log(this.productTypes);
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

  getAllProductWriteOffs() {
    this.productWriteOffService
      .getAllProductWriteOffs()
      .subscribe((response) => {
        this.productWriteOffs = response;
        console.log(this.productCategories);
      });
  }

  getAllWriteOffs() {
    this.writeOffService.getAllWriteOffs().subscribe((response) => {
      this.writeOffs = response;
      console.log(this.productCategories);
    });
  }

  sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  Return() {
    this.return.emit('false');
  }

  async categorySelect(id: number) {
    this.typeSelected = false;
    $('#typeID').val('-1');
    this.activateReason = true;
    $('#reasonID').val('-1');
    this.activateQuantity = true;
    $('#nameID').val('-1');
    $('#quantityID').val('');

    this.productTypesTemp = this.productTypes;
    this.productTypesTemp = this.productTypesTemp.filter((productType) => {
      console.log(productType.producT_CATEGORY_ID == id);
      return productType.producT_CATEGORY_ID == id;
    });
    console.log('the selected product types from the category are');
    console.log(this.productTypesTemp);
    this.categorySelected = true;
  }

  async typeSelect(id: number) {
    this.activateReason = true;
    $('#nameID').val('-1');
    this.activateQuantity = true;
    $('#reasonID').val('-1');
    $('#quantityID').val('');

    this.productsTemp = this.products;
    console.log(id);
    this.productsTemp = this.productsTemp.filter((product) => {
      console.log(product.producT_TYPE_ID == id);
      return product.producT_TYPE_ID == id;
    });
    console.log('the selected products from the product types are');
    console.log(this.productsTemp);
    this.typeSelected = true;
  }

  nameSelect() {
    this.activateQuantity = true;
    $('#reasonID').val('-1');
    $('#quantityID').val('');
  }

  reasonSelect() {
    $('#quantityID').val('');
    this.completeSelection = true;
  }

  pID: number;

  quantityVali() {
    if (this.quantity > 0) {
      this.completeQuantity = true;
    } else {
      this.completeQuantity = false;
    }
    this.productsTempQuan = this.productsTemp;
    this.productsTempQuan = this.productsTempQuan.filter((products) => {
      console.log(products.producT_ID == this.pID);
      return products.producT_ID == this.pID;
    });
    if (this.productsTempQuan[0].quantitY_ON_HAND < this.quantity) {
      this.QuanOnHand = false;
    } else {
      this.QuanOnHand = true;
    }
  }

  quantity: number;

  addProduct() {
    if (this.activateQuantity == true) {
      this.completeSelection = false;
    } else if (this.quantity < 1 || this.quantity == null) {
      this.completeQuantity = false;
    } else if (this.QuanOnHand == false) {
    } else {
      const categoryText = $('#categoryID option:selected').text();
      const typeText = $('#typeID option:selected').text();
      const nameText = $('#nameID option:selected').text();
      this.reason = $('#reasonID option:selected').text();

      console.log(categoryText);
      console.log(typeText);
      console.log(nameText);
      console.log(this.quantity);
      this.booloff = true;

      this.dynamicArray.push({
        category: categoryText,
        type: typeText,
        name: nameText,
        quantity: this.quantity,
        productIDnumber: this.pID,
        reason: this.reason,
      });
    }
  }

  WriteOff() {
    for (let index = 0; index < this.dynamicArray.length; index++) {
      const element = this.dynamicArray[index];

      //get all the product write off IDs
      this.getAllProductWriteOffs();
      this.sleep(75);

      //get all the products
      this.productsTemp = this.products;

      this.writeOff.date = new Date().toString();
      this.writeOff.reason = element.reason;
      this.writeOffService
        .addWriteOff(this.writeOff)
        .subscribe((response) => {
          console.log(response);
        });


      //product write off code
      this.productWriteOff.productID = element.productIDnumber;
      this.getAllProductWriteOffs();
      this.sleep(75);
      this.productWriteOff.writeOffID = this.writeOffs[this.writeOffs.length -1].writeOffID + 1;
      this.productWriteOff.quantity = element.quantity;
      this.productWriteOffService.addProductWriteOff(this.productWriteOff).subscribe((response) => {
        console.log(response);
      })

      //product code stuff
      this.productsTemp = this.productsTemp.filter((product) => {
        console.log(product.producT_ID == element.productIDnumber);
        return product.producT_ID == element.productIDnumber;
      });
      this.product = this.productsTemp[0];
      this.product.quantitY_ON_HAND =
        this.product.quantitY_ON_HAND - element.quantity;
      this.productService.updateProduct(this.product).subscribe((response) => {
        console.log(response);
      });
    }
  }
}
