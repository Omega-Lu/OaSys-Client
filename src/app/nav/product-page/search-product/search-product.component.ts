import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/_services/product.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css'],
})
export class SearchProductComponent implements OnInit {
  @Output() return = new EventEmitter<string>();

  // products
  products: Product[] = [];
  productsTemp: Product[] = [];

  searchText: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe((response) => {
      this.products = response;
      this.productsTemp = response;
    });
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

  Return() {
    this.return.emit('false');
  }
}
