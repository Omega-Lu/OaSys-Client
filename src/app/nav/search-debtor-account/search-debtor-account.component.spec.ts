import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDebtorAccountComponent } from './search-debtor-account.component';

describe('SearchDebtorAccountComponent', () => {
  let component: SearchDebtorAccountComponent;
  let fixture: ComponentFixture<SearchDebtorAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchDebtorAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchDebtorAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
