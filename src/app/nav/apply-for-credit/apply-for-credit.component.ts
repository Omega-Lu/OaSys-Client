import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-apply-for-credit',
  templateUrl: './apply-for-credit.component.html',
  styleUrls: ['./apply-for-credit.component.css']
})
export class ApplyForCreditComponent implements OnInit {
  @Output() return = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  Return(){
    this.return.emit('false')
  }

}
