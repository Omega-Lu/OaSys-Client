import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SaleService } from '../../_services/sale.service';
import { Product } from '../../models/product.model';
import { Sale } from '../../models/sale.model';
import { ProductService } from '../../_services/product.service';
import { FormGroup } from '@angular/forms';
import { ProductCategoryService } from '../../_services/product-category.service';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-make-sale',
  templateUrl: './make-sale.component.html',
  styleUrls: ['./make-sale.component.css']
})
export class MakeSaleComponent implements OnInit {

  @Output() return = new EventEmitter<string>()

  Product: any = []
  product: Product;
  dataSource: any = [];
  products:any = [];
  price:any
  totalAmount : number;
  responseMessage:any;
  manageOrderForm: any = FormGroup
  public productList : any;

  constructor(private saleService : SaleService,
    private productService: ProductService,
    private productCategoryService: ProductCategoryService
    ) { }

  ngOnInit(): void {
    this.saleService.getProduct().subscribe((res)=>{
      this.product = res;
      this.totalAmount = this.saleService.getTotalPrice();
    })
  }

  sendData(event: any) {
    console.log(event.target.value);
  }

  /*getProducts(event:any){
    this.productService.getAllProducts().subscribe((response:any) =>{
      this.products = response;
      this.manageOrderForm.controls['price'].setValue('')
      this.manageOrderForm.controls['quantity'].setValue('')
      this.manageOrderForm.controls['total'].setValue(0)
    })
  }

  setQuantity(){
    var temp = this.manageOrderForm.controls['quantity'].value;
    if(temp > 0) {
      this.manageOrderForm.controls['total'].setValue(this.manageOrderForm.controls['quantity'].value * this.manageOrderForm.controls['price'].value)
    }else if(temp != '')
    {
      this.manageOrderForm.controls['quantity'].setValue('1');
      this.manageOrderForm.controls['total'].setValue(this.manageOrderForm.controls['quantity'].value * this.manageOrderForm.controls['price'].value)

    }
  }

  validateProductAdd(){
    if(this.manageOrderForm.controls['total'].value == 0 || this.manageOrderForm.controls['total'].value == null || this.manageOrderForm.controls['quantity'].value <= 0)
    return true;
    else
    return false;
  }

  validateSubmit(){
    if(this.totalAmount === 0 || this.manageOrderForm.controls['name'].value === null || this.manageOrderForm.controls['email'].value === null || this.manageOrderForm.controls['contactNumber'].value === null || this.manageOrderForm.controls['paymentMethod'].value === null || !(this.manageOrderForm.controls['paymentMethod'].valid) || !(this.manageOrderForm.controls['paymentMethod'].valid))
    return true;
    else
    return false
  }

  add(){
    var formData = this.manageOrderForm.value;
    var productName = this.dataSource.find((e:{id:number})=> e.id == formData.product.id);
    if(productName === undefined){
      this.totalAmount = this.totalAmount + formData.total;
      this.dataSource.push({id:formData.product.id,
        name:formData.product.name,
        quantity:formData.quantity,
        price:formData.price,
        total:formData.total})
    }
    this.dataSource = [...this.dataSource]
  }

  handleActionDelete(value:any,element:any){
    this.totalAmount = this.totalAmount - element.total
    this.dataSource.splice(value,1)
    this.dataSource = [...this.dataSource]

  }

  submitAction(){
    var formData = this.manageOrderForm.value;
    var data ={
      name:formData.name,
      paymentMethod:formData.paymentMethod,
      totalAmount:formData.totalAmount,

    }
  }*/


  Return(){
    this.return.emit('false')
  }

}
