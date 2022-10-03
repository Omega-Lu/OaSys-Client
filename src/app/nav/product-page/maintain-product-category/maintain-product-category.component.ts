import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductCategory } from 'src/app/models/Product-Category.model';
import { ProductCategoryService } from 'src/app/_services/product-category.service';
import { ProductType } from 'src/app/models/Product-Type.model';
import { ProductTypeService } from 'src/app/_services/product-type.service';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/_services/product.service';
import { Output, EventEmitter } from '@angular/core';

//audit log
import { AuditLog } from 'src/app/models/AuditLog.model';
import { AuditLogService } from 'src/app/_services/AuditLog.service';
import { CurrentUserService } from 'src/app/_services/CurrentUser.service';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-maintain-product-category',
  templateUrl: './maintain-product-category.component.html',
  styleUrls: ['./maintain-product-category.component.css'],
})
export class MaintainProductCategoryComponent implements OnInit {
  @Output() return = new EventEmitter<string>();

  updateProductCategory: boolean = false;
  successDelete: boolean = false;

  //product category
  productCategoriesTemp: ProductCategory[] = [];
  productCategories: ProductCategory[] = [];
  productCategory: ProductCategory;

  //product type
  productTypes: ProductType[] = [];
  productTypesTemp: ProductType[] = [];

  //product
  products: Product[] = [];
  productsTemp: Product[] = [];

  searchText: string = '';

  deletenumber: any;

  //delete type and cat
  hasProductOrType: boolean = false;

  //audit log
  auditLog: AuditLog = {
    auditLogID: 0,
    userID: 0,
    employeeID: 0,
    functionUsed: 'Delete Product Category',
    date: new Date(),
    month: 'Oct',
  };

  //help pdf
  pdfPath =
    'https://localhost:7113/Resources/pdfs/Maintain product category.pdf';
  displayPDF: boolean = false;

  constructor(
    private productCategoryService: ProductCategoryService,
    private productService: ProductService,
    private productTypeService: ProductTypeService,
    private CurrentUserService: CurrentUserService,
    private AuditLogService: AuditLogService
  ) {}

  ngOnInit(): void {
    this.getAllProductCategories();

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

  deletee(delet: any) {
    this.productCategory = delet;
    this.ActiveReference();
  }

  ActiveReference() {
    this.hasProductOrType = false;

    //type referece
    this.productTypeService.getAllProductTypes().subscribe((res) => {
      this.productTypesTemp = res.filter((type) => {
        return (
          type.producT_CATEGORY_ID == this.productCategory.producT_CATEGORY_ID
        );
      });
      let activeArray = [];
      if (this.productTypesTemp.length > 0) {
        activeArray = this.productTypesTemp.filter((active) => {
          return active.deleted == false;
        });
      }
      if (activeArray.length > 0) {
        this.hasProductOrType = true;
      }
    });
  }

  deleteProductCategory() {
    console.log('made it to delete');
    this.productCategory.deleted = true;
    this.productCategoryService
      .updateProductCategory(this.productCategory)
      .subscribe((response) => {
        this.getAllProductCategories();
        console.log(response);

        //add to audit log
        this.AuditLogService.addAuditLog(this.auditLog).subscribe((res) => {
          console.log('new audit log entry');
          console.log(res);
          this.successDelete = true;
        });
      });
  }

  populateForm(productCategory: ProductCategory) {
    this.productCategory = productCategory;
    this.updateProductCategory = true;
  }

  getAllProductCategories() {
    this.productCategoryService
      .getAllProductCategories()
      .subscribe((response) => {
        response = response.filter((temp) => {
          return temp.deleted == false;
        });
        this.productCategories = response;
        this.productCategoriesTemp = response;
      });
    this.getProducts();
  }

  getProducts() {
    this.productService.getAllProducts().subscribe((res) => {
      this.products = res;
    });
    this.getProductTypes();
  }

  getProductTypes() {
    this.productTypeService.getAllProductTypes().subscribe((res) => {
      this.productTypes = res;
    });
  }

  Search() {
    this.productCategoriesTemp = this.productCategories;
    if (this.searchText !== '') {
      this.productCategoriesTemp = this.productCategoriesTemp.filter(
        (product) => {
          return (
            product.categorY_NAME.match(this.searchText) ||
            product.categorY_DESCRIPTION.match(this.searchText)
          );
        }
      );
    }
  }

  back() {
    this.return.emit('false');
    this.updateProductCategory = false;
    this.getAllProductCategories();
  }
}
