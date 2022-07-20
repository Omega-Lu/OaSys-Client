import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-supplier-order',
  templateUrl: './search-supplier-order.component.html',
  styleUrls: ['./search-supplier-order.component.css'],
})
export class SearchSupplierOrderComponent implements OnInit {
  @Output() return = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}

  Return() {
    this.return.emit('false');
  }
}
