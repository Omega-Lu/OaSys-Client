import { Component, OnInit, EventEmitter } from '@angular/core';

import { Vat } from 'src/app/models/Vat.model';
import { VatService } from 'src/app/_services/Vat.service';

@Component({
  selector: 'app-maintain-vat',
  templateUrl: './maintain-vat.component.html',
  styleUrls: ['./maintain-vat.component.css'],
})
export class MaintainVatComponent implements OnInit {
  //vat
  vat: Vat;
  vats: Vat[] = [];
  vatsTemp: Vat[] = [];

  updateVAT: boolean = false;

  constructor(private vatService: VatService) {}

  ngOnInit(): void {
    this.vatService.getAllVatses().subscribe((res) => {
      this.vats = res;
      this.vatsTemp = res;
    });
  }

  back() {
    this.updateVAT = false;
    this.ngOnInit();
  }
}
