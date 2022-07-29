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
import { Supplier } from 'src/app/models/supplier.model';
import { OrderReturn } from 'src/app/models/orderReturn.model';
import { OrderReturnService } from 'src/app/_services/orderReturn.service';
import { SupplierOrderReturn } from 'src/app/models/supplierOrderReturn.model';
import { SupplierOrderReturnService } from 'src/app/_services/supplierOrderReturn.service';
import { ProductOrderReturn } from 'src/app/models/productOrderReturn.model';
import { ProductOrderReturnService } from 'src/app/_services/productOrderReturn.service';
import * as $ from 'jquery';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-return-order',
  templateUrl: './return-order.component.html',
  styleUrls: ['./return-order.component.css'],
})
export class ReturnOrderComponent implements OnInit {
  @Input() order: Order;
  @Input() supplier: Supplier;

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

  supplierOrderReturn: SupplierOrderReturn = {
    supplierOrderReturnID: 0,
    supplierID: 0,
    orderReturnID: 0,
  };

  orderReturn: OrderReturn = {
    orderReturnID: 0,
    orderID: 0,
    returnDate: '',
  };
  orderReturns: OrderReturn[] = [];

  productOrderReturn: ProductOrderReturn = {
    productOrderReturnID: 0,
    productID: 0,
    orderReturnID: 0,
    quantity: 0,
    reason: '',
  };

  dynamicArray = [];
  tempArray = [];
  returnReason: string;
  completeQuantity: boolean = true;
  zeroQuan: boolean = true;
  quanArray = [];
  reasonComplete: boolean = true;

  constructor(
    private orderProductService: OrderProductService,
    private orderStatusService: OrderStatusService,
    private productService: ProductService,
    private productCategoryService: ProductCategoryService,
    private productTypeService: ProductTypeService,
    private orderReturnService: OrderReturnService,
    private supplierOrderReturnService: SupplierOrderReturnService,
    private productOrderReturnService: ProductOrderReturnService
  ) {}

  async ngOnInit() {
    await this.sleep(150);
    this.getAllOrderProducts();
    this.getAllOrderStatusses();
    this.getAllProducts();
    this.getAllProductCategories();
    this.getAllProductTypes();
    this.getAllOrderReturns();

    console.log('Supplier detailssssssss');
    console.log(this.supplier);
    console.log(this.order);

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

      this.quanArray.push({
        quan: element.quantity,
      });

      this.dynamicArray.push({
        CategoryName: this.productCategoriesTemp[0].categorY_NAME,
        TypeName: this.productTypesTemp[0].typE_NAME,
        ProductName: this.productsTemp[0].producT_NAME,
        Quantity: element.quantity,
        productID: element.productID,
        orderID: element.orderID,
        retReason: '',
      });
    }
  }

  reasonNot(val: any, index: number) {
    let id = '#quantityID' + index.toString();
    if (val == 'not') {
      $(id).val('0');
    }
    for (let i = 0; i < this.dynamicArray.length; i++) {
      const element = this.dynamicArray[i];
      if (
        element.retReason == '-1' ||
        element.retReason == '' ||
        (element.retReason == 'not' && element.quantity > 0)
      ) {
        this.reasonComplete = false;
      } else {
        this.reasonComplete = true;
      }
    }
    if ((val == 'Expired' || val == 'Damaged') && $(id).val() < 1) {
      $(id).val('1');
    }
    for (let index = 0; index < this.quanArray.length; index++) {
      const element = this.quanArray[index];
      let id = '#categoryID' + index.toString();
      if ($(id).val() == null) {
        this.reasonComplete = false;
        break;
      } else {
        this.reasonComplete = true;
      }
    }
  }

  quantityVali(productQuantity: number, index: number, inputQuantity: number) {
    if (this.quanArray[index].quan < inputQuantity) {
      this.completeQuantity = false;
    } else {
      this.completeQuantity = true;
    }
    if (inputQuantity < 0) {
      this.zeroQuan = false;
    } else {
      this.zeroQuan = true;
    }
    let id = '#categoryID' + index.toString();
    let idsel = '#categoryID' + index.toString() + ' option:selected';

    if ($(id).val() == 'not' && inputQuantity > 0) {
      $(id).val('-1');
      //$(id).text('Reason');
    }
    if (inputQuantity == 0) {
      $(id).val('not');
    }
    console.log('nuwe een');
    console.log($(idsel).text());
    console.log($(id).val());
    // if ($(id).val() == null) {
    //   this.reasonComplete = false;
    // }
    for (let index = 0; index < this.quanArray.length; index++) {
      const element = this.quanArray[index];
      if ($(id).val() == null) {
        this.reasonComplete = false;
      }
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

  getAllOrderReturns() {
    this.orderReturnService.getAllOrderReturns().subscribe((response) => {
      this.orderReturns = response;
      console.log(this.orderReturns);
    });
  }

  sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  ReturnOrder() {
    if (this.completeQuantity == false) {
    } else if (this.zeroQuan == false) {
    } else {
      for (let index = 0; index < this.dynamicArray.length; index++) {
        const element = this.dynamicArray[index];
        console.log('hierdieeeeeeeeeeeeeee is die index van ' + index);
        console.log(element);
        if (
          element.retReason == '-1' ||
          element.retReason == '' ||
          element.retReason == null ||
          (element.retReason == 'not' && element.quantity > 0)
        ) {
          this.reasonComplete = false;
        }
      }

      if (this.reasonComplete == true) {
        //adding a orderReturn row to the table
        console.log(' befp   order returns');
        this.orderReturn.orderID = this.order.orderID;
        this.orderReturn.returnDate = new Date().toString();
        this.orderReturnService
          .addOrderReturn(this.orderReturn)
          .subscribe((response) => {
            console.log(response);
          });
        this.sleep(100);
        this.getAllOrderReturns();
        this.sleep(100);
        console.log('order returns');
        console.log(this.orderReturns);

        for (let index = 0; index < this.dynamicArray.length; index++) {
          const element = this.dynamicArray[index];
          if (element.Quantity > 0) {
            console.log('dynamic array');
            console.log(element);
            this.getAllProducts();
            this.sleep(52);

            this.productsTemp = this.products;

            this.productsTemp = this.productsTemp.filter((product) => {
              console.log(product.producT_ID == element.productID);
              return product.producT_ID == element.productID;
            });

            console.log('updates product');
            console.log('quannnnnn' + element.Quantity);
            this.product = this.productsTemp[0];
            this.product.quantitY_ON_HAND =
              this.product.quantitY_ON_HAND - element.Quantity;
            this.productService
              .updateProduct(this.product)
              .subscribe((response) => {
                console.log(response);
              });

            //adding a ProductOrderReturn row

            this.productOrderReturn.productID = element.productID;
            this.productOrderReturn.quantity = element.Quantity;
            this.productOrderReturn.reason = element.retReason;
            this.getAllOrderReturns();
            this.sleep(50);
            console.log('OrderReturn' + this.orderReturns.length);
            this.productOrderReturn.orderReturnID =
              this.orderReturns[this.orderReturns.length - 1].orderID + 1;
            this.productOrderReturnService
              .addProductOrderReturn(this.productOrderReturn)
              .subscribe((response) => {
                console.log(response);
              });
          }

          console.log('before order status filter');

          this.orderStatusses = this.orderStatusses.filter((orderStatus) => {
            console.log(orderStatus.orderID == this.order.orderID);
            return orderStatus.orderID == this.order.orderID;
          });

          console.log(this.orderStatusses[0]);
          console.log('before order status filter');

          this.orderStatus = this.orderStatusses[0];
          this.orderStatus.description = 'Returned';
          this.orderStatusService
            .updateOrderStatus(this.orderStatus)
            .subscribe((response) => {
              console.log(response);
            });

          //adding a supplierOrderReturn

          this.supplierOrderReturn.supplierID = this.supplier.supplieR_ID;
          this.supplierOrderReturn.orderReturnID =
            this.orderReturns[this.orderReturns.length - 1].orderReturnID + 1;
          this.supplierOrderReturnService
            .addSupplierOrderReturn(this.supplierOrderReturn)
            .subscribe((response) => {
              console.log(response);
            });
        }
      }
    }
  }
}
