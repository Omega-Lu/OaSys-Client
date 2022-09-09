import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { WarningType } from 'src/app/models/warning-type.model';
import { WarningTypeService } from 'src/app/_services/warning-type.service';
import { ValidationServicesComponent } from 'src/app/validation-services/validation-services.component';

@Component({
  selector: 'app-update-warning-type',
  templateUrl: './update-warning-type.component.html',
  styleUrls: ['./update-warning-type.component.css'],
})
export class UpdateWarningTypeComponent implements OnInit {
  @Input() warningType: WarningType;

  @Output() return = new EventEmitter<string>();
  //import validation
  validate: ValidationServicesComponent = new ValidationServicesComponent();

  successSubmit: boolean = false;
  validWarning: boolean = true;

  constructor(private warningTypeService: WarningTypeService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.warningTypeService
      .updateEmployee(this.warningType)
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

  Return() {
    this.return.emit('false');
  }
}
