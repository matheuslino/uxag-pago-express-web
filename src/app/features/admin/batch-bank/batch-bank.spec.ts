import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchBank } from './batch-bank';

describe('BatchBank', () => {
  let component: BatchBank;
  let fixture: ComponentFixture<BatchBank>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BatchBank]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchBank);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
