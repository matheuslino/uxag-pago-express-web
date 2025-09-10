import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendPix } from './send-pix';

describe('SendPix', () => {
  let component: SendPix;
  let fixture: ComponentFixture<SendPix>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendPix]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendPix);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
