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
      console.log(this.productTypes);
    });
  }

  Search() {
    if (this.searchText !== '') {
      let searchValue = this.searchText;
      console.log(searchValue);
      this.productTypes = this.productTypes.filter((productType) => {
        console.log(productType.typE_NAME.match(searchValue));
        return productType.typE_NAME.match(searchValue);
      });
    } else {
      this.getAllProductTypes();
    }
  }

  back() {
    this.return.emit('false');
  }
}
