import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { WarningType } from 'src/app/models/warning-type.model';
import { WarningTypeService } from 'src/app/_services/warning-type.service';

@Component({
  selector: 'app-search-warning-type',
  templateUrl: './search-warning-type.component.html',
  styleUrls: ['./search-warning-type.component.css'],
})
export class SearchWarningTypeComponent implements OnInit {
  @Output() return = new EventEmitter<string>();

  //warning types
  warningtypes: WarningType[] = [];
  warningTypesTemp: WarningType[] = [];

  searchText: string = '';

  //help pdf
  pdfPath = 'https://localhost:7113/Resources/pdfs/Search warning type.pdf';
  displayPDF: boolean = false;

  constructor(private warningtypesService: WarningTypeService) {}

  ngOnInit(): void {
    this.getAllEmployees();
  }

  ////////////// pdf functions ///////////////////////////////
  @ViewChild(PdfViewerComponent) private pdfComponent: PdfViewerComponent;
  search(stringToSearch: string) {
    this.pdfComponent.eventBus.dispatch('find', {
      query: stringToSearch,
      type: 'again',
      caseSensitive: false,
      findPrevious: undefined,
      highlightAll: true,
      phraseSearch: true,
    });
  }

  getAllEmployees() {
    this.warningtypesService.getAllEmployees().subscribe((response) => {
      response = response.filter((temp) => {
        return temp.deleted == false;
      });
      this.warningtypes = response;
      this.warningTypesTemp = response;
      console.log(this.warningtypes);
    });
  }

  Search() {
    this.warningTypesTemp = this.warningtypes;
    if (this.searchText !== '') {
      this.warningTypesTemp = this.warningTypesTemp.filter((warning) => {
        return warning.description.match(this.searchText);
      });
    }
  }

  Return() {
    this.return.emit('false');
  }
}
