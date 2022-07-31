import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { Sale } from 'src/app/models/sale.model';
import { ProductService } from '../../_services/product.service';

@Component({
  selector: 'app-search-sale',
  templateUrl: './search-sale.component.html',
  styleUrls: ['./search-sale.component.css']
})
export class SearchSaleComponent implements OnInit {
  sales: Sale[] = []
  sale: Sale;
  products: Product[] = []
  viewSale: boolean = false
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(){
    this.productService.getAllProducts().subscribe((response)=>{
      this.products = response;
    })
  }

  Return(){

  }
}
