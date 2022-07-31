import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { Sale } from '../models/sale.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  model: any

  baseUrl: 'https://localhost:7113/api/Sales'

  ///public saleItemList: any = []
  //public productList = new BehaviorSubject<any>([])

  constructor(private http: HttpClient){}

  getAllSales() : Observable<Sale[]>{
    this.model = this.http.get<Sale[]>(this.baseUrl)
    return this.http.get<Sale[]>(this.baseUrl)
  }

  addSale(sale: Sale) : Observable<Sale>{
    return this.http.post<Sale>(this.baseUrl, sale)
  }

  updateSale(sale : Sale): Observable<Sale>{
    return this.http.put<Sale>(this.baseUrl + '/' + sale.Sale_ID, sale)
  }

  deleteSale(id: number) : Observable<Sale>{
    return this.http.delete<Sale>(this.baseUrl + '/' + id)
  }

  searchProducts(query: string){
    this.http.post<{payload: string}>(this.baseUrl, {payload: query}, {
      headers: new HttpHeaders({'Content-Type': 'Product'})
    }).pipe(
      map(data => data.payload)
    )
  }

  /*getProduct(){
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
  */
}
