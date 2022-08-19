import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintainDebtorComponent } from './maintain-debtor.component';

describe('MaintainDebtorComponent', () => {
  let component: MaintainDebtorComponent;
  let fixture: ComponentFixture<MaintainDebtorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintainDebtorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintainDebtorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
