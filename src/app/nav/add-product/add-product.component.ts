import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  @Output() return = new EventEmitter<string>();

  details: boolean = true;
  pdetails: boolean = true;
  successSubmit: boolean = false;

  product: Product = {
    producT_ID: 0,
    producT_CATEGORY_ID: 0,
    producT_NAME : "",
    producT_DESCRIPTION : "",
    quantitY_ON_HAND : 0,
    cosT_PRICE : 0,
    sellinG_PRICE : 0,
    reordeR_LIMIT : 0
  }

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.productService.addProduct(this.product).subscribe((response) => {
      console.log(response);
    });
    this.successSubmit = true;
  }

  namevalidate() {
    var matches = this.product.producT_NAME.match(/\d+/g);
    if (matches != null) {
     this.details = false;
    } else if (this.product.producT_NAME == '') {
     this.details = false;
    } else {
      this.details = true;
    }
  }

  survalidate() {
    var matches = this.product.producT_DESCRIPTION.match(/\d+/g);
    if (matches != null) {
     this.pdetails = false;
    } else if (this.product.producT_DESCRIPTION == '') {
     this.pdetails = false;
    } else {
      this.pdetails = true;
    }

  }

  Return() {
    this.return.emit('false');
  }

}
