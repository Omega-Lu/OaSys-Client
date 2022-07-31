import { SaleProduct } from './../../models/SaleProduct.model';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SaleService } from '../../_services/sale.service';
import { Product } from '../../models/product.model';
import { Sale } from '../../models/sale.model';
import { ProductService } from '../../_services/product.service';
import { FormGroup } from '@angular/forms';
import { ProductCategoryService } from '../../_services/product-category.service';
import { elementAt } from 'rxjs';
import { ProductTypeService } from '../../_services/product-type.service';

@Component({
  selector: 'app-make-sale',
  templateUrl: './make-sale.component.html',
  styleUrls: ['./make-sale.component.css']
})
export class MakeSaleComponent implements OnInit {
  @Input() sale: Sale
  @Output() return = new EventEmitter<string>()

  products: Product[] = []
  searchText : string = ''
  successSubmit : boolean = false;
  activeQuantity: boolean = false;

  Product: Product = {
    producT_ID: 0,
    producT_NAME: '',
    producT_CATEGORY_ID: 0,
    producT_DESCRIPTION: '',
    producT_TYPE_ID: 0,
    quantitY_ON_HAND: 0,
    cosT_PRICE: 0,
    sellinG_PRICE: 0,
    reordeR_LIMIT: 0

  }

  saleProduct: SaleProduct = {
    SaleID: 0,
  ProductID: 0,
  Quantity: 0,
  }



  /*Product: any = []
  product: Product;
  dataSource: any = [];
  products:any = [];
  price:any
  totalAmount : number;
  responseMessage:any;
  manageOrderForm: any = FormGroup
  public productList : any;*/

  constructor(private saleService : SaleService,
    private productService: ProductService,
    private productCategoryService: ProductCategoryService,
    private productTypeService: ProductTypeService
    ) { }

  ngOnInit(): void {

    this.getAllProducts()


    /*this.saleService.getProduct().subscribe((res)=>{
      this.product = res;
      this.totalAmount = this.saleService.getTotalPrice();
    })*/
  }

  getAllProducts(){
    this.productService.getAllProducts().subscribe((response)=>{
      this.products = response;
      console.log(this.products)
    })
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
