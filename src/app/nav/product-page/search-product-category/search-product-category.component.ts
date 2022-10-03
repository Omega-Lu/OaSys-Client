import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductCategory } from 'src/app/models/Product-Category.model';
import { ProductCategoryService } from 'src/app/_services/product-category.service';
import { Output, EventEmitter } from '@angular/core';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-search-product-category',
  templateUrl: './search-product-category.component.html',
  styleUrls: ['./search-product-category.component.css'],
})
export class SearchProductCategoryComponent implements OnInit {
  @Output() return = new EventEmitter<string>();

  //product category
  productCategories: ProductCategory[] = [];
  productCategoriesTemp: ProductCategory[] = [];

  searchText: string = '';

  //help pdf
  pdfPath = 'https://localhost:7113/Resources/pdfs/Search product category.pdf';
  displayPDF: boolean = false;

  constructor(private productCategoryService: ProductCategoryService) {}

  ngOnInit(): void {
    this.getAllProductCategories();
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

  getAllProductCategories() {
    this.productCategoryService
      .getAllProductCategories()
      .subscribe((response) => {
        response = response.filter((temp) => {
          return temp.deleted == false;
        });
        this.productCategories = response;
        this.productCategoriesTemp = response;
      });
  }

  Search() {
    this.productCategoriesTemp = this.productCategories;
    if (this.searchText !== '') {
      this.productCategoriesTemp = this.productCategoriesTemp.filter(
        (product) => {
          return (
            product.categorY_NAME.match(this.searchText) ||
            product.categorY_DESCRIPTION.match(this.searchText)
          );
        }
      );
    }
  }

  Return() {
    this.return.emit('false');
  }
}
