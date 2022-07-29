import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { OrderService } from 'src/app/_services/order.service';
import { OrderProduct } from 'src/app/models/orderProduct.model';
import { OrderProductService } from 'src/app/_services/orderProduct.service';
import { OrderStatus } from 'src/app/models/orderStatus.model';
import { OrderStatusService } from 'src/app/_services/orderStatus.service';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/_services/product.service';
import { ProductCategory } from 'src/app/models/Product-Category.model';
import { ProductCategoryService } from 'src/app/_services/product-category.service';
import { ProductType } from 'src/app/models/Product-Type.model';
import { ProductTypeService } from 'src/app/_services/product-type.service';

@Component({
  selector: 'app-receive-order',
  templateUrl: './receive-order.component.html',
  styleUrls: ['./receive-order.component.css'],
})
export class ReceiveOrderComponent implements OnInit {
  @Input() order: Order;
  @Output() return = new EventEmitter<string>();

  orderProduct: OrderProduct;
  orderProducts: OrderProduct[] = [];

  orderStatus: OrderStatus;
  orderStatusses: OrderStatus[] = [];

  product: Product;
  products: Product[] = [];
  productsTemp: Product[] = [];

  productType: ProductType;
  productTypes: ProductType[] = [];
  productTypesTemp: ProductType[] = [];

  productCategory: ProductCategory;
  productCategories: ProductCategory[] = [];
  productCategoriesTemp: ProductCategory[] = [];

  quantity: number;

  completeQuantity: boolean = true;

  dynamicArray = [];
  tempArray = [];

  constructor(
    private orderProductService: OrderProductService,
    private orderStatusService: OrderStatusService,
    private productService: ProductService,
    private productCategoryService: ProductCategoryService,
    private productTypeService: ProductTypeService
  ) {}

  async ngOnInit() {
    this.getAllOrderProducts();
    this.getAllOrderStatusses();
    this.getAllProducts();
    this.getAllProductCategories();
    this.getAllProductTypes();

    await this.sleep(150);

    this.orderProducts = this.orderProducts.filter((orderProduct) => {
      console.log(orderProduct.orderID == this.order.orderID);
      return orderProduct.orderID == this.order.orderID;
    });

    for (let i = 0; i < this.orderProducts.length; i++) {
      const element = this.orderProducts[i];

      this.productsTemp = this.products;
      this.productTypesTemp = this.productTypes;
      this.productCategoriesTemp = this.productCategories;

      this.productsTemp = this.productsTemp.filter((product) => {
        console.log(product.producT_ID == element.productID);
        return product.producT_ID == element.productID;
      });

      console.log('Product ' + i);
      console.log(this.productsTemp[0]);
      console.log('awe');

      this.productCategoriesTemp = this.productCategoriesTemp.filter(
        (productCategory) => {
          console.log(
            productCategory.producT_CATEGORY_ID ==
              this.productsTemp[0].producT_CATEGORY_ID
          );
          return (
            productCategory.producT_CATEGORY_ID ==
            this.productsTemp[0].producT_CATEGORY_ID
          );
        }
      );

      console.log('productCategoriesTemp ');
      console.log(this.productCategoriesTemp);
      console.log('awe');

      this.productTypesTemp = this.productTypesTemp.filter((productType) => {
        console.log(
          productType.producT_TYPE_ID == this.productsTemp[0].producT_TYPE_ID
        );
        return (
          productType.producT_TYPE_ID == this.productsTemp[0].producT_TYPE_ID
        );
      });

      console.log('productTypesTemp');
      console.log(this.productTypesTemp);
      console.log('awe');

      this.dynamicArray.push({
        CategoryName: this.productCategoriesTemp[0].categorY_NAME,
        TypeName: this.productTypesTemp[0].typE_NAME,
        ProductName: this.productsTemp[0].producT_NAME,
        Quantity: element.quantity,
        productID: element.productID,
        orderID: element.orderID,
      });
    }
  }

  Return() {
    this.return.emit('false');
  }

  getAllOrderProducts() {
    this.orderProductService.getAllOrderProducts().subscribe((response) => {
      this.orderProducts = response;
      console.log(this.orderProducts);
    });
  }

  getAllOrderStatusses() {
    this.orderStatusService.getAllOrderStatuss().subscribe((response) => {
      this.orderStatusses = response;
      console.log(this.orderStatusses);
    });
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

  sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  quantityVali(quan: number) {
    if (quan >= 0) {
      this.completeQuantity = true;
    } else {
      this.completeQuantity = false;
    }
  }

  ReceiveOrder() {
    if (this.completeQuantity == true) {
      for (let index = 0; index < this.dynamicArray.length; index++) {
        const element = this.dynamicArray[index];

        if (element.Quantity > 0) {
          this.getAllProducts();
          this.sleep(52);

          this.productsTemp = this.products;

          this.productsTemp = this.productsTemp.filter((product) => {
            console.log(product.producT_ID == element.productID);
            return product.producT_ID == element.productID;
          });

          console.log('updates product');
          this.product = this.productsTemp[0];
          this.product.quantitY_ON_HAND =
            this.product.quantitY_ON_HAND + element.Quantity;
          this.productService
            .updateProduct(this.product)
            .subscribe((response) => {
              console.log(response);
            });

          console.log('before order status filter');

          this.orderStatusses = this.orderStatusses.filter((orderStatus) => {
            console.log(orderStatus.orderID == this.order.orderID);
            return orderStatus.orderID == this.order.orderID;
          });

          console.log(this.orderStatusses[0]);
          console.log('before order status filter');

          this.orderStatus = this.orderStatusses[0];
          this.orderStatus.description = 'Received';
          this.orderStatusService
            .updateOrderStatus(this.orderStatus)
            .subscribe((response) => {
              console.log(response);
            });
        }
      }
    }
  }
}
