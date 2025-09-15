import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterInfo } from './footer-info';

describe('FooterInfo', () => {
  let component: FooterInfo;
  let fixture: ComponentFixture<FooterInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
