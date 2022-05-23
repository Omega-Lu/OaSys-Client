import { Component, OnInit } from '@angular/core';
import { Rate } from 'src/app/models/rate.model';
import { RateService } from 'src/app/_services/rate.service';

@Component({
  selector: 'app-add-wage-rate',
  templateUrl: './add-wage-rate.component.html'
})
export class AddWageRateComponent implements OnInit {

  rate: Rate = {
    ratE_ID: 0,
    ratE_NAME: "",
    ratE_AMOUNT: 0
  }

  constructor(private rateService: RateService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.rateService.addEmployee(this.rate).subscribe(response =>{
      console.log(response);
    })
    
  }


}
