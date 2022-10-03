import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ProductCategory } from 'src/app/models/Product-Category.model';
import { ProductCategoryService } from 'src/app/_services/product-category.service';
import { ValidationServicesComponent } from 'src/app/validation-services/validation-services.component';

//audit log
import { AuditLog } from 'src/app/models/AuditLog.model';
import { AuditLogService } from 'src/app/_services/AuditLog.service';
import { CurrentUserService } from 'src/app/_services/CurrentUser.service';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-add-product-category',
  templateUrl: './add-product-category.component.html',
  styleUrls: ['./add-product-category.component.css'],
})
export class AddProductCategoryComponent implements OnInit {
  @Output() return = new EventEmitter<string>();

  //validations
  validCategory: boolean = true;
  validDescription: boolean = true;
  validate: ValidationServicesComponent = new ValidationServicesComponent();
  uniqueCatName: boolean = true;

  successSubmit: boolean = false;

  //product Categories
  productCategory: ProductCategory = {
    producT_CATEGORY_ID: 0,
    categorY_NAME: '',
    categorY_DESCRIPTION: '',
    deleted: false,
  };
  productCategories: ProductCategory[] = [];
  productCategoriesTemp: ProductCategory[] = [];

  //audit log
  auditLog: AuditLog = {
    auditLogID: 0,
    userID: 0,
    employeeID: 0,
    functionUsed: 'Add Product Category',
    date: new Date(),
    month: 'Oct',
  };

  //help pdf
  pdfPath = 'https://localhost:7113/Resources/pdfs/Add product category.pdf';
  displayPDF: boolean = false;

  constructor(
    private productCategoryService: ProductCategoryService,
    private CurrentUserService: CurrentUserService,
    private AuditLogService: AuditLogService
  ) {}

  ngOnInit() {
    this.getProductCategories();

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

  /////////////////////////// get functions //////////////////////////////////

  getProductCategories() {
    this.productCategoryService.getAllProductCategories().subscribe((res) => {
      this.productCategories = res;
      console.log('this is all the product categories');
      console.log(this.productCategories);
    });
  }

  ///////////////////////// add product category /////////////////////////////

  onSubmit() {
    if (this.productCategory.producT_CATEGORY_ID == 0) {
      this.productCategoryService
        .addProductCategory(this.productCategory)
        .subscribe((response) => {
          console.log(response);
          this.successSubmit = true;
        });
    } else {
      this.productCategoryService
        .updateProductCategory(this.productCategory)
        .subscribe((res) => {
          console.log('this is the updated category');
          console.log(res);
          this.successSubmit = true;
        });
    }
    //add to audit log
    this.AuditLogService.addAuditLog(this.auditLog).subscribe((res) => {
      console.log('new audit log entry');
      console.log(res);
      this.successSubmit = true;
    });
  }

  /////////////////////// validate functions //////////////////////////////

  FormValidate() {
    this.nameValidate();
    this.descriptionValidate();
  }

  nameValidate() {
    this.validCategory = this.validate.ValidateString(
      this.productCategory.categorY_NAME
    );
    this.compareName();
  }

  compareName() {
    this.productCategoriesTemp = this.productCategories;
    this.productCategoriesTemp = this.productCategoriesTemp.filter(
      (category) => {
        return category.categorY_NAME == this.productCategory.categorY_NAME;
      }
    );
    console.log(this.productCategoriesTemp);
    if (this.productCategoriesTemp.length > 0) {
      if (this.productCategoriesTemp[0].deleted) {
        this.productCategory.producT_CATEGORY_ID =
          this.productCategoriesTemp[0].producT_CATEGORY_ID;
      } else {
        this.uniqueCatName = false;
      }
    } else this.uniqueCatName = true;
  }

  descriptionValidate() {
    if (this.productCategory.categorY_DESCRIPTION == '') {
      this.validDescription = false;
    } else {
      this.validDescription = true;
    }
  }
}
