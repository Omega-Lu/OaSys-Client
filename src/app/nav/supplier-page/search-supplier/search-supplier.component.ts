import { Component, OnInit, ViewChild } from '@angular/core';
import { Supplier } from 'src/app/models/supplier.model';
import { SupplierService } from 'src/app/_services/supplier.service';
import { Output, EventEmitter } from '@angular/core';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-search-supplier',
  templateUrl: './search-supplier.component.html',
  styleUrls: ['./search-supplier.component.css'],
})
export class SearchSupplierComponent implements OnInit {
  @Output() return = new EventEmitter<string>();
  //title = 'employees';
  suppliers: Supplier[] = [];
  searchText: string = '';

  //help pdf
  pdfPath = 'https://localhost:7113/Resources/pdfs/Search supplier.pdf';
  displayPDF: boolean = false;

  constructor(private supplierService: SupplierService) {}

  ngOnInit(): void {
    this.getAllSuppliers();
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

  getAllSuppliers() {
    this.supplierService.getAllSuppliers().subscribe((response) => {
      this.suppliers = response;
      console.log(this.suppliers);
    });
  }

  Search() {
    if (this.searchText !== '') {
      let searchValue = this.searchText;
      console.log(searchValue);
      this.suppliers = this.suppliers.filter((supplier) => {
        console.log(supplier.name.match(searchValue));
        return supplier.name.match(searchValue);
      });
    } else {
      this.getAllSuppliers();
    }
  }

  Return() {
    this.return.emit('false');
  }
}
