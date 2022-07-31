import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Sale } from '../../../models/sale.model';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-view-sale',
  templateUrl: './view-sale.component.html',
  styleUrls: ['./view-sale.component.css']
})
export class ViewSaleComponent implements OnInit {

  @Output() return = new EventEmitter<string>();
  sale : Sale;
  sales: Sale[] = []

  product: Product;
  products: Product[] = []
  constructor() { }

  ngOnInit(): void {
  }

  Return(){
    this.return.emit('false')
  }

}
