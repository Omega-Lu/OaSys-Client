import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductCategory } from 'src/app/models/Product-Category.model';
import { ProductCategoryService } from 'src/app/_services/product-category.service';
import { ValidationServicesComponent } from 'src/app/validation-services/validation-services.component';

//audit log
import { AuditLog } from 'src/app/models/AuditLog.model';
import { AuditLogService } from 'src/app/_services/AuditLog.service';
import { CurrentUserService } from 'src/app/_services/CurrentUser.service';

@Component({
  selector: 'app-update-product-category',
  templateUrl: './update-product-category.component.html',
  styleUrls: ['./update-product-category.component.css'],
})
export class UpdateProductCategoryComponent implements OnInit {
  //product category
  @Input() productCategory: ProductCategory;
  productCategories: ProductCategory[] = [];
  productCategoriesTemp: ProductCategory[] = [];

  @Output() return = new EventEmitter<string>();

  //validation
  details: boolean = true;
  sdetails: boolean = true;
  uniqueName: boolean = true;

  successSubmit: boolean = false;

  //audit log
  auditLog: AuditLog = {
    auditLogID: 0,
    userID: 0,
    employeeID: 0,
    functionUsed: 'Update Product Category',
    date: new Date(),
    month: 'Oct',
  };

  constructor(
    private productCategoryService: ProductCategoryService,
    private CurrentUserService: CurrentUserService,
    private AuditLogService: AuditLogService
  ) {}

  ngOnInit(): void {
    console.log(this.productCategory);
    this.productCategoryService.getAllProductCategories().subscribe((res) => {
      this.productCategories = res;
      this.productCategoriesTemp = res;
    });

    this.CurrentUserService.getAllCurrentUsers().subscribe((res) => {
      this.auditLog.userID = res[res.length - 1].userID;
      this.auditLog.employeeID = res[res.length - 1].employeeID;
    });
  }

  onSubmit() {
    this.productCategoryService
      .updateProductCategory(this.productCategory)
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

  FormValidate() {
    this.namevalidate();
    this.survalidate();
  }

  namevalidate() {
    if (this.productCategory.categorY_NAME == '') this.details = false;
    else this.details = true;
    this.compareName();
  }

  compareName() {
    this.productCategoriesTemp = this.productCategories.filter((temp) => {
      return temp.categorY_NAME == this.productCategory.categorY_NAME;
    });
    if (
      this.productCategoriesTemp.length > 0 &&
      this.productCategory.producT_CATEGORY_ID !=
        this.productCategoriesTemp[0].producT_CATEGORY_ID
    )
      this.uniqueName = false;
    else this.uniqueName = true;
  }

  survalidate() {
    if (this.productCategory.categorY_DESCRIPTION == '') this.sdetails = false;
    else this.sdetails = true;
  }

  Return() {
    this.return.emit('false');
  }
}
