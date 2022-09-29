import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductType } from 'src/app/models/Product-Type.model';
import { ProductTypeService } from 'src/app/_services/product-type.service';
import { ProductCategoryService } from 'src/app/_services/product-category.service';
import { ProductCategory } from 'src/app/models/Product-Category.model';

//audit log
import { AuditLog } from 'src/app/models/AuditLog.model';
import { AuditLogService } from 'src/app/_services/AuditLog.service';
import { CurrentUserService } from 'src/app/_services/CurrentUser.service';

@Component({
  selector: 'app-update-product-type',
  templateUrl: './update-product-type.component.html',
  styleUrls: ['./update-product-type.component.css'],
})
export class UpdateProductTypeComponent implements OnInit {
  //product type
  @Input() productType: ProductType;
  productTypes: ProductType[] = [];
  productTypesTemp: ProductType[] = [];

  @Output() return = new EventEmitter<string>();

  //validation
  details: boolean = true;
  cdetails: boolean = true;

  //unique
  uniqueName: boolean = true;

  successSubmit: boolean = false;

  //product categories
  productCategory: ProductCategory;
  productCategories: ProductCategory[] = [];

  //audit log
  auditLog: AuditLog = {
    auditLogID: 0,
    userID: 0,
    employeeID: 0,
    functionUsed: 'Update Product Type',
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

    console.log(this.productType);
  }

  ////////////// get functions ///////////////////////////////////////////

  getAllProductCategories() {
    this.productCategoryService
      .getAllProductCategories()
      .subscribe((response) => {
        response = response.filter((res) => {
          return res.deleted == false;
        });
        this.productCategories = response;

        this.getProductTypes();
      });
  }

  getProductTypes() {
    this.productTypeService.getAllProductTypes().subscribe((res) => {
      this.productTypes = res;
      this.productTypesTemp = res;
    });
  }

  ////////////////// update product type //////////////////////////////

  onSubmit() {
    this.productTypeService
      .updateProductType(this.productType)
      .subscribe((response) => {
        console.log(response);

        //add to audit log
        this.AuditLogService.addAuditLog(this.auditLog).subscribe((res) => {
          console.log('new audit log entry');
          console.log(res);
          this.successSubmit = true;
        });
      });
  }

  ///////////////// validation ///////////////////////////////////////////

  categoryValidate() {
    if (this.productType.producT_CATEGORY_ID == -1) this.cdetails = false;
    else this.cdetails = true;
  }

  nameValidate() {
    if (this.productType.typE_NAME == '') this.details = false;
    else this.details = true;
    this.compareName();
  }

  compareName() {
    this.productTypesTemp = this.productTypes;
    this.productTypesTemp = this.productTypesTemp.filter((temp) => {
      return (
        temp.producT_CATEGORY_ID == this.productType.producT_CATEGORY_ID &&
        temp.typE_NAME == this.productType.typE_NAME
      );
    });

    if (
      this.productTypesTemp.length > 0 &&
      this.productTypesTemp[0].producT_TYPE_ID !=
        this.productType.producT_TYPE_ID
    )
      this.uniqueName = false;
    else this.uniqueName = true;
  }

  Return() {
    this.return.emit('false');
  }
}
