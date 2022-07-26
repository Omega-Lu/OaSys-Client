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
  productTemp: ProductType[] = [];

  product: Product;
  products: Product[] = [];
  productsTemp: Product[] = [];

  orders: Order[] = [];

  successSubmit: boolean = false;
  categorySelected: boolean = false;
  typeSelected: boolean = false;
  productSelected: boolean = false;
  activateQuantity: boolean = true;

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

  getAllProducts() {
    this.productService.getAllProducts().subscribe((response) => {
      this.productsTemp = response;
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

  async typeSelect(id: number) {
    this.productService.getAllProducts().subscribe((response) => {
      this.productsTemp = response;
      console.log(this.products);
    });
    this.products = this.productsTemp.filter((product) => {
      console.log(product.producT_TYPE_ID == id);
      return product.producT_TYPE_ID == id;
    });
    console.log(this.products);
    this.typeSelected = true;
  }

  prevType(x: number) {
    if (x != -1) {
      this.typeSelect(x);
    }
  }

  prodnameClear() {
    console.log(this.pID);
    this.products = null;
    if (Number($('#typeID').val()) != -1) {
      console.log('dit werk');
      this.typeSelect(Number($('#typeID').val()));
    }
  }

  dynamicArray = [];
  newDynamic;

  quantity: number;
  pID: number;

  addProduct() {
    const categoryText = $('#categoryID option:selected').text();
    const typeText = $('#typeID option:selected').text();
    const nameText = $('#nameID option:selected').text();
    // const clone = node.cloneNode(true);
    // document.getElementById('bodyElement').append(clone);
    // $('#productElement').clone(true, true).appendTo('#bodyElement');
    console.log(categoryText);
    console.log(typeText);
    console.log(nameText);
    console.log(this.quantity);
    this.ordered = true;

    this.dynamicArray.push({
      category: categoryText,
      type: typeText,
      name: nameText,
      quantity: this.quantity,
      productIDnumber: this.pID,
    });
  }

  onSubmit() {
    this.order.supplierID = this.supplier.supplieR_ID;
    this.order.datePlaced = new Date().toString();
    console.log(this.order.datePlaced);

    this.orderService.addOrder(this.order).subscribe((response) => {
      console.log(response);
    });

    this.getAllOrders();

    this.orderStatus.orderID = this.orders[this.orders.length - 1].orderID + 1;
    this.orderProduct.orderID = this.orders[this.orders.length - 1].orderID + 1;

    this.orderStatusService
      .addOrderStatus(this.orderStatus)
      .subscribe((response) => {
        console.log(response);
      });

    for (let i = 0; i < this.dynamicArray.length; i++) {
      const element = this.dynamicArray[i];

      this.orderProduct.productID = element.productIDnumber;

      this.orderProduct.quantity = element.quantity;

      this.orderProductService
        .addOrderProduct(this.orderProduct)
        .subscribe((response) => {
          console.log(response);
        });
    }
  }
}
