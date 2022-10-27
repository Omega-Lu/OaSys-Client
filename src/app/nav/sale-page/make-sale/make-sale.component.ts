import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
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
import { Vat } from 'src/app/models/Vat.model';
import { VatService } from 'src/app/_services/Vat.service';

// valdiation
import { ValidationServicesComponent } from 'src/app/validation-services/validation-services.component';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-make-sale',
  templateUrl: './make-sale.component.html',
  styleUrls: ['./make-sale.component.css'],
})
export class MakeSaleComponent implements OnInit {
  @Output() return = new EventEmitter<string>();

  //vat
  vat: Vat;
  vats: Vat[] = [];

  //customer account
  customerAccount: CustomerAccount;
  customerAccounts: CustomerAccount[] = [];
  customerAccountsTemp: CustomerAccount[] = [];

  //sale
  sale: Sale = {
    saleID: 0,
    userID: 0,
    customerAccountID: -1,
    paymentID: 0,
    date: new Date(),
    total: 0,
    returned: false,
  };
  sales: Sale[] = [];
  salesTemp: Sale[] = [];

  //payment
  payment: Payment = {
    paymentID: 0,
    paymentTypeID: '',
    saleID: 0,
    date: '',
    amount: 0,
  };
  payments: Payment[] = [];
  paymentsTemp: Payment[] = [];

  //payment type
  paymentType: PaymentType = {
    paymentTypeID: 0,
    description: '',
  };
  paymentTypes: PaymentType[] = [];
  paymentTypesTemp: PaymentType[] = [];

  typeOfPayment: string = '';

  //sale product
  saleProduct: SaleProduct = {
    saleProductID: 0,
    saleID: 0,
    productID: 0,
    quantity: 0,
  };
  saleProducts: SaleProduct[] = [];
  saleProductsTemp: SaleProduct[] = [];

  //product
  product: Product;
  products: Product[] = [];
  productsTemp: Product[] = [];

  //current user
  currentUser: CurrentUser;
  currentUsers: CurrentUser[] = [];
  currentUsersTemp: CurrentUser[] = [];

  //audit log
  audit: AuditLog = {
    auditLogID: 0,
    userID: 0,
    employeeID: 0,
    functionUsed: 'Make Sale',
    date: new Date(),
    month: '',
  };
  audits: AuditLog[] = [];
  auditsTemp: AuditLog[] = [];

  searchText: string = '';
  barcodeProductName: string = '';
  saleQuantity: number = 1;
  subTotal: any = 0;
  totalAmount: number = 0;
  totalAmountString: string = '0';
  amountGiven: number = 0;
  change: number = 0;

  //validation
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
  validQuantity: boolean = true;

  validate: ValidationServicesComponent = new ValidationServicesComponent();

  monthInt: number = new Date().getMonth();
  month: string;

  typeOfPaymentID: number;

  dynamicArray = [];

  vatAmount: number = 0;

  //help pdf
  pdfPath = 'https://localhost:7113/Resources/pdfs/Make sale.pdf';
  displayPDF: boolean = false;

  today = new Date();

  constructor(
    private customerAccountService: CustomerAccountService,
    private productService: ProductService,
    private saleService: SaleService,
    private saleProductService: SaleProductService,
    private paymentService: PaymentService,
    private paymentTypeService: PaymentTypeService,
    private auditLogService: AuditLogService,
    private currentUserService: CurrentUserService,
    private vatService: VatService
  ) {}

  async ngOnInit() {
    this.getAllCurrentUsers();

    this.vatService.getAllVatses().subscribe((res) => {
      this.vats = res;
      this.vat = res[0];
      this.vatAmount = this.vat.vatAmount / 100 + 1;
    });

    var input = document.getElementById('inputBarcode');

    input.focus();
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

  //////////////////////////get Functions /////////////////////////////////////

  getAllCurrentUsers() {
    this.currentUserService.getAllCurrentUsers().subscribe((response) => {
      this.currentUsers = response;

      //set the current user
      this.sale.userID = this.currentUsers[this.currentUsers.length - 1].userID;

      this.audit.userID =
        this.currentUsers[this.currentUsers.length - 1].userID;
      this.audit.employeeID =
        this.currentUsers[this.currentUsers.length - 1].employeeID;
      this.currentUser = this.currentUsers[this.currentUsers.length - 1];

      this.audit.month = 'Jan';

      console.log('All current Users');
      console.log(this.currentUsers);
      this.getAllCustomerAccounts();
    });
  }

  getAllCustomerAccounts() {
    this.customerAccountService
      .getAllCustomerAccounts()
      .subscribe((response) => {
        response = response.filter((debtor) => {
          return debtor.deleted == false;
        });
        this.customerAccounts = response;
        this.customerAccountsTemp = response;
        console.log('all customer accounts');
        console.log(this.customerAccounts);
        this.getAllPaymentss();
      });
  }

  getAllPaymentss() {
    this.paymentService.getAllPayments().subscribe((response) => {
      this.payments = response;
      console.log('all payments');
      console.log(this.payments);
      this.getAllSales();
    });
  }

  getAllSales() {
    this.saleService.getAllSales().subscribe((response) => {
      this.sales = response;
      console.log('all sales');
      console.log(this.sales);
      this.receiptID = this.sales[this.sales.length - 1].saleID + 1;
      this.getAllSaleProducts();
    });
  }

  getAllSaleProducts() {
    this.saleProductService.getAllSaleProducts().subscribe((response) => {
      this.saleProducts = response;
      console.log('all sale products');
      console.log(this.saleProducts);
      this.getAllProducts();
    });
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe((response) => {
      response = response.filter((product) => {
        return product.deleted == false;
      });
      this.products = response;
      console.log('all products');
      console.log(this.products);
      this.getAllPaymentTypes();
    });
  }

  getAllPaymentTypes() {
    this.paymentTypeService.getAllPaymentTypes().subscribe((response) => {
      this.paymentTypes = response;
      console.log('all payment types');
    });
  }

  //////////////////////// validation ////////////////////////////////////////

  validAmount: boolean = true;
  changeString: string = '0';

  AmountEntered() {
    this.validAmount = this.validate.ValidateMoney(this.amountGiven);

    console.log('amount entered ' + this.amountGiven);
    if (this.amountGiven > 0) {
      let amount = this.totalAmount - this.amountGiven;
      if (amount > 0) {
        this.notEnough = false;
        this.amountvalidate = true;
      } else {
        this.change = (this.totalAmount - this.amountGiven) * -1;
        this.changeString = this.change.toFixed(2);
        this.amountvalidate = true;
        this.notEnough = true;
      }
    } else {
      this.amountvalidate = false;
    }
  }

  selectPayment(x: any) {
    this.typeOfPayment = x;

    this.typeOfPaymentID = 1;
    this.showPrintRec = false;
  }

  customerID: number = -1;

  creditValidate(id: number) {
    this.customerID = id;
    this.customerAccountsTemp = this.customerAccounts;
    this.customerAccountsTemp = this.customerAccountsTemp.filter(
      (customerAccount) => {
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
    this.validQuantity = this.validate.ValidateInteger(quan);

    if (quan > 0) {
      let priceTemp = this.price;
      priceTemp = priceTemp * quan;
      this.dynamicArray[i].total = priceTemp;
      this.dynamicArray[i].vatPrice = (priceTemp / this.vatAmount).toFixed(2);
      console.log(this.dynamicArray);

      this.subTotal = 0;
      this.totalAmount = 0;
      for (let i = 0; i < this.dynamicArray.length; i++) {
        const element = this.dynamicArray[i];
        this.totalAmount = this.totalAmount + element.total;
        this.totalAmountString = this.totalAmount.toFixed(2);
        this.subTotal = (this.totalAmount / this.vatAmount).toFixed(2);
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

  checkAmountGiven() {
    if (this.typeOfPayment == 'Cash') {
      this.AmountEntered();
    }
  }
  ////////////////////////////Add Product To DYnamimc Array///////////////////

  scan() {
    let temp = this.products.filter((product) => {
      return product.barcode == this.searchText;
    });
    if (temp.length > 0) {
      console.log('scanned');
      this.inList();
    } else {
      console.log('didnt scan');
    }
  }

  Search() {
    this.productsTemp = this.products;
    console.log(this.searchText);
    if (this.searchText !== '') {
      let searchValue = this.searchText;
      this.productsTemp = this.productsTemp.filter((product) => {
        return product.barcode.match(searchValue);
      });
      this.barcodeProductName = this.productsTemp[0].producT_NAME;
    } else {
      this.productsTemp = this.products;
      this.barcodeProductName = '';
    }
  }

  inListAlready: boolean = false;

  inList() {
    this.inListAlready = false;
    for (let i = 0; i < this.dynamicArray.length; i++) {
      const element = this.dynamicArray[i];
      if (element.productID == this.productsTemp[0].producT_ID) {
        this.dynamicArray[i].quantity = this.dynamicArray[i].quantity + 1;
        this.inListAlready = true;
        $('#inputBarcode').val('');
      }
    }
    if (!this.inListAlready) {
      this.addProduct();
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
        prodPrice: this.productsTemp[0].sellinG_PRICE,
        total: this.price,
        productID: this.productsTemp[0].producT_ID,
        quanOnHand: this.productsTemp[0].quantitY_ON_HAND,
      });

      this.subTotal = 0;
      this.totalAmount = 0;
      for (let i = 0; i < this.dynamicArray.length; i++) {
        const element = this.dynamicArray[i];
        this.totalAmount = this.totalAmount + element.total;
        this.totalAmountString = this.totalAmount.toFixed(2);
        this.subTotal = (this.totalAmount / 1.15).toFixed(2);
      }
      if (this.customerID > -1) this.creditValidate(this.customerID);
      console.log(this.subTotal);
      this.productAdded = false;

      $('#inputBarcode').val('');
      console.log($('#inputBarcode').val());
    }
  }

  deleteRow(index) {
    this.dynamicArray.splice(index, 1);

    console.log(this.dynamicArray);

    if (this.dynamicArray.length < 1) {
      this.productAdded = true;
      this.typeOfPayment = '-1';
      this.changeString = '';
      this.totalAmountString = '';
      this.subTotal = '';
    }
  }

  ///////////////////////////////make the sale////////////////////////////////

  receiptID = 0;

  async onSubmit() {
    //add payment

    this.payment.date = new Date().toString();
    this.payment.amount = this.totalAmount;
    this.payment.paymentTypeID = this.typeOfPayment;

    this.paymentService.addPayment(this.payment).subscribe((res) => {
      console.log('this is the new payment');
      console.log(res);

      // add the sale

      if (this.typeOfPayment == 'Credit') {
        this.sale.customerAccountID == this.customerID;

        // add to customer account debt
        this.customerAccountsTemp = this.customerAccounts.filter((temp) => {
          return temp.customeR_ACCOUNT_ID == this.customerID;
        });

        this.customerAccountsTemp[0].amounT_OWING =
          this.customerAccountsTemp[0].amounT_OWING + this.totalAmount;

        this.customerAccountService
          .updateCustomerAccount(this.customerAccountsTemp[0])
          .subscribe((resCustomer) => {
            console.log('this is the updated customer account');
            console.log(resCustomer);
          });
      }
      this.sale.date = new Date();
      this.sale.total = this.totalAmount;
      this.sale.paymentID = res.paymentID;
      this.sale;

      this.saleService.addSale(this.sale).subscribe((response) => {
        console.log('this is the new Sale');
        console.log(response);

        this.sale = response;
        this.receiptID = this.sale.saleID;

        let ccanvas = document.getElementById('htmlData');
        html2canvas(ccanvas).then((canvas) => {
          this.receiptID = this.sale.saleID;
          let fileWidth = 590;
          let fileHeight = (canvas.height * fileWidth) / canvas.width;
          const FILEURI = canvas.toDataURL('image/png');
          this.PDF = new jsPDF('p', 'pt', 'a4');
          let position = 0;
          this.PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
          this.PDF.save('Sale ' + this.sale.saleID + '.pdf');
        });

        for (let i = 0; i < this.dynamicArray.length; i++) {
          const element = this.dynamicArray[i];

          // add sale Product

          this.saleProduct.productID = element.productID;
          this.saleProduct.saleID = response.saleID;
          this.saleProduct.quantity = element.quantity;

          this.saleProductService
            .addSaleProduct(this.saleProduct)
            .subscribe((resSaleProduct) => {
              console.log('new SaleProduct');
              console.log(resSaleProduct);
            });

          // decrease inventory

          this.productsTemp = this.products.filter((product) => {
            return product.producT_ID == element.productID;
          });

          this.productsTemp[0].quantitY_ON_HAND =
            this.productsTemp[0].quantitY_ON_HAND - element.quantity;

          this.productService
            .updateProduct(this.productsTemp[0])
            .subscribe((resProduct) => {
              console.log('updated product quantity');
              console.log(resProduct);
            });
        }
      });
    });

    //adding to audit log
    this.auditLogService.addAuditLog(this.audit).subscribe((response) => {
      console.log('entry into audit log');
      console.log(response);
      this.successSubmit = true;
    });
  }

  PDF;
}
