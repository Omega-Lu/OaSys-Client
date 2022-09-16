import { Component, OnInit } from '@angular/core';
import { ProductType } from 'src/app/models/Product-Type.model';
import { ProductTypeService } from 'src/app/_services/product-type.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-maintain-product-type',
  templateUrl: './maintain-product-type.component.html',
  styleUrls: ['./maintain-product-type.component.css'],
})
export class MaintainProductTypeComponent implements OnInit {
  @Output() return = new EventEmitter<string>();

  updateProductType: boolean = false;
  successDelete: boolean = false;

  //product Type
  productTypesTemp: ProductType[] = [];
  productTypes: ProductType[] = [];
  productType: ProductType;

  searchText: string = '';

  deletenumber: any;

  constructor(private productTypeService: ProductTypeService) {}

  ngOnInit(): void {
    this.getAllProductTypes();
  }

  deletee(delet: any) {
    this.deletenumber = delet;
  }

  deleteProductType() {
    this.productTypeService
      .deleteProductType(this.deletenumber)
      .subscribe((response) => {
        this.deleteProductType();
        console.log(this.productType);
        this.successDelete = true;
      });
  }

  populateForm(productType: ProductType) {
    this.productType = productType;
    this.updateProductType = true;
  }

  getAllProductTypes() {
    this.productTypeService.getAllProductTypes().subscribe((response) => {
      this.productTypes = response;
      this.productTypesTemp = response;
    });
  }

  Search() {
    this.productTypesTemp = this.productTypes;
    if (this.searchText !== '') {
      this.productTypesTemp = this.productTypesTemp.filter((productType) => {
        return productType.typE_NAME.match(this.searchText);
      });
    }
  }

  back() {
    this.updateProductType = false;
    this.return.emit('false');
    this.getAllProductTypes();
  }
}
