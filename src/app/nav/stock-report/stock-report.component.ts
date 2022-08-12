import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/_services/product.service';
import { CurrentUser } from 'src/app/models/CurrentUser.model';
import { CurrentUserService } from 'src/app/_services/CurrentUser.service';

@Component({
  selector: 'app-stock-report',
  templateUrl: './stock-report.component.html',
  styleUrls: ['./stock-report.component.css'],
})
export class StockReportComponent implements OnInit {
  @Output() return = new EventEmitter<string>();

  product: Product;
  products: Product[] = [];
  productsTemp: Product[] = [];

  Date: Date = new Date();

  currentUser: CurrentUser;
  currentUsers: CurrentUser[] = [];
  currentUsersTemp: CurrentUser[] = [];

  constructor(
    private productService: ProductService,
    private currentUserService: CurrentUserService
  ) {}

  async ngOnInit() {
    await this.getAllCurrentUsers();
    await this.getAllProducts();
    await this.sleep(200);

    this.buildTable();
  }

  buildTable() {
    this.productsTemp = this.products;
  }

  sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  async getAllProducts() {
    this.productService.getAllProducts().subscribe((repsonse) => {
      this.products = repsonse;
      console.log('this is all the products');
      console.log(this.products);
    });
  }

  async getAllCurrentUsers() {
    this.currentUserService.getAllCurrentUsers().subscribe((response) => {
      this.currentUsers = response;
      console.log('this is the current user for stock report');
      this.currentUser = this.currentUsers[this.currentUsers.length - 1];
      console.log(this.currentUser);
    });
  }
  Return() {
    this.return.emit('false');
  }
}
