import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferWallet } from './transfer-wallet';

describe('TransferWallet', () => {
  let component: TransferWallet;
  let fixture: ComponentFixture<TransferWallet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferWallet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferWallet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
