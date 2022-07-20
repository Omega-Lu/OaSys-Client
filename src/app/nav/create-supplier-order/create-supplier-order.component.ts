import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-create-supplier-order',
  templateUrl: './create-supplier-order.component.html',
  styleUrls: ['./create-supplier-order.component.css'],
})
export class CreateSupplierOrderComponent implements OnInit {
  @Output() return = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}
  Return() {
    this.return.emit('false');
  }
}
