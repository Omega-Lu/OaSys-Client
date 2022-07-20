import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-complete-stocktake',
  templateUrl: './complete-stocktake.component.html',
  styleUrls: ['./complete-stocktake.component.css'],
})
export class CompleteStocktakeComponent implements OnInit {
  @Output() return = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}

  Return() {
    this.return.emit('false');
  }
}
