import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDebtorComponent } from './update-debtor.component';

describe('UpdateDebtorComponent', () => {
  let component: UpdateDebtorComponent;
  let fixture: ComponentFixture<UpdateDebtorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDebtorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDebtorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
