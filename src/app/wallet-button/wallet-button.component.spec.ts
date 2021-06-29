import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletButtonComponent } from './wallet-button.component';

describe('WalletButtonComponent', () => {
  let component: WalletButtonComponent;
  let fixture: ComponentFixture<WalletButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WalletButtonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
