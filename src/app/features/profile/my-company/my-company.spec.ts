import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCompany } from './my-company';

describe('MyCompany', () => {
  let component: MyCompany;
  let fixture: ComponentFixture<MyCompany>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyCompany]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyCompany);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
