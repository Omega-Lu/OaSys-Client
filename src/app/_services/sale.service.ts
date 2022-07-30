import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SaleService {


  public saleItemList: any = []
  public productList = new BehaviorSubject<any>([])
  constructor(private http: HttpClient){}

  getProduct(){
    return this.http.get<any>('https://localhost:7113/api/Product')
    .pipe(map((res:any) => {
      return res
    }))
  }

  setProduct(product: any){
    this.saleItemList.push(...product)
    this.productList.next(product)
  }

  addItems(product: any){
    this.saleItemList.push(product)
    this.productList.next(this.saleItemList)
    this.getTotalPrice();
  }

  getTotalPrice() : number{
    let totalAmount = 0;
    this.saleItemList.map((a:any)=>{
      totalAmount += a.total;
    })
    return totalAmount;
  }
  removeSaleItem(product:any){
    this.saleItemList.map((a:any, index:any)=>{
      if(product.id === a.id){
        this.saleItemList.splice(index,1)
      }
    })
  }
  removeAllSaleItems(){
    this.saleItemList = []
    this.productList.next(this.saleItemList)
  }
}
