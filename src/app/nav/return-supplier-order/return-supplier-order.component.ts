import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-return-supplier-order',
  templateUrl: './return-supplier-order.component.html',
  styleUrls: ['./return-supplier-order.component.css'],
})
export class ReturnSupplierOrderComponent implements OnInit {
  @Output() return = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}

  Return() {
    this.return.emit('false');
  }
}
