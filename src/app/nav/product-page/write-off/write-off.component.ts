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

import { ValidationServicesComponent } from 'src/app/validation-services/validation-services.component';

//audit log
import { AuditLog } from 'src/app/models/AuditLog.model';
import { AuditLogService } from 'src/app/_services/AuditLog.service';
import { CurrentUserService } from 'src/app/_services/CurrentUser.service';

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

  //audit log
  auditLog: AuditLog = {
    auditLogID: 0,
    userID: 0,
    employeeID: 0,
    functionUsed: 'Product Write Off',
    date: new Date(),
    month: 'Oct',
  };

  //import validation
  validate: ValidationServicesComponent = new ValidationServicesComponent();

  constructor(
    private productService: ProductService,
    private productWriteOffService: ProductWriteOffService,
    private writeOffService: WriteOffService,
    private productCategoryService: ProductCategoryService,
    private productTypeService: ProductTypeService,
    private CurrentUserService: CurrentUserService,
    private AuditLogService: AuditLogService
  ) {}

  async ngOnInit() {
    this.getAllProducts();

    this.CurrentUserService.getAllCurrentUsers().subscribe((res) => {
      this.auditLog.userID = res[res.length - 1].userID;
      this.auditLog.employeeID = res[res.length - 1].employeeID;
    });
  }

  //////////////////////// get functions ////////////////////////////////////

  getAllProducts() {
    this.productService.getAllProducts().subscribe((response) => {
      response = response.filter((product) => {
        return product.deleted == false;
      });
      this.products = response;

      this.getAllProductTypes();
    });
  }

  getAllProductTypes() {
    this.productTypeService.getAllProductTypes().subscribe((response) => {
      response = response.filter((res) => {
        return res.deleted == false;
      });
      this.productTypes = response;

      this.getAllProductCategories();
    });
  }

  getAllProductCategories() {
    this.productCategoryService
      .getAllProductCategories()
      .subscribe((response) => {
        response = response.filter((res) => {
          return res.deleted == false;
        });
        this.productCategories = response;

        this.getAllProductWriteOffs();
      });
  }

  getAllProductWriteOffs() {
    this.productWriteOffService
      .getAllProductWriteOffs()
      .subscribe((response) => {
        this.productWriteOffs = response;

        this.getAllWriteOffs();
      });
  }

  getAllWriteOffs() {
    this.writeOffService.getAllWriteOffs().subscribe((response) => {
      this.writeOffs = response;
    });
  }

  /////////////////// selecting the product /////////////////////////////////

  async categorySelect(id: number) {
    this.typeSelected = false;
    $('#typeID').val('-1');
    this.activateReason = true;
    $('#reasonID').val('-1');
    this.activateQuantity = true;
    $('#nameID').val('-1');
    $('#quantityID').val('');

    this.productTypesTemp = this.productTypes.filter((productType) => {
      return productType.producT_CATEGORY_ID == id;
    });

    this.categorySelected = true;
    this.inList = false;
  }

  async typeSelect(id: number) {
    this.activateReason = true;
    $('#nameID').val('-1');
    this.activateQuantity = true;
    $('#reasonID').val('-1');
    $('#quantityID').val('');

    this.productsTemp = this.products.filter((product) => {
      return product.producT_TYPE_ID == id;
    });

    this.typeSelected = true;
    this.inList = false;
  }

  nameSelect() {
    this.activateQuantity = true;
    $('#reasonID').val('-1');
    $('#quantityID').val('');
    this.inList = false;
  }

  reasonSelect() {
    $('#quantityID').val('');
    this.completeSelection = true;
    this.inList = false;
  }

  sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  ////////////// validate quantity ///////////////////////////////////////

  pID: number;

  quantityVali() {
    if (this.quantity > 0) {
      this.completeQuantity = this.validate.ValidateInteger(this.quantity);
    } else {
      this.completeQuantity = false;
    }
    this.productsTempQuan = this.productsTemp.filter((products) => {
      return products.producT_ID == this.pID;
    });
    if (this.productsTempQuan[0].quantitY_ON_HAND < this.quantity) {
      this.QuanOnHand = false;
    } else {
      this.QuanOnHand = true;
    }
  }

  ///////////////// add product to dynamic array /////////////////////////////

  quantity: number;

  inList: boolean = false;

  addProduct() {
    if (this.activateQuantity == true) {
      this.completeSelection = false;
    } else if (this.quantity < 1 || this.quantity == null) {
      this.completeQuantity = false;
    } else if (this.QuanOnHand == false) {
    } else {
      let temp = this.dynamicArray.filter((temp) => {
        return temp.productIDnumber == this.pID;
      });
      if (temp.length > 0) this.inList = true;
      else {
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
  }

  ////////////// remove from dynamic array /////////////////////////////////

  deleteRow(index) {
    this.dynamicArray.splice(index, 1);
    if (this.dynamicArray.length < 1) this.booloff = false;
    else this.booloff = true;
    this.inList = false;
  }

  /////////////// write off the products ////////////////////////////////////

  WriteOff() {
    for (let index = 0; index < this.dynamicArray.length; index++) {
      const element = this.dynamicArray[index];

      // add new write off
      this.writeOff.date = new Date().toISOString();
      this.writeOff.reason = element.reason;
      this.writeOffService.addWriteOff(this.writeOff).subscribe((res) => {
        console.log('new write off');
        console.log(res);

        // add product write off
        this.productWriteOff.productID = element.productIDnumber;
        this.productWriteOff.writeOffID = res.writeOffID;
        this.productWriteOff.quantity = element.quantity;
        this.productWriteOffService
          .addProductWriteOff(this.productWriteOff)
          .subscribe((prodWriteOff) => {
            console.log('new product write off');
            console.log(prodWriteOff);
          });

        // update product quanitity
        this.productsTemp = this.products.filter((product) => {
          return product.producT_ID == element.productIDnumber;
        });
        this.productsTemp[0].quantitY_ON_HAND =
          this.productsTemp[0].quantitY_ON_HAND - element.quantity;
        this.productService
          .updateProduct(this.productsTemp[0])
          .subscribe((prodres) => {
            console.log('new product quantity');
            console.log(prodres);
          });
      });

      //add to audit log
      this.AuditLogService.addAuditLog(this.auditLog).subscribe((res) => {
        console.log('new audit log entry');
        console.log(res);
        this.successSubmit = true;
      });
    }
  }
}
