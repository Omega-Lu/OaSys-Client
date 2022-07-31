import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDebtorsAccountComponent } from './view-debtors-account.component';

describe('ViewDebtorsAccountComponent', () => {
  let component: ViewDebtorsAccountComponent;
  let fixture: ComponentFixture<ViewDebtorsAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDebtorsAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDebtorsAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
