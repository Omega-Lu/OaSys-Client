import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductType } from 'src/app/models/Product-Type.model';
import { ProductTypeService } from 'src/app/_services/product-type.service';

@Component({
  selector: 'app-add-product-type',
  templateUrl: './add-product-type.component.html',
  styleUrls: ['./add-product-type.component.css']
})
export class AddProductTypeComponent implements OnInit {

  @Output() return = new EventEmitter<string>();

  details: boolean = true;

  successSubmit : boolean = false;

  productType: ProductType = {
    producT_TYPE_ID: 0,
    producT_CATEGORY_ID: 0,
    typE_NAME: ""
  }

  constructor(private productTypeService: ProductTypeService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.productTypeService.addProductType(this.productType).subscribe((response) => {
      console.log(response);
    });
    this.successSubmit = true;
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
  }

  Return() {
    this.return.emit('false');
  }

}
