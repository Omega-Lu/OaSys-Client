import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/_services/product.service';
import { CustomerAccount } from 'src/app/models/Customer-account.model';
import { CustomerAccountService } from 'src/app/_services/customer-account.service';
import { Sale } from 'src/app/models/Sale.model';
import { SaleService } from 'src/app/_services/Sale.service';
import { SaleProduct } from 'src/app/models/SaleProduct.model';
import { SaleProductService } from 'src/app/_services/SaleProduct.service';
import { Payment } from 'src/app/models/Payment.model';
import { PaymentService } from 'src/app/_services/Payment.service';
import { PaymentType } from 'src/app/models/PaymentType.model';
import { PaymentTypeService } from 'src/app/_services/PaymentType.service';
import * as $ from 'jquery';
import { CurrentUser } from 'src/app/models/CurrentUser.model';
import { CurrentUserService } from 'src/app/_services/CurrentUser.service';
import { AuditLogService } from 'src/app/_services/AuditLog.service';
import { AuditLog } from 'src/app/models/AuditLog.model';

@Component({
  selector: 'app-make-sale',
  templateUrl: './make-sale.component.html',
  styleUrls: ['./make-sale.component.css'],
})
export class MakeSaleComponent implements OnInit {
  @Output() return = new EventEmitter<string>();

  customerAccount: CustomerAccount;
  customerAccounts: CustomerAccount[] = [];
  customerAccountsTemp: CustomerAccount[] = [];

  sale: Sale = {
    saleID: 0,
    userID: 0,
    customerAccountID: -1,
    date: '',
    total: 0,
  };
  sales: Sale[] = [];
  salesTemp: Sale[] = [];

  payment: Payment = {
    paymentID: 0,
    paymentTypeID: 0,
    saleID: 0,
    date: '',
    amount: 0,
  };
  payments: Payment[] = [];
  paymentsTemp: Payment[] = [];

  paymentType: PaymentType = {
    paymentTypeID: 0,
    description: '',
  };
  paymentTypes: PaymentType[] = [];
  paymentTypesTemp: PaymentType[] = [];

  saleProduct: SaleProduct = {
    saleProductID: 0,
    saleID: 0,
    productID: 0,
    quantity: 0,
  };
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
    functionUsed: 'Make Sale',
    date: new Date().toString(),
    month: '',
  };
  audits: AuditLog[] = [];
  auditsTemp: AuditLog[] = [];

  searchText: string = '';
  barcodeProductName: string = '';
  saleQuantity: number = 1;
  subTotal: any = 0;
  totalAmount: number = 0;
  amountGiven: number = 0;
  change: number = 0;

  barcodeSelected: boolean = true;
  quanValidate: boolean = true;
  customerCreditValidate: boolean = true;
  selectedPaymentMethod: boolean = true;
  productAdded: boolean = true;
  amountvalidate: boolean = true;
  cash: boolean = true;
  card: boolean = true;
  showPrintRec: boolean = true;
  successSubmit: boolean = false;
  notEnough: boolean = true;
  moreThanOnHand: boolean = true;

  monthInt: number = new Date().getMonth();
  month: string;

  typeOfPaymentID: number;

  dynamicArray = [];

  constructor(
    private customerAccountService: CustomerAccountService,
    private productService: ProductService,
    private saleService: SaleService,
    private saleProductService: SaleProductService,
    private paymentService: PaymentService,
    private paymentTypeService: PaymentTypeService,
    private auditLogService: AuditLogService,
    private currentUserService: CurrentUserService
  ) {}

  async ngOnInit() {
    this.getAllProducts();
    this.getAllCustomerAccounts();
    this.getAllCurrentUsers();
    await this.sleep(150);

    this.customerAccountsTemp = this.customerAccounts;
    console.log('this is the customer accounts temp array');
    console.log(this.customerAccountsTemp);
    await this.sleep(1000);

    //set the current user
    this.audit.userID = this.currentUsers[this.currentUsers.length - 1].userID;
    this.sale.userID = this.currentUsers[this.currentUsers.length - 1].userID;

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
  }

  getAllCurrentUsers() {
    this.currentUserService.getAllCurrentUsers().subscribe((response) => {
      this.currentUsers = response;
      console.log('All current Users');
      console.log(this.currentUsers);
    });
  }

  async onSubmit() {
    console.log('this is the type of payment');
    console.log(this.typeOfPaymentID);

    //add sale

    this.sale.date = new Date().toString();
    this.sale.total = this.totalAmount;
    if (this.typeOfPaymentID == 3) {
      let id = Number($('#customerAccountID option:selected').val());
      this.sale.customerAccountID = id;
    }

    console.log('this is the sale');
    console.log(this.sale);
    this.saleService.addSale(this.sale).subscribe((response) => {
      console.log(response);
    });

    await this.sleep(500);
    this.getAllSales();
    await this.sleep(500);

    //update customer account

    if (this.typeOfPaymentID == 3) {
      let id = Number($('#customerAccountID option:selected').val());
      this.customerAccountsTemp = this.customerAccounts;
      this.customerAccountsTemp = this.customerAccountsTemp.filter(
        (customerAccount) => {
          console.log(customerAccount.customeR_ACCOUNT_ID == id);
          return customerAccount.customeR_ACCOUNT_ID == id;
        }
      );

      this.customerAccount = this.customerAccountsTemp[0];
      this.customerAccount.amounT_OWING =
        this.customerAccount.amounT_OWING + this.totalAmount;

      console.log('this is the updated customer account');
      console.log(this.customerAccount);
      this.customerAccountService
        .updateCustomerAccount(this.customerAccount)
        .subscribe((response) => {
          console.log(response);
        });
    }

    this.salesTemp = this.sales;
    let newSaleID = this.salesTemp[this.sales.length - 1].saleID;

    //add payment

    this.payment.paymentTypeID = this.typeOfPaymentID;
    this.payment.date = new Date().toString();
    this.payment.amount = this.totalAmount;
    this.payment.saleID = newSaleID;

    console.log('this is the payment');
    console.log(this.payment);
    this.paymentService.addPayment(this.payment).subscribe((response) => {
      console.log(response);
    });

    //get products and their id

    for (let index = 0; index < this.dynamicArray.length; index++) {
      const element = this.dynamicArray[index];
      this.productsTemp = this.products;
      this.productsTemp = this.productsTemp.filter((product) => {
        console.log(product.producT_ID == element.productID);
        return product.producT_ID == element.productID;
      });

      this.saleProduct.saleID = newSaleID;
      this.saleProduct.productID = element.productID;
      this.saleProduct.quantity = element.quantity;

      console.log('this is the Sale Product');
      console.log(this.saleProduct);
      this.saleProductService
        .addSaleProduct(this.saleProduct)
        .subscribe((response) => {
          console.log(response);
        });

      this.product = this.productsTemp[0];
      this.product.quantitY_ON_HAND =
        this.product.quantitY_ON_HAND - element.quantity;

      console.log('this is the New Product Quantity');
      console.log(this.product);
      this.productService.updateProduct(this.product).subscribe((response) => {
        console.log(response);
      });
    }

    //adding to audit log
    this.auditLogService.addAuditLog(this.audit).subscribe((response) => {
      console.log('entry into audit log');
      console.log(response);
    });
  }

  AmountEntered() {
    console.log('amount entered ' + this.amountGiven);
    if (this.amountGiven > 0) {
      let amount = this.totalAmount - this.amountGiven;
      if (amount > 0) {
        this.notEnough = false;
        this.amountvalidate = true;
      } else {
        this.change = (this.totalAmount - this.amountGiven) * -1;
        this.amountvalidate = true;
        this.notEnough = true;
      }
    } else {
      this.amountvalidate = false;
    }
  }

  selectPayment(x: any) {
    if (x == '3') {
      this.selectedPaymentMethod = false;
      this.cash = true;
      this.card = true;
    } else if (x == '1') {
      this.selectedPaymentMethod = true;
      this.cash = false;
      this.card = true;
    } else {
      this.selectedPaymentMethod = true;
      this.cash = true;
      this.card = false;
    }
    this.typeOfPaymentID = x;
    this.showPrintRec = false;
  }

  customerID: number = -1;

  creditValidate(id: number) {
    this.customerID = id;
    this.customerAccountsTemp = this.customerAccounts;
    this.customerAccountsTemp = this.customerAccountsTemp.filter(
      (customerAccount) => {
        console.log(customerAccount.customeR_ACCOUNT_ID == id);
        return customerAccount.customeR_ACCOUNT_ID == id;
      }
    );
    let amountleft =
      this.customerAccountsTemp[0].crediT_LIMIT -
      this.customerAccountsTemp[0].amounT_OWING;
    if (amountleft > 0) {
      if (amountleft < this.totalAmount) {
        this.customerCreditValidate = false;
      } else {
        this.customerCreditValidate = true;
      }
    } else {
      this.customerCreditValidate = true;
    }
  }

  CalQuan(i: number, quan: number) {
    if (quan > 0) {
      let priceTemp = this.price;
      console.log('calculating qunatity');
      console.log(this.saleQuantity);
      priceTemp = priceTemp * quan;
      this.dynamicArray[i].total = priceTemp;
      this.dynamicArray[i].vatPrice = (priceTemp / 1.15).toFixed(2);
      console.log(this.dynamicArray);

      this.subTotal = 0;
      this.totalAmount = 0;
      for (let i = 0; i < this.dynamicArray.length; i++) {
        const element = this.dynamicArray[i];
        this.totalAmount = this.totalAmount + element.total;
        this.subTotal = (this.totalAmount / 1.15).toFixed(2);
      }
      this.quanValidate = true;
      if (this.customerID > -1) this.creditValidate(this.customerID);

      if (quan > this.dynamicArray[i].quanOnHand) {
        this.moreThanOnHand = false;
      } else {
        this.moreThanOnHand = true;
      }
    } else {
      this.quanValidate = false;
    }
  }

  price: number;
  addProduct() {
    if (this.barcodeProductName == '') {
      this.barcodeSelected = false;
      this.productAdded = true;
    } else {
      //get product name
      let productName = this.barcodeProductName;

      //get quantity
      this.saleQuantity;

      //get vat price
      this.price = this.productsTemp[0].sellinG_PRICE;
      this.price = this.price * this.saleQuantity;
      let vatPrice = (this.price / 1.15).toFixed(2);

      //get total price
      let totalPrice = this.price;

      //dynamic array push
      this.dynamicArray.push({
        name: productName,
        quantity: this.saleQuantity,
        vatPrice: vatPrice,
        total: this.price,
        productID: this.productsTemp[0].producT_ID,
        quanOnHand: this.productsTemp[0].quantitY_ON_HAND,
      });
      this.subTotal = 0;
      this.totalAmount = 0;
      for (let i = 0; i < this.dynamicArray.length; i++) {
        const element = this.dynamicArray[i];
        this.totalAmount = this.totalAmount + element.total;
        this.subTotal = (this.totalAmount / 1.15).toFixed(2);
      }
      if (this.customerID > -1) this.creditValidate(this.customerID);
      console.log(this.subTotal);
      this.productAdded = false;
    }
  }

  Search() {
    this.productsTemp = this.products;
    console.log(this.searchText);
    if (this.searchText !== '') {
      let searchValue = this.searchText;
      this.productsTemp = this.productsTemp.filter((product) => {
        console.log(product.barcode.match(searchValue));
        return product.barcode.match(searchValue);
      });
    } else {
      this.productsTemp = this.products;
    }
    if (this.searchText == '') {
      this.barcodeProductName = '';
    } else this.barcodeProductName = this.productsTemp[0].producT_NAME;
  }

  sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  getAllCustomerAccounts() {
    this.customerAccountService
      .getAllCustomerAccounts()
      .subscribe((response) => {
        this.customerAccounts = response;
        console.log('all customer accounts');
        console.log(this.customerAccounts);
      });
  }
  getAllPaymentss() {
    this.paymentService.getAllPayments().subscribe((response) => {
      this.payments = response;
      console.log('all payments');
      console.log(this.payments);
    });
  }
  getAllSales() {
    this.saleService.getAllSales().subscribe((response) => {
      this.sales = response;
      console.log('all sales');
      console.log(this.sales);
    });
  }
  getAllSaleProducts() {
    this.saleProductService.getAllSaleProducts().subscribe((response) => {
      this.saleProducts = response;
      console.log('all sale products');
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
  getAllPaymentTypes() {
    this.paymentTypeService.getAllPaymentTypes().subscribe((response) => {
      this.paymentTypes = response;
      console.log('all payment types');
    });
  }
  Return() {
    this.return.emit('false');
  }
}
