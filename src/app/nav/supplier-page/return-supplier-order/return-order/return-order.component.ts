import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  ViewChild,
} from '@angular/core';
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
import { Supplier } from 'src/app/models/supplier.model';
import { OrderReturn } from 'src/app/models/orderReturn.model';
import { OrderReturnService } from 'src/app/_services/orderReturn.service';
import { SupplierOrderReturn } from 'src/app/models/supplierOrderReturn.model';
import { SupplierOrderReturnService } from 'src/app/_services/supplierOrderReturn.service';
import { ProductOrderReturn } from 'src/app/models/productOrderReturn.model';
import { ProductOrderReturnService } from 'src/app/_services/productOrderReturn.service';
import * as $ from 'jquery';

//audit log
import { AuditLog } from 'src/app/models/AuditLog.model';
import { AuditLogService } from 'src/app/_services/AuditLog.service';
import { CurrentUserService } from 'src/app/_services/CurrentUser.service';

import { ValidationServicesComponent } from 'src/app/validation-services/validation-services.component';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-return-order',
  templateUrl: './return-order.component.html',
  styleUrls: ['./return-order.component.css'],
})
export class ReturnOrderComponent implements OnInit {
  @Input() order: Order;
  @Input() supplier: Supplier;

  @Output() return = new EventEmitter<string>();

  //order products
  orderProduct: OrderProduct;
  orderProducts: OrderProduct[] = [];

  //product
  product: Product;
  products: Product[] = [];
  productsTemp: Product[] = [];

  //product type
  productType: ProductType;
  productTypes: ProductType[] = [];
  productTypesTemp: ProductType[] = [];

  //product category
  productCategory: ProductCategory;
  productCategories: ProductCategory[] = [];
  productCategoriesTemp: ProductCategory[] = [];

  //supplier order return
  supplierOrderReturn: SupplierOrderReturn = {
    supplierOrderReturnID: 0,
    supplierID: 0,
    orderReturnID: 0,
  };

  //order return
  orderReturn: OrderReturn = {
    orderReturnID: 0,
    orderID: 0,
    returnDate: '',
  };
  orderReturns: OrderReturn[] = [];

  //product order Return
  productOrderReturn: ProductOrderReturn = {
    productOrderReturnID: 0,
    productID: 0,
    orderReturnID: 0,
    quantity: 0,
    reason: '-1',
  };

  //dynamic array
  dynamicArray = [];
  tempArray = [];

  //validation
  returnReason: string;
  completeQuantity: boolean = true;
  zeroQuan: boolean = true;
  validate: ValidationServicesComponent = new ValidationServicesComponent();
  validQuantity: boolean = true;
  validReasonWithQuantity: boolean = true;
  validQuantityWithReason: boolean = true;

  reasonComplete: boolean = true;
  successSubmit: boolean = false;

  //quantity
  quanArray = [];

  //audit log
  auditLog: AuditLog = {
    auditLogID: 0,
    userID: 0,
    employeeID: 0,
    functionUsed: 'Return Supplier Order',
    date: new Date(),
    month: 'Oct',
  };

  //help pdf
  pdfPath = 'https://localhost:7113/Resources/pdfs/Return supplier order.pdf';
  displayPDF: boolean = false;

  constructor(
    private orderProductService: OrderProductService,
    private productService: ProductService,
    private productCategoryService: ProductCategoryService,
    private productTypeService: ProductTypeService,
    private orderReturnService: OrderReturnService,
    private supplierOrderReturnService: SupplierOrderReturnService,
    private productOrderReturnService: ProductOrderReturnService,
    private orderService: OrderService,
    private CurrentUserService: CurrentUserService,
    private AuditLogService: AuditLogService
  ) {}

  async ngOnInit() {
    this.getAllOrderProducts();

    this.CurrentUserService.getAllCurrentUsers().subscribe((res) => {
      this.auditLog.userID = res[res.length - 1].userID;
      this.auditLog.employeeID = res[res.length - 1].employeeID;
    });
  }

  ////////////// pdf functions ///////////////////////////////
  @ViewChild(PdfViewerComponent) private pdfComponent: PdfViewerComponent;
  search(stringToSearch: string) {
    this.pdfComponent.eventBus.dispatch('find', {
      query: stringToSearch,
      type: 'again',
      caseSensitive: false,
      findPrevious: undefined,
      highlightAll: true,
      phraseSearch: true,
    });
  }

  //////////////////////////////////get functions////////////////////////////

  getAllOrderProducts() {
    this.orderProductService.getAllOrderProducts().subscribe((res) => {
      this.orderProducts = res;
      this.getAllProducts();
    });
  }

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
      this.productTypes = response;
      this.getAllProductCategories();
    });
  }

  getAllProductCategories() {
    this.productCategoryService
      .getAllProductCategories()
      .subscribe((response) => {
        this.productCategories = response;
        this.getAllOrderReturns();
      });
  }

  getAllOrderReturns() {
    this.orderReturnService.getAllOrderReturns().subscribe((response) => {
      this.orderReturns = response;
      this.displayTable();
    });
  }

  //////////////////////create the dynamic array ///////////////////////////

  displayTable() {
    this.orderProducts = this.orderProducts.filter((orderProduct) => {
      return orderProduct.orderID == this.order.orderID;
    });

    for (let i = 0; i < this.orderProducts.length; i++) {
      const element = this.orderProducts[i];

      this.productsTemp = this.products.filter((product) => {
        return product.producT_ID == element.productID;
      });

      this.productCategoriesTemp = this.productCategories.filter(
        (productCategory) => {
          return (
            productCategory.producT_CATEGORY_ID ==
            this.productsTemp[0].producT_CATEGORY_ID
          );
        }
      );

      this.productTypesTemp = this.productTypes.filter((productType) => {
        return (
          productType.producT_TYPE_ID == this.productsTemp[0].producT_TYPE_ID
        );
      });

      this.dynamicArray.push({
        CategoryName: this.productCategoriesTemp[0].categorY_NAME,
        TypeName: this.productTypesTemp[0].typE_NAME,
        ProductName: this.productsTemp[0].producT_NAME,
        Quantity: element.quantityReceived,
        quanReturned: 0,
        productID: element.productID,
        orderID: element.orderID,
        retReason: '-1',
      });
    }
    console.log('dynamicArray');
    console.log(this.dynamicArray);
  }

  //////////////////////validation///////////////////////////////////

  FormValidate() {
    this.validateQuantity();
    this.validateReason();
    this.valdiateReturn();
  }

  validateReason() {
    this.validReasonWithQuantity = true;
    for (let i = 0; i < this.dynamicArray.length; i++) {
      const element = this.dynamicArray[i];

      if (element.retReason != '-1') {
        if (element.quanReturned < 1) {
          this.validReasonWithQuantity = false;
        }
      }
    }
    this.valdiateReturn();
  }

  validateQuantity() {
    this.validQuantityWithReason = true;
    for (let i = 0; i < this.dynamicArray.length; i++) {
      const element = this.dynamicArray[i];

      this.validQuantity = this.validate.ValidateInteger(element.quanReturned);
      if (!this.validQuantity) break;
    }

    for (let i = 0; i < this.dynamicArray.length; i++) {
      const element = this.dynamicArray[i];

      if (element.quanReturned > 0) {
        if (element.retReason == '-1') this.validQuantityWithReason = false;
      }
    }
    this.validateReason();
    this.valdiateReturn();
  }

  validReturn: boolean = true;
  valdiateReturn() {
    let temp = this.dynamicArray.filter((dynamic) => {
      return dynamic.quanReturned > 0;
    });

    if (temp.length > 0) {
      this.validReturn = true;
    } else {
      let reason = this.dynamicArray.filter((dynamic) => {
        return dynamic.retReason != '-1';
      });
      if (reason.length > 0) {
        this.validReturn = true;
      } else {
        this.validReturn = false;
      }
    }
  }

  Return() {
    this.return.emit('false');
  }

  ////////////////// return the supplier order ///////////////////////////////

  ReturnOrder() {
    //change order status
    this.order.orderStatusID = 'Returned';
    this.orderService.updateOrder(this.order).subscribe((res) => {
      console.log('Updated order status');
      console.log(res);
    });

    //add to order return

    this.orderReturn.returnDate = new Date().toString();
    this.orderReturn.orderID = this.order.orderID;
    this.orderReturnService
      .addOrderReturn(this.orderReturn)
      .subscribe((res) => {
        for (let i = 0; i < this.dynamicArray.length; i++) {
          const element = this.dynamicArray[i];

          if (element.quanReturned > 0) {
            //add order return ID to product order return

            this.productOrderReturn.productID = element.productID;
            this.productOrderReturn.orderReturnID = res.orderReturnID;
            this.productOrderReturn.quantity = element.quanReturned;
            this.productOrderReturn.reason = element.retReason;
            this.productOrderReturnService
              .addProductOrderReturn(this.productOrderReturn)
              .subscribe((response) => {
                console.log('new ProductOrderReturn');
                console.log(response);
              });

            //decrease product quantity

            this.productsTemp = this.products.filter((product) => {
              return product.producT_ID == element.productID;
            });
            this.productsTemp[0].quantitY_ON_HAND =
              this.productsTemp[0].quantitY_ON_HAND - element.quanReturned;
            this.productService
              .updateProduct(this.productsTemp[0])
              .subscribe((response) => {
                console.log('updated product');
                console.log(response);
                this.successSubmit = true;
              });
          }
        }

        //add supplier order return

        this.supplierOrderReturn.supplierID = this.supplier.supplieR_ID;
        this.supplierOrderReturn.orderReturnID = res.orderReturnID;
        this.supplierOrderReturnService
          .addSupplierOrderReturn(this.supplierOrderReturn)
          .subscribe((response) => {
            console.log('new supplier order return');
            console.log(response);

            //add to audit log
            this.AuditLogService.addAuditLog(this.auditLog).subscribe((res) => {
              console.log('new audit log entry');
              console.log(res);
            });
          });
      });
  }
}
