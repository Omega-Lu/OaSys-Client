import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/_services/product.service';
import { ProductType } from 'src/app/models/Product-Type.model';
import { ProductCategoryService } from 'src/app/_services/product-category.service';
import { ProductCategory } from 'src/app/models/Product-Category.model';
import { ProductTypeService } from 'src/app/_services/product-type.service';
import { CurrentUser } from 'src/app/models/CurrentUser.model';

import { ValidationServicesComponent } from 'src/app/validation-services/validation-services.component';

//audit log
import { AuditLog } from 'src/app/models/AuditLog.model';
import { AuditLogService } from 'src/app/_services/AuditLog.service';
import { CurrentUserService } from 'src/app/_services/CurrentUser.service';
import { HttpClient } from '@angular/common/http';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  @Output() return = new EventEmitter<string>();
  categorySelected: boolean = false;
  successSubmit: boolean = false;

  //product Categorys
  productCategory: ProductCategory;
  productCategories: ProductCategory[] = [];
  productCategoriesTemp: ProductCategory[] = [];

  //product Type
  productType: ProductType;
  productTypes: ProductType[] = [];
  productTypesTemp: ProductType[] = [];

  //product
  product: Product = {
    producT_ID: 0,
    producT_CATEGORY_ID: -1,
    producT_TYPE_ID: -1,
    producT_NAME: '',
    producT_DESCRIPTION: '',
    quantitY_ON_HAND: 0,
    cosT_PRICE: null,
    sellinG_PRICE: null,
    reordeR_LIMIT: null,
    barcode: '',
    deleted: false,
    img: '',
  };
  products: Product[] = [];
  productsTemp: Product[] = [];

  //current User
  currentUser: CurrentUser;
  currentUsers: CurrentUser[] = [];
  currentUsersTemp: CurrentUser[] = [];

  //audit log
  auditLog: AuditLog = {
    auditLogID: 0,
    userID: 0,
    employeeID: 0,
    functionUsed: 'Add Product',
    date: new Date(),
    month: 'Oct',
  };

  //validation
  validate: ValidationServicesComponent = new ValidationServicesComponent();
  validName: boolean = true;
  validDescription: boolean = true;
  validCost: boolean = true;
  validSell: boolean = true;
  validReorder: boolean = true;
  validBarcode: boolean = true;
  validCategory: boolean = true;
  validType: boolean = true;

  //unique
  uniqueNameAndDesc: boolean = true;
  uniqueBarcode: boolean = true;

  //upload
  public message: string;
  public progress: number;
  @Output() public onUploadFinished = new EventEmitter();
  public response: { dbPath: '' };
  validFile: boolean = true;

  //help pdf
  pdfPath = 'https://localhost:7113/Resources/pdfs/Add product.pdf';
  displayPDF: boolean = false;

  constructor(
    private productService: ProductService,
    private productCategoryService: ProductCategoryService,
    private productTypeService: ProductTypeService,
    private CurrentUserService: CurrentUserService,
    private AuditLogService: AuditLogService,
    private http: HttpClient
  ) {}

  async ngOnInit() {
    this.getProducts();

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

  ///////////////// uploading an image////////////////////////

  public uploadFile = (files) => {
    let fileToUpload = <File>files[0];

    if (fileToUpload.name.match(/png|jpg|jpeg/g)) {
      const formData = new FormData();
      formData.append('file', fileToUpload, fileToUpload.name);

      this.http
        .post('https://localhost:7113/api/upload', formData)
        .subscribe((res) => {
          console.log(res['dbPath']);
          this.product.img = res['dbPath'];
          this.validFile = true;
        });
    } else {
      this.validFile = false;
    }
  };

  //////////// get functions /////////////////////////////////////////////

  getProducts() {
    this.productService.getAllProducts().subscribe((res) => {
      this.products = res;
      console.log('this is all the products');
      console.log(this.products);

      this.getAllProductCategories();
    });
  }

  getAllProductCategories() {
    this.productCategoryService
      .getAllProductCategories()
      .subscribe((response) => {
        response = response.filter((temp) => {
          return temp.deleted == false;
        });
        this.productCategories = response;
        console.log(this.productCategories);

        this.getAllProductTypes();
      });
  }

  getAllProductTypes() {
    this.productTypeService.getAllProductTypes().subscribe((response) => {
      response = response.filter((temp) => {
        return temp.deleted == false;
      });
      this.productTypes = response;
      console.log(this.productTypes);
    });
  }

  //////////////////////// validate functions ////////////////////////////////

  FormValidate() {
    this.Costvalidate();
    this.nameValidate();
    this.DescriptionValdate();
    this.Sellvalidate();
    this.BarcodeValidate();
    this.ReorderValidate();
    this.validateCategory();
    this.validateType();
    this.compareBarcode();
    this.CompareNameAndDescription();

    if (this.product.img == '') {
      this.validFile = false;
    } else {
      this.validFile = true;
    }
  }

  nameValidate() {
    if (this.product.producT_NAME == '') this.validName = false;
    else this.validName = true;
  }

  DescriptionValdate() {
    if (this.product.producT_DESCRIPTION == '') this.validDescription = false;
    else this.validDescription = true;
    this.CompareNameAndDescription();
  }

  CompareNameAndDescription() {
    this.uniqueNameAndDesc = true;
    this.productsTemp = this.products;
    this.productsTemp = this.productsTemp.filter((product) => {
      return product.producT_DESCRIPTION == this.product.producT_DESCRIPTION;
    });

    if (this.productsTemp.length > 0) {
      console.log(this.productsTemp);
      for (let i = 0; i < this.productsTemp.length; i++) {
        const element = this.productsTemp[i];
        if (element.producT_NAME == this.product.producT_NAME) {
          console.log('duplicate');
          if (element.deleted) {
            this.product.producT_ID = element.producT_ID;
            this.product.barcode = element.barcode;
          } else {
            this.uniqueNameAndDesc = false;
            break;
          }
        }
      }
    }
  }

  Costvalidate() {
    if (this.product.cosT_PRICE <= 0) this.validCost = false;
    else {
      this.validCost = this.validate.ValidateMoney(this.product.cosT_PRICE);
    }
  }

  Sellvalidate() {
    if (
      this.product.sellinG_PRICE <= 0 ||
      this.product.cosT_PRICE > this.product.sellinG_PRICE
    )
      this.validSell = false;
    else {
      this.validSell = this.validate.ValidateMoney(this.product.sellinG_PRICE);
    }
  }

  BarcodeValidate() {
    if (this.product.barcode == '') {
      this.validBarcode = false;
    } else {
      this.validBarcode = this.validate.ValidateInteger(this.product.barcode);
      if (this.validBarcode) {
        this.compareBarcode();
      }
    }
  }

  compareBarcode() {
    this.productsTemp = this.products;
    this.productsTemp = this.products.filter((product) => {
      return product.barcode == this.product.barcode;
    });
    if (this.productsTemp.length > 0) {
      if (this.productsTemp[0].deleted) {
        this.product.producT_ID = this.productsTemp[0].producT_ID;
      } else {
        this.uniqueBarcode = false;
      }
    } else {
      this.uniqueBarcode = true;
    }
  }

  ReorderValidate() {
    if (this.product.reordeR_LIMIT <= 0) {
      this.validReorder = false;
    } else {
      this.validReorder = this.validate.ValidateInteger(
        this.product.reordeR_LIMIT
      );
    }
  }

  async categorySelect(id: number) {
    this.productTypesTemp = this.productTypes.filter((productType) => {
      return productType.producT_CATEGORY_ID == id;
    });
    console.log(this.productTypes);
    this.categorySelected = true;
  }

  validateCategory() {
    if (this.product.producT_CATEGORY_ID == -1) {
      this.validCategory = false;
    } else this.validCategory = true;
  }

  validateType() {
    if (this.product.producT_TYPE_ID == -1) {
      this.validType = false;
    } else this.validType = true;
  }

  ///////////////// add product /////////////////////////////////////////////

  onSubmit() {
    if (this.product.producT_ID == 0) {
      this.productService.addProduct(this.product).subscribe((response) => {
        console.log('this is the new product');
        console.log(response);
        this.successSubmit = true;
      });
    } else {
      this.productService.updateProduct(this.product).subscribe((res) => {
        console.log('this is the reActivated product');
        console.log(res);
        this.successSubmit = true;
      });
    }

    //add to audit log
    this.AuditLogService.addAuditLog(this.auditLog).subscribe((res) => {
      console.log('new audit log entry');
      console.log(res);
    });
  }
}
