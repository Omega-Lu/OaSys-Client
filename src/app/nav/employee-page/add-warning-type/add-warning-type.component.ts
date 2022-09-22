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

  //warning type
  warningType: WarningType = {
    warninG_TYPE_ID: 0,
    description: '',
    deleted: false,
  };
  warningTypes: WarningType[] = [];
  warningTypesTemp: WarningType[] = [];

  //unique Vaiables
  uniqueName: boolean = true;

  constructor(private warningTypeService: WarningTypeService) {}

  ngOnInit(): void {
    this.warningTypeService.getAllEmployees().subscribe((res) => {
      console.log('this is all the warning types');
      console.log(res);
      this.warningTypes = res;
    });
  }

  FormValidate() {
    this.validateName();
  }

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
    this.compareName();
  }

  compareName() {
    this.warningTypesTemp = this.warningTypes;
    this.warningTypesTemp = this.warningTypesTemp.filter((type) => {
      return type.description == this.warningType.description;
    });

    if (this.warningTypesTemp.length > 0) this.uniqueName = false;
    else this.uniqueName = true;
  }
}
