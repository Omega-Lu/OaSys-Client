import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { Sale } from '../../models/sale.model';
import { SaleReturnService } from 'src/app/_services/SaleReturn.service';
import { SaleReturn } from '../../models/SaleReturn.model';

@Component({
  selector: 'app-return-sale',
  templateUrl: './return-sale.component.html',
  styleUrls: ['./return-sale.component.css']
})
export class ReturnSaleComponent implements OnInit {

  product: Product;
  products: Product[] = [];
  saleReturn : SaleReturn
  saleReturns: SaleReturn[] = []
  sale: Sale;
  sales: Sale[] = []
  constructor(private saleReturnService: SaleReturnService) { }

  ngOnInit(): void {
    this.getAllSaleReturns()
  }

  getAllSaleReturns(){
    this.saleReturnService.getAllSaleReturns().subscribe((response) =>{
      this.saleReturns = response;
    })
  }

}
