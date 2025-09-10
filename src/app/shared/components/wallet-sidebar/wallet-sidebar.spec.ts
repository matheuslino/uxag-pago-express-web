import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletSidebar } from './wallet-sidebar';

describe('WalletSidebar', () => {
  let component: WalletSidebar;
  let fixture: ComponentFixture<WalletSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WalletSidebar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletSidebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
