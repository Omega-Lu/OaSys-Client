import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-reorder-list',
  templateUrl: './reorder-list.component.html',
  styleUrls: ['./reorder-list.component.css'],
})
export class ReorderListComponent implements OnInit {
  @Output() return = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}

  Return() {
    this.return.emit('false');
  }
}
