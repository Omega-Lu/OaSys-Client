import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
})
export class UpdateProductComponent implements OnInit {
  @Input() product: Product;

  @Output() return = new EventEmitter<string>();

  details: boolean = true;
  pdetails: boolean = true;
  successSubmit: boolean = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    console.log(this.product);
  }

  onSubmit() {
    this.productService.updateProduct(this.product).subscribe((response) => {
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
