import { Component, OnInit } from '@angular/core';
import { WarningType } from 'src/app/models/warning-type.model';
import { WarningTypeService } from 'src/app/_services/warning-type.service';
import { ValidationServicesComponent } from 'src/app/validation-services/validation-services.component';

@Component({
  selector: 'app-add-warning-type',
  templateUrl: './add-warning-type.component.html',
  styleUrls: ['./add-warning-type.component.css'],
})
export class AddWarningTypeComponent implements OnInit {
  //import validation
  validate: ValidationServicesComponent = new ValidationServicesComponent();

  successSubmit: boolean = false;
  validWarning: boolean = true;

  warningType: WarningType = {
    warninG_TYPE_ID: 0,
    description: '',
  };

  constructor(private warningTypeService: WarningTypeService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.warningTypeService
      .addEmployee(this.warningType)
      .subscribe((response) => {
        console.log(response);
        this.successSubmit = true;
      });
  }

  validateName() {
    this.validWarning = this.validate.ValidateString(
      this.warningType.description
    );
  }
}
