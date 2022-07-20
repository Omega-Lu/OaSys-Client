import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-receive-supplier-order',
  templateUrl: './receive-supplier-order.component.html',
  styleUrls: ['./receive-supplier-order.component.css'],
})
export class ReceiveSupplierOrderComponent implements OnInit {
  @Output() return = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}

  Return() {
    this.return.emit('false');
  }
}
