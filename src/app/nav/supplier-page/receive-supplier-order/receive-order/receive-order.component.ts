import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/_services/order.service';
import { OrderProduct } from 'src/app/models/orderProduct.model';
import { OrderProductService } from 'src/app/_services/orderProduct.service';

import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/_services/product.service';
import { ProductCategory } from 'src/app/models/Product-Category.model';
import { ProductCategoryService } from 'src/app/_services/product-category.service';
import { ProductType } from 'src/app/models/Product-Type.model';
import { ProductTypeService } from 'src/app/_services/product-type.service';

import { ValidationServicesComponent } from 'src/app/validation-services/validation-services.component';

@Component({
  selector: 'app-receive-order',
  templateUrl: './receive-order.component.html',
  styleUrls: ['./receive-order.component.css'],
})
export class ReceiveOrderComponent implements OnInit {
  @Input() order: Order;
  @Output() return = new EventEmitter<string>();

  //order product
  orderProduct: OrderProduct;
  orderProducts: OrderProduct[] = [];
  orderProductsTemp: OrderProduct[] = [];

  //product
  product: Product;
  products: Product[] = [];
  productsTemp: Product[] = [];

  //product categories
  productCategory: ProductCategory;
  productCategories: ProductCategory[] = [];
  productCategoriesTemp: ProductCategory[] = [];

  //product types
  productType: ProductType;
  productTypes: ProductType[] = [];
  productTypesTemp: ProductType[] = [];

  //validation
  validate: ValidationServicesComponent = new ValidationServicesComponent();
  quantity: number[] = [];
  validQuantity: boolean = true;

  successSubmit: boolean = false;

  dynamicArray = [];
  tempArray = [];

  constructor(
    private orderProductService: OrderProductService,
    private orderService: OrderService,
    private productService: ProductService,
    private productCategoryService: ProductCategoryService,
    private productTypeService: ProductTypeService
  ) {}

  async ngOnInit() {
    this.getAllOrderProducts();
  }

  displayToTable() {
    this.orderProducts = this.orderProducts.filter((orderProduct) => {
      return orderProduct.orderID == this.order.orderID;
    });

    for (let i = 0; i < this.orderProducts.length; i++) {
      const element = this.orderProducts[i];

      this.productsTemp = this.products;
      this.productTypesTemp = this.productTypes;
      this.productCategoriesTemp = this.productCategories;

      this.productsTemp = this.productsTemp.filter((product) => {
        return product.producT_ID == element.productID;
      });

      this.productCategoriesTemp = this.productCategoriesTemp.filter(
        (productCategory) => {
          return (
            productCategory.producT_CATEGORY_ID ==
            this.productsTemp[0].producT_CATEGORY_ID
          );
        }
      );

      this.productTypesTemp = this.productTypesTemp.filter((productType) => {
        return (
          productType.producT_TYPE_ID == this.productsTemp[0].producT_TYPE_ID
        );
      });

      this.quantity[i] = element.quantityOrdered;

      this.dynamicArray.push({
        CategoryName: this.productCategoriesTemp[0].categorY_NAME,
        TypeName: this.productTypesTemp[0].typE_NAME,
        ProductName: this.productsTemp[0].producT_NAME,
        Quantity: element.quantityOrdered,
        productID: element.productID,
        orderID: element.orderID,
      });
    }
    console.log(this.quantity);
  }

  Return() {
    this.return.emit('false');
  }

  getAllOrderProducts() {
    this.orderProductService.getAllOrderProducts().subscribe((response) => {
      this.orderProducts = response;
      console.log('this is all the order products');
      console.log(this.orderProducts);
      this.getAllProducts();
    });
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe((response) => {
      this.products = response;
      console.log('this is all the products');
      console.log(this.products);
      this.getAllProductTypes();
    });
  }

  getAllProductTypes() {
    this.productTypeService.getAllProductTypes().subscribe((response) => {
      this.productTypes = response;
      console.log('this is all the product types');
      console.log(this.productTypes);
      this.getAllProductCategories();
    });
  }

  getAllProductCategories() {
    this.productCategoryService
      .getAllProductCategories()
      .subscribe((response) => {
        this.productCategories = response;
        console.log('this is all the product categoories');
        console.log(this.productCategories);
        this.displayToTable();
      });
  }

  sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  quantityVali(quan: number) {
    this.validQuantity = this.validate.ValidateInteger(quan);
  }

  ReceiveOrder() {
    for (let i = 0; i < this.dynamicArray.length; i++) {
      const element = this.dynamicArray[i];

      //add quantity received

      const quantityReceived = this.quantity[i];

      this.orderProducts[i].quantityReceived = quantityReceived;
      this.orderProductService
        .updateOrderProduct(this.orderProducts[i])
        .subscribe((res) => {
          console.log('Updated Order Product');
          console.log(res);
        });

      //get Products

      this.productService.getAllProducts().subscribe((response) => {
        this.productsTemp = response.filter((product) => {
          return product.producT_ID == element.productID;
        });

        //update product quantity

        this.product = this.productsTemp[0];
        this.product.quantitY_ON_HAND =
          this.product.quantitY_ON_HAND + quantityReceived;
        this.productService
          .updateProduct(this.product)
          .subscribe((response) => {
            console.log('the new updated product');
            console.log(response);
          });
      });
    }
    this.order.orderStatusID = 'Received';
    this.order.dateReceived = new Date().toString();
    this.orderService.updateOrder(this.order).subscribe((res) => {
      console.log('Updated Order');
      console.log(res);
      this.successSubmit = true;
    });
  }
}
