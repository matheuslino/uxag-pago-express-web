import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewItemWallet } from './new-item-wallet';

describe('NewItemWallet', () => {
  let component: NewItemWallet;
  let fixture: ComponentFixture<NewItemWallet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewItemWallet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewItemWallet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
