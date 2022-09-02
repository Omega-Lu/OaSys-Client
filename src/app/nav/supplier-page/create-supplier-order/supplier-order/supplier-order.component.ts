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
import { OrderStatus } from 'src/app/models/orderStatus.model';
import { OrderStatusService } from 'src/app/_services/orderStatus.service';
import { OrderProduct } from 'src/app/models/orderProduct.model';
import { OrderProductService } from 'src/app/_services/orderProduct.service';
import { ValidationServicesComponent } from 'src/app/validation-services/validation-services.component';
import * as $ from 'jquery';

@Component({
  selector: 'app-supplier-order',
  templateUrl: './supplier-order.component.html',
  styleUrls: ['./supplier-order.component.css'],
})
export class SupplierOrderComponent implements OnInit {
  @Input() supplier: Supplier;
  @Output() return = new EventEmitter<string>();

  productCategory: ProductCategory;
  productCategories: ProductCategory[] = [];

  productType: ProductType;
  productTypes: ProductType[] = [];
  productTypesTemp: ProductType[] = [];

  product: Product;
  products: Product[] = [];
  productsTemp: Product[] = [];

  orders: Order[] = [];

  successSubmit: boolean = false;
  categorySelected: boolean = false;
  typeSelected: boolean = false;
  productSelected: boolean = false;
  activateQuantity: boolean = true;
  completeQuantity: boolean = true;
  completeSelection: boolean = true;

  something: number;
  ordered: boolean = false;

  order: Order = {
    orderID: 0,
    supplierID: 0,
    orderStatusID: 0,
    datePlaced: '',
    dateReceived: '',
  };

  orderStatus: OrderStatus = {
    orderStatusID: 0,
    orderID: 0,
    description: 'Placed',
  };

  orderProduct: OrderProduct = {
    orderProductID: 0,
    productID: 0,
    orderID: 0,
    quantity: 0,
  };

  //use validation
  validate: ValidationServicesComponent = new ValidationServicesComponent();

  constructor(
    private productService: ProductService,
    private productCategoryService: ProductCategoryService,
    private productTypeService: ProductTypeService,
    private supplierService: SupplierService,
    private orderService: OrderService,
    private orderStatusService: OrderStatusService,
    private orderProductService: OrderProductService
  ) {}

  ngOnInit(): void {
    this.getAllProductCategories();
    this.getAllProductTypes();
    this.getAllProducts();
    this.getAllOrders();
    this.sleep(100);
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

  getAllProducts() {
    this.productService.getAllProducts().subscribe((response) => {
      this.products = response;
      console.log(this.productsTemp);
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

  async categorySelect(id: number) {
    this.typeSelected = false;
    $('#typeID').val('-1');
    this.activateQuantity = true;
    $('#nameID').val('-1');
    $('#quantityID').val('');

    this.productTypesTemp = this.productTypes;
    console.log(this.productTypes);
    this.productTypesTemp = this.productTypesTemp.filter((productType) => {
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
    $('#quantityID').val('');
    this.completeSelection = true;
  }

  ValidateQuantity() {
    if (this.quantity < 1) {
      this.completeQuantity = false;
    } else {
      this.completeQuantity = this.validate.ValidateInteger(this.quantity);
    }
  }

  sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  dynamicArray = [];
  newDynamic;

  quantity: number;
  pID: number;

  addProduct() {
    if (this.activateQuantity == true) {
      this.completeSelection = false;
    } else if (this.quantity < 1 || this.quantity == null) {
      this.completeQuantity = false;
    } else {
      const categoryText = $('#categoryID option:selected').text();
      const typeText = $('#typeID option:selected').text();
      const nameText = $('#nameID option:selected').text();

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

  onSubmit() {
    this.order.supplierID = this.supplier.supplieR_ID;
    this.order.datePlaced = new Date().toString();

    //add the new order

    this.orderService.addOrder(this.order).subscribe((response) => {
      console.log('this is the new order');
      console.log(response);
      this.orderStatus.orderID = response.orderID;
      this.orderProduct.orderID = response.orderID;

      // add the order status
      this.orderStatusService
        .addOrderStatus(this.orderStatus)
        .subscribe((response) => {
          console.log('this is the new order status');
          console.log(response);
        });

      // add the order products
      for (let i = 0; i < this.dynamicArray.length; i++) {
        const element = this.dynamicArray[i];

        this.orderProduct.productID = element.productIDnumber;

        this.orderProduct.quantity = element.quantity;

        this.orderProductService
          .addOrderProduct(this.orderProduct)
          .subscribe((response) => {
            console.log('this is a product order');
            console.log(response);
            this.successSubmit = true;
          });
      }
    });
  }
}
