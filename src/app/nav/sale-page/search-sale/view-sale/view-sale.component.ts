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
import { CurrentUser } from 'src/app/models/CurrentUser.model';
import { CurrentUserService } from 'src/app/_services/CurrentUser.service';
import { AuditLogService } from 'src/app/_services/AuditLog.service';
import { AuditLog } from 'src/app/models/AuditLog.model';

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

  currentUser: CurrentUser;
  currentUsers: CurrentUser[] = [];
  currentUsersTemp: CurrentUser[] = [];

  audit: AuditLog = {
    auditLogID: 0,
    userID: 0,
    employeeID:0,
    functionUsed: 'Return Sale',
    date: new Date().toString(),
    month: '',
  };
  audits: AuditLog[] = [];
  auditsTemp: AuditLog[] = [];

  dynamicArray = [];
  tempArray = [];

  monthInt: number = new Date().getMonth();
  month: string;

  successSubmit: boolean = false;

  constructor(
    private saleReturnService: SaleReturnService,
    private saleProductService: SaleProductService,
    private returnService: ReturnService,
    private productService: ProductService,
    private auditLogService: AuditLogService,
    private currentUserService: CurrentUserService
  ) {}

  async ngOnInit() {
    if (this.monthInt == 0) {
      this.month = 'Jan';
    } else if (this.monthInt == 1) {
      this.month = 'Feb';
    } else if (this.monthInt == 2) {
      this.month = 'Mar';
    } else if (this.monthInt == 3) {
      this.month = 'Apr';
    } else if (this.monthInt == 4) {
      this.month = 'May';
    } else if (this.monthInt == 5) {
      this.month = 'Jun';
    } else if (this.monthInt == 6) {
      this.month = 'Jul';
    } else if (this.monthInt == 7) {
      this.month = 'Aug';
    } else if (this.monthInt == 8) {
      this.month = 'Sep';
    } else if (this.monthInt == 9) {
      this.month = 'Oct';
    } else if (this.monthInt == 10) {
      this.month = 'Nov';
    } else if (this.monthInt == 11) {
      this.month = 'Dec';
    }
    this.audit.month = this.month;

    console.log('this selected sale  ');
    console.log(this.sale);
    console.log('this selected Payment  ');
    console.log(this.payment);

    await this.getAllReturns();
    await this.getAllSaleProducts();
    await this.getAllSaleReturns();
    await this.getAllProducts();
    await this.getAllCurrentUsers();
    await this.sleep(250);

    //set the current user
    this.audit.userID = this.currentUsers[this.currentUsers.length - 1].userID;

    //start dynamic array
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

  async getAllCurrentUsers() {
    this.currentUserService.getAllCurrentUsers().subscribe((response) => {
      this.currentUsers = response;
      console.log('All current Users');
      console.log(this.currentUsers);
    });
  }

  async getAllReturns() {
    this.returnService.getAllReturns().subscribe((response) => {
      this.returns = response;
      console.log('all Returns  ');
      console.log(this.returns);
    });
  }

  async getAllSaleReturns() {
    this.saleReturnService.getAllSaleReturns().subscribe((response) => {
      this.saleReturns = response;
      console.log('all sale returns  ');
      console.log(this.saleReturns);
    });
  }

  async getAllSaleProducts() {
    this.saleProductService.getAllSaleProducts().subscribe((response) => {
      this.saleProducts = response;

      console.log('all sale products  ');
      console.log(this.saleProducts);
    });
  }

  async getAllProducts() {
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
      console.log('new return');
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

    //adding to audit log
    this.auditLogService.addAuditLog(this.audit).subscribe((response) => {
      console.log('entry into audit log');
      console.log(response);
    });
  }
}
