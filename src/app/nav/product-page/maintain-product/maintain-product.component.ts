import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/_services/product.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-maintain-product',
  templateUrl: './maintain-product.component.html',
  styleUrls: ['./maintain-product.component.css'],
})
export class MaintainProductComponent implements OnInit {
  @Output() return = new EventEmitter<string>();

  updateProduct: boolean = false;
  successDelete: boolean = false;

  // products
  productsTemp: Product[] = [];
  products: Product[] = [];
  product: Product;

  searchText: string = '';

  deletenumber: any;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  deletee(delet: any) {
    this.deletenumber = delet;
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe((response) => {
      this.products = response;
      this.productsTemp = response;
    });
  }

  deleteSupplier() {
    this.productService
      .deleteProduct(this.deletenumber)
      .subscribe((response) => {
        this.getAllProducts();
        console.log(this.product);
        this.successDelete = true;
      });
  }

  populateForm(product: Product) {
    this.product = product;
    this.updateProduct = true;
  }

  Search() {
    this.productsTemp = this.products;
    if (this.searchText !== '') {
      this.productsTemp = this.productsTemp.filter((product) => {
        return (
          product.producT_NAME.match(this.searchText) ||
          product.producT_DESCRIPTION.match(this.searchText)
        );
      });
    }
  }

  back() {
    this.updateProduct = false;
    this.return.emit('false');
    this.getAllProducts();
  }
}
