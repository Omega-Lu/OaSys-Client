import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Supplier } from 'src/app/models/supplier.model';
import { SupplierService } from 'src/app/_services/supplier.service';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/_services/product.service';
import { ProductType } from 'src/app/models/Product-Type.model';
import { ProductCategoryService } from 'src/app/_services/product-category.service';
import { ProductCategory } from 'src/app/models/Product-Category.model';
import { ProductTypeService } from 'src/app/_services/product-type.service';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/_services/order.service';
import { OrderStatusService } from 'src/app/_services/orderStatus.service';
import { OrderProduct } from 'src/app/models/orderProduct.model';
import { OrderProductService } from 'src/app/_services/orderProduct.service';
import { ValidationServicesComponent } from 'src/app/validation-services/validation-services.component';
import * as $ from 'jquery';

//audit log
import { AuditLog } from 'src/app/models/AuditLog.model';
import { AuditLogService } from 'src/app/_services/AuditLog.service';
import { CurrentUserService } from 'src/app/_services/CurrentUser.service';

@Component({
  selector: 'app-supplier-order',
  templateUrl: './supplier-order.component.html',
  styleUrls: ['./supplier-order.component.css'],
})
export class SupplierOrderComponent implements OnInit {
  @Input() supplier: Supplier;
  @Output() return = new EventEmitter<string>();

  //product
  product: Product;
  products: Product[] = [];
  productsTemp: Product[] = [];

  //product category
  productCategory: ProductCategory;
  productCategories: ProductCategory[] = [];

  //product type
  productType: ProductType;
  productTypes: ProductType[] = [];
  productTypesTemp: ProductType[] = [];

  //orders
  orders: Order[] = [];

  //validation
  successSubmit: boolean = false;
  categorySelected: boolean = false;
  typeSelected: boolean = false;
  productSelected: boolean = false;
  activateQuantity: boolean = true;
  completeQuantity: boolean = true;
  completeSelection: boolean = true;
  ordered: boolean = false;
  validate: ValidationServicesComponent = new ValidationServicesComponent();

  //order
  order: Order = {
    orderID: 0,
    supplierID: 0,
    orderStatusID: 'Placed',
    datePlaced: '',
    dateReceived: '',
  };

  //order product
  orderProduct: OrderProduct = {
    orderProductID: 0,
    productID: 0,
    orderID: 0,
    quantityOrdered: 0,
    quantityReceived: 0,
  };

  //audit log
  auditLog: AuditLog = {
    auditLogID: 0,
    userID: 0,
    employeeID: 0,
    functionUsed: 'Create Supplier Order',
    date: new Date(),
    month: 'Oct',
  };

  constructor(
    private productService: ProductService,
    private productCategoryService: ProductCategoryService,
    private productTypeService: ProductTypeService,
    private supplierService: SupplierService,
    private orderService: OrderService,
    private orderStatusService: OrderStatusService,
    private orderProductService: OrderProductService,
    private CurrentUserService: CurrentUserService,
    private AuditLogService: AuditLogService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllOrders();

    this.CurrentUserService.getAllCurrentUsers().subscribe((res) => {
      this.auditLog.userID = res[res.length - 1].userID;
      this.auditLog.employeeID = res[res.length - 1].employeeID;
    });
  }

  /////////////////// get functions ////////////////////////////////////////

  getAllProducts() {
    this.productService.getAllProducts().subscribe((response) => {
      response = response.filter((product) => {
        return product.deleted == false;
      });
      this.products = response;
      console.log('All the products');
      console.log(this.productsTemp);
      this.getAllProductCategories();
    });
  }

  getAllProductCategories() {
    this.productCategoryService
      .getAllProductCategories()
      .subscribe((response) => {
        response = response.filter((category) => {
          return category.deleted == false;
        });
        this.productCategories = response;
        console.log('All the Product Categories');
        console.log(this.productCategories);
        this.getAllProductTypes();
      });
  }

  getAllProductTypes() {
    this.productTypeService.getAllProductTypes().subscribe((response) => {
      response = response.filter((type) => {
        return type.deleted == false;
      });
      this.productTypes = response;
      console.log('All the Product Types');
      console.log(this.productTypes);
    });
  }

  getAllOrders() {
    this.orderService.getAllOrders().subscribe((response) => {
      this.orders = response;
      console.log(this.orders);
    });
  }

  back() {
    this.return.emit('false');
    console.log('back to create');
  }

  ////////////// select category ////////////////////////////////////////////

  async categorySelect(id: number) {
    this.typeSelected = false;
    $('#typeID').val('-1');
    this.activateQuantity = true;
    $('#nameID').val('-1');
    $('#quantityID').val('');

    this.productTypesTemp = this.productTypes.filter((productType) => {
      return productType.producT_CATEGORY_ID == id;
    });
    console.log('the selected product types from the category are');
    console.log(this.productTypesTemp);
    this.categorySelected = true;
    this.inOrderAlready = false;
  }

  ///////////////// select type /////////////////////////////////////////////

  async typeSelect(id: number) {
    $('#nameID').val('-1');
    this.activateQuantity = true;
    $('#quantityID').val('');

    this.productsTemp = this.products.filter((product) => {
      return product.producT_TYPE_ID == id;
    });
    console.log('the selected products from the product types are');
    console.log(this.productsTemp);
    this.typeSelected = true;
    this.inOrderAlready = false;
  }

  /////////////// select name ////////////////////////////////////////////

  nameSelect() {
    $('#quantityID').val('');
    this.quantity = 0;
    this.completeSelection = true;
    this.inOrderAlready = false;
  }

  /////////////// validation functions ////////////////////////////////

  ValidateQuantity() {
    if (this.quantity < 1) {
      this.completeQuantity = false;
    } else {
      this.completeQuantity = this.validate.ValidateInteger(this.quantity);
    }
  }

  ////////////// add product to dynamic array /////////////////////////////

  dynamicArray = [];
  newDynamic;

  quantity: number;
  pID: number;

  inOrderAlready: boolean = false;

  addProduct() {
    if (this.activateQuantity == true) {
      this.completeSelection = false;
    } else if (this.quantity < 1 || this.quantity == null) {
      this.completeQuantity = false;
    } else {
      //if product is in order already
      let temp = this.dynamicArray.filter((dynamic) => {
        return dynamic.productIDnumber == this.pID;
      });

      const categoryText = $('#categoryID option:selected').text();
      const typeText = $('#typeID option:selected').text();
      const nameText = $('#nameID option:selected').text();

      console.log('dynaminc for pid');
      console.log(temp);

      if (temp.length > 0) {
        this.inOrderAlready = true;
      } else {
        //if not in order already
        this.inOrderAlready = false;

        console.log(categoryText);
        console.log(typeText);
        console.log(nameText);
        console.log(this.quantity);

        this.dynamicArray.push({
          category: categoryText,
          type: typeText,
          name: nameText,
          quantity: this.quantity,
          productIDnumber: this.pID,
        });
        this.ordered = true;
      }
    }
  }

  ////////////// remove from dynamic array /////////////////////////////////

  deleteRow(index) {
    this.dynamicArray.splice(index, 1);
    if (this.dynamicArray.length < 1) this.ordered = false;
  }

  ///////////// create the supplier order /////////////////////////////////

  onSubmit() {
    this.order.supplierID = this.supplier.supplieR_ID;
    this.order.datePlaced = new Date().toString();

    //add the new order

    this.orderService.addOrder(this.order).subscribe((response) => {
      console.log('this is the new order');
      console.log(response);
      this.orderProduct.orderID = response.orderID;

      // add the order products
      for (let i = 0; i < this.dynamicArray.length; i++) {
        const element = this.dynamicArray[i];

        this.orderProduct.productID = element.productIDnumber;

        this.orderProduct.quantityOrdered = element.quantity;

        this.orderProductService
          .addOrderProduct(this.orderProduct)
          .subscribe((response) => {
            console.log('this is a product order');
            console.log(response);
            this.successSubmit = true;
          });
      }
    });
    //add to audit log
    this.AuditLogService.addAuditLog(this.auditLog).subscribe((res) => {
      console.log('new audit log entry');
      console.log(res);
      this.successSubmit = true;
    });
  }
}
