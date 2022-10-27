import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/_services/product.service';
import { ProductType } from 'src/app/models/Product-Type.model';
import { ProductTypeService } from 'src/app/_services/product-type.service';
import { ProductCategory } from 'src/app/models/Product-Category.model';
import { ProductCategoryService } from 'src/app/_services/product-category.service';
import { Output, EventEmitter } from '@angular/core';

//import references
import { SaleProduct } from 'src/app/models/SaleProduct.model';
import { SaleProductService } from 'src/app/_services/SaleProduct.service';
import { OrderProduct } from 'src/app/models/orderProduct.model';
import { OrderProductService } from 'src/app/_services/orderProduct.service';
import { ProductWriteOff } from 'src/app/models/ProductWriteOff.model';
import { ProductWriteOffService } from 'src/app/_services/productWriteOff.service';

//audit log
import { AuditLog } from 'src/app/models/AuditLog.model';
import { AuditLogService } from 'src/app/_services/AuditLog.service';
import { CurrentUserService } from 'src/app/_services/CurrentUser.service';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-maintain-product',
  templateUrl: './maintain-product.component.html',
  styleUrls: ['./maintain-product.component.css'],
})
export class MaintainProductComponent implements OnInit {
  @Output() return = new EventEmitter<string>();

  updateProduct: boolean = false;
  successDelete: boolean = false;

  // products
  productsTemp: Product[] = [];
  products: Product[] = [];
  product: Product;

  //product Type
  productTypes: ProductType[] = [];
  productTypesTemp: ProductType[] = [];

  //Product Category
  productCategories: ProductCategory[] = [];
  productCategoriesTemp: ProductCategory[] = [];

  //dynamicArray
  dynamicArray = [];
  tempArray = [];

  searchText: string = '';

  deletenumber: any;

  //references variables

  hasReference: boolean = false;

  // sale product
  saleProducts: SaleProduct[] = [];
  saleProductsTemp: SaleProduct[] = [];

  //order product
  orderProducts: OrderProduct[] = [];
  orderProductsTemp: OrderProduct[] = [];

  //product wrtie off
  productWriteOffs: ProductWriteOff[] = [];
  productWriteOffsTemp: ProductWriteOff[] = [];

  //audit log
  auditLog: AuditLog = {
    auditLogID: 0,
    userID: 0,
    employeeID: 0,
    functionUsed: 'Delete Product',
    date: new Date(),
    month: 'Oct',
  };

  //help pdf
  pdfPath = 'https://localhost:7113/Resources/pdfs/Maintain product.pdf';
  displayPDF: boolean = false;

  constructor(
    private productService: ProductService,
    private productCategoryService: ProductCategoryService,
    private productTypeService: ProductTypeService,
    private SaleProductService: SaleProductService,
    private OrderProductService: OrderProductService,
    private ProductWriteOffService: ProductWriteOffService,
    private CurrentUserService: CurrentUserService,
    private AuditLogService: AuditLogService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();

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

  //////////////// get functions ///////////////////////////////////////////

  getAllProducts() {
    this.productService.getAllProducts().subscribe((response) => {
      response = response.filter((temp) => {
        return temp.deleted == false;
      });
      console.log('this is all the products');
      console.log(response);
      this.products = response;
      this.productsTemp = response;
      this.getProductCategories();
    });
  }

  getProductCategories() {
    this.productCategoryService.getAllProductCategories().subscribe((res) => {
      this.productCategories = res;
      this.getProductTypes();
    });
  }

  getProductTypes() {
    this.productTypeService.getAllProductTypes().subscribe((res) => {
      this.productTypes = res;
      this.createDynamicArray();
    });
  }

  //////////////// create dynamic array ////////////////////////////////////

  createDynamicArray() {
    this.dynamicArray = [];
    for (let i = 0; i < this.products.length; i++) {
      const element = this.products[i];
      if (!element.deleted) {
        //get category
        this.productCategoriesTemp = this.productCategories;
        this.productCategoriesTemp = this.productCategoriesTemp.filter(
          (temp) => {
            return temp.producT_CATEGORY_ID == element.producT_CATEGORY_ID;
          }
        );

        //get type
        this.productTypesTemp = this.productTypes;
        this.productTypesTemp = this.productTypesTemp.filter((temp) => {
          return temp.producT_TYPE_ID == element.producT_TYPE_ID;
        });

        //push
        this.dynamicArray.push({
          name: element.producT_NAME,
          description: element.producT_DESCRIPTION,
          type: this.productTypesTemp[0].typE_NAME,
          category: this.productCategoriesTemp[0].categorY_NAME,
          product: element,
        });
      }
    }
    this.tempArray = this.dynamicArray;
  }

  //////////////// delete product //////////////////////////////////////////

  deletee(delet: any) {
    this.product = delet;
    this.ActiveReferences();
  }

  deleteProduct() {
    this.product.deleted = true;
    this.productService.updateProduct(this.product).subscribe((res) => {
      console.log('this is the deleted product');
      console.log(res);

      this.getAllProducts();

      //add to audit log
      this.AuditLogService.addAuditLog(this.auditLog).subscribe((res) => {
        console.log('new audit log entry');
        console.log(res);
        this.successDelete = true;
      });
    });
  }

  /////////////////// validation functions /////////////////////////////////

  hasQuantity: boolean = false;
  ActiveReferences() {
    this.hasQuantity = false;
    console.log(this.product);
    this.hasReference = false;

    // SaleProduct References
    this.SaleProductService.getAllSaleProducts().subscribe((res) => {
      console.log('this is all the saleProducts');
      console.log(res);
      this.saleProducts = res.filter((saleProduct) => {
        return saleProduct.productID == this.product.producT_ID;
      });
      console.log(this.saleProducts);
      if (this.saleProducts.length > 0) {
        this.hasReference = true;
      }
    });

    //OrderProduct References (any product that is part of a order return will be part of an order product)
    this.OrderProductService.getAllOrderProducts().subscribe((res) => {
      this.orderProducts = res.filter((orderProduct) => {
        return orderProduct.productID == this.product.producT_ID;
      });
      if (this.orderProducts.length > 0) {
        this.hasReference = true;
      }
    });

    //productWriteOff Reference
    this.ProductWriteOffService.getAllProductWriteOffs().subscribe((res) => {
      this.productWriteOffs = res.filter((productWriteOff) => {
        return productWriteOff.productID == this.product.producT_ID;
      });
      if (this.productWriteOffs.length > 0) {
        this.hasReference = true;
      }
    });

    if (this.product.quantitY_ON_HAND > 0) {
      this.hasReference = true;
    }
  }

  back() {
    this.updateProduct = false;
    this.return.emit('false');
    this.getAllProducts();
  }

  /////////////////// populate and search /////////////////////////////////

  populateForm(product: Product) {
    this.product = product;
    this.updateProduct = true;
  }

  Search() {
    this.dynamicArray = this.tempArray;
    if (this.searchText !== '') {
      this.dynamicArray = this.dynamicArray.filter((product) => {
        return (
          product.name.match(this.searchText) ||
          product.description.match(this.searchText) ||
          product.type.match(this.searchText) ||
          product.category.match(this.searchText)
        );
      });
    }
  }
}
