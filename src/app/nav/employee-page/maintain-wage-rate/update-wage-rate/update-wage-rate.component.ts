import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Rate } from 'src/app/models/rate.model';
import { RateService } from 'src/app/_services/rate.service';
import { ValidationServicesComponent } from 'src/app/validation-services/validation-services.component';

@Component({
  selector: 'app-update-wage-rate',
  templateUrl: './update-wage-rate.component.html',
  styleUrls: ['./update-wage-rate.component.css'],
})
export class UpdateWageRateComponent implements OnInit {
  @Input() rate: Rate;

  @Output() return = new EventEmitter<string>();

  successSubmit: boolean = false;

  validMoney: boolean = true;
  validRateName: boolean = true;

  // import validation
  validate: ValidationServicesComponent = new ValidationServicesComponent();

  constructor(private rateService: RateService) {}

  ngOnInit() {}

  Return() {
    this.return.emit('false');
  }

  FormValidate() {
    //validate the money
    this.validateMoney();
  }

  onSubmit() {
    this.rateService.updateEmployee(this.rate).subscribe((response) => {
      console.log(response);
      this.successSubmit = true;
    });
  }

  validateMoney() {
    if (this.rate.ratE_AMOUNT == 0) {
      this.validMoney = false;
    } else this.validMoney = this.validate.ValidateMoney(this.rate.ratE_AMOUNT);
    console.log(this.validMoney);
  }
}
