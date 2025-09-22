import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDatePickerRange } from './custom-datepicker-range';

describe('CustomDatePickerRange', () => {
  let component: CustomDatePickerRange;
  let fixture: ComponentFixture<CustomDatePickerRange>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomDatePickerRange]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomDatePickerRange);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
