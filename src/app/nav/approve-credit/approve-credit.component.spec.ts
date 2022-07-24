import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveCreditComponent } from './approve-credit.component';

describe('ApproveCreditComponent', () => {
  let component: ApproveCreditComponent;
  let fixture: ComponentFixture<ApproveCreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveCreditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
