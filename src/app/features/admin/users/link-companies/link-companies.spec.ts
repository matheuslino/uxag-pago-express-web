import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkCompanies } from './link-companies';

describe('LinkCompanies', () => {
  let component: LinkCompanies;
  let fixture: ComponentFixture<LinkCompanies>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkCompanies]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkCompanies);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
