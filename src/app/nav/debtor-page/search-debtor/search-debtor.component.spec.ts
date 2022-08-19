import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDebtorComponent } from './search-debtor.component';

describe('SearchDebtorComponent', () => {
  let component: SearchDebtorComponent;
  let fixture: ComponentFixture<SearchDebtorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchDebtorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchDebtorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
