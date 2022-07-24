import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-view-debtors-account',
  templateUrl: './view-debtors-account.component.html',
  styleUrls: ['./view-debtors-account.component.css']
})
export class ViewDebtorsAccountComponent implements OnInit {
  @Output() return = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  Return(){
    this.return.emit('false')
  }

}
