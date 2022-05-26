import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/_services/product.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent implements OnInit {

  @Output() return = new EventEmitter<string>();

  products: Product[] = [];
  searchText: string = '';

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getAllProducts()
    .subscribe(
      response => {
        this.products = response;
        console.log(this.products);
      }
    );
  }

  Search() {
    if(this.searchText !== ""){
      let searchValue = this.searchText
      console.log(searchValue);
      this.products = this.products.filter((product) =>{
        console.log(product.producT_NAME.match(searchValue));
        return product.producT_NAME.match(searchValue);  
      
            });
          }
    else {
      this.getAllProducts();
    }
  }

  Return(){
    this.return.emit("false");
  }

}
