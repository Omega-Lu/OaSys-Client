import { Component, Input, OnInit } from '@angular/core';
import { Rate } from 'src/app/models/rate.model';
import { RateService } from 'src/app/_services/rate.service';

@Component({
  selector: 'app-update-wage-rate',
  templateUrl: './update-wage-rate.component.html',
  styleUrls: ['./update-wage-rate.component.css']
})
export class UpdateWageRateComponent implements OnInit {
  @Input() rate : Rate;

  constructor(private rateService: RateService) { }

  ngOnInit(): void {
  }
  onSubmit() {
    this.rateService.updateEmployee(this.rate)
    .subscribe( response => {
      console.log(response);
    })
  }

}
