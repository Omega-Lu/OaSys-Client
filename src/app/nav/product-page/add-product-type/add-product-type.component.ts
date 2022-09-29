import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductType } from 'src/app/models/Product-Type.model';
import { ProductTypeService } from 'src/app/_services/product-type.service';
import { ProductCategoryService } from 'src/app/_services/product-category.service';
import { ProductCategory } from 'src/app/models/Product-Category.model';

//audit log
import { AuditLog } from 'src/app/models/AuditLog.model';
import { AuditLogService } from 'src/app/_services/AuditLog.service';
import { CurrentUserService } from 'src/app/_services/CurrentUser.service';

@Component({
  selector: 'app-add-product-type',
  templateUrl: './add-product-type.component.html',
  styleUrls: ['./add-product-type.component.css'],
})
export class AddProductTypeComponent implements OnInit {
  @Output() return = new EventEmitter<string>();

  //validation
  details: boolean = true;
  cdetails: boolean = true;
  uniqueName: boolean = true;

  successSubmit: boolean = false;

  //product Category
  productCategory: ProductCategory;
  productCategories: ProductCategory[] = [];

  //product Type
  productType: ProductType = {
    producT_TYPE_ID: 0,
    producT_CATEGORY_ID: -1,
    typE_NAME: '',
    deleted: false,
  };
  productTypes: ProductType[] = [];
  productTypesTemp: ProductType[] = [];

  //audit log
  auditLog: AuditLog = {
    auditLogID: 0,
    userID: 0,
    employeeID: 0,
    functionUsed: 'Add Product Type',
    date: new Date(),
    month: 'Oct',
  };

  constructor(
    private productTypeService: ProductTypeService,
    private productCategoryService: ProductCategoryService,
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

  /////////////////// get functions //////////////////////////////////

  getAllProductCategories() {
    this.productCategoryService
      .getAllProductCategories()
      .subscribe((response) => {
        response = response.filter((type) => {
          return type.deleted == false;
        });
        this.productCategories = response;
        console.log(this.productCategories);
        this.getProductTypes();
      });
  }

  getProductTypes() {
    this.productTypeService.getAllProductTypes().subscribe((res) => {
      this.productTypes = res;
    });
  }

  ///////////////// add product type //////////////////////////////////

  onSubmit() {
    if (this.productType.producT_TYPE_ID == 0) {
      this.productTypeService
        .addProductType(this.productType)
        .subscribe((response) => {
          console.log(response);
          this.successSubmit = true;
        });
    } else {
      this.productTypeService
        .updateProductType(this.productType)
        .subscribe((res) => {
          console.log('this is the updated product');
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

  FormValidate() {
    this.categoryValidate();
    this.namevalidate();
    this.compareNames();
  }

  categoryValidate() {
    if (this.productType.producT_CATEGORY_ID == -1) {
      this.cdetails = false;
    } else this.cdetails = true;
  }

  namevalidate() {
    var matches = this.productType.typE_NAME.match(/\d+/g);
    if (matches != null) {
      this.details = false;
    } else if (this.productType.typE_NAME == '') {
      this.details = false;
    } else {
      this.details = true;
    }
    this.compareNames();
  }

  compareNames() {
    this.productTypesTemp = this.productTypes;
    this.productTypesTemp = this.productTypesTemp.filter((type) => {
      return type.producT_CATEGORY_ID == this.productType.producT_CATEGORY_ID;
    });
    this.productTypesTemp = this.productTypesTemp.filter((type) => {
      return type.typE_NAME == this.productType.typE_NAME;
    });
    if (this.productTypesTemp.length > 0) {
      if (this.productTypesTemp[0].deleted) {
        this.productType.producT_TYPE_ID =
          this.productTypesTemp[0].producT_TYPE_ID;
      } else {
        this.uniqueName = false;
      }
    } else this.uniqueName = true;
  }

  Return() {
    this.return.emit('false');
  }
}
