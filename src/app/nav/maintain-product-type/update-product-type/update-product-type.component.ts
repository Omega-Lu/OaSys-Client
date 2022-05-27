import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductType } from 'src/app/models/Product-Type.model';
import { ProductTypeService } from 'src/app/_services/product-type.service';

@Component({
  selector: 'app-update-product-type',
  templateUrl: './update-product-type.component.html',
  styleUrls: ['./update-product-type.component.css']
})
export class UpdateProductTypeComponent implements OnInit {

  @Input() productType: ProductType

  @Output() return = new EventEmitter<string>();

  details: boolean = true;

  successSubmit : boolean = false;

  constructor(private productTypeService: ProductTypeService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.productTypeService.updateProductType(this.productType).subscribe((response) => {
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
