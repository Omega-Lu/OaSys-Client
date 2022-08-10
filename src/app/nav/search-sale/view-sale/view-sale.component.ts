import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Sale } from 'src/app/models/Sale.model';
import { SaleService } from 'src/app/_services/Sale.service';
import { SaleReturn } from 'src/app/models/SaleReturn.model';
import { SaleReturnService } from 'src/app/_services/SaleReturn.service';
import { SaleProduct } from 'src/app/models/SaleProduct.model';
import { SaleProductService } from 'src/app/_services/SaleProduct.service';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/_services/product.service';
import { Payment } from 'src/app/models/Payment.model';
import { Return } from 'src/app/models/Return.model';
import { ReturnService } from 'src/app/_services/Return.service';

@Component({
  selector: 'app-view-sale',
  templateUrl: './view-sale.component.html',
  styleUrls: ['./view-sale.component.css'],
})
export class ViewSaleComponent implements OnInit {
  @Input() sale: Sale;
  @Input() payment: Payment;

  @Output() back = new EventEmitter<string>();

  return: Return = {
    returnID: 0,
    reason: '',
    date: '',
  };
  returns: Return[] = [];
  returnsTemp: Return[] = [];

  saleReturn: SaleReturn = {
    saleReturnID: 0,
    returnID: 0,
    saleID: 0,
  };
  saleReturns: SaleReturn[] = [];
  saleReturnsTemp: SaleReturn[] = [];

  saleProduct: SaleProduct;
  saleProducts: SaleProduct[] = [];
  saleProductsTemp: SaleProduct[] = [];

  product: Product;
  products: Product[] = [];
  productsTemp: Product[] = [];

  dynamicArray = [];
  tempArray = [];

  successSubmit: boolean = false;

  constructor(
    private saleReturnService: SaleReturnService,
    private saleProductService: SaleProductService,
    private returnService: ReturnService,
    private productService: ProductService
  ) {}

  async ngOnInit() {
    console.log('this selected sale  ');
    console.log(this.sale);
    console.log('this selected Payment  ');
    console.log(this.payment);

    this.getAllReturns();
    this.getAllSaleProducts();
    this.getAllSaleReturns();
    this.getAllProducts();
    await this.sleep(250);

    this.saleProductsTemp = this.saleProducts;

    this.saleProductsTemp = this.saleProductsTemp.filter((saleProduct) => {
      console.log(saleProduct.saleID == this.sale.saleID);
      return saleProduct.saleID == this.sale.saleID;
    });

    for (let i = 0; i < this.saleProductsTemp.length; i++) {
      const element = this.saleProductsTemp[i];

      //get product name
      this.productsTemp = this.products;
      this.productsTemp = this.productsTemp.filter((product) => {
        console.log(product.producT_ID == element.productID);
        return product.producT_ID == element.productID;
      });
      let name = this.productsTemp[0].producT_NAME;

      //get quantity
      let quantity = element.quantity;

      //get price
      let price = this.productsTemp[0].cosT_PRICE;

      //get total price
      let totalPrice = price * quantity;

      //push to dynamic array
      this.dynamicArray.push({
        name: name,
        quantity: quantity,
        price: price,
        total: totalPrice,
      });
    }
  }

  getAllReturns() {
    this.returnService.getAllReturns().subscribe((response) => {
      this.returns = response;
      console.log('all Returns  ');
      console.log(this.returns);
    });
  }

  getAllSaleReturns() {
    this.saleReturnService.getAllSaleReturns().subscribe((response) => {
      this.saleReturns = response;
      console.log('all sale returns  ');
      console.log(this.saleReturns);
    });
  }

  getAllSaleProducts() {
    this.saleProductService.getAllSaleProducts().subscribe((response) => {
      this.saleProducts = response;

      console.log('all sale products  ');
      console.log(this.saleProducts);
    });
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe((response) => {
      this.products = response;
      console.log('all products');
      console.log(this.products);
    });
  }

  Return() {
    this.back.emit('false');
  }

  sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  ReturnSale() {
    console.log('return sale');

    // new return

    this.return.reason = 'Expired';
    this.return.date = new Date().toString();

    this.returnService.addReturn(this.return).subscribe((response) => {
      console.log("new return");
      console.log(response);
    });

    // new sale return
    this.sleep(150);
    this.getAllReturns();
    this.sleep(150);

    this.saleReturn.returnID =
      this.returns[this.returns.length - 1].returnID + 1;
    this.saleReturn.saleID = this.sale.saleID;

    this.saleReturnService
      .addSaleReturn(this.saleReturn)
      .subscribe((response) => {
        console.log('new sale return');
        console.log(response);
      });
  }
}
