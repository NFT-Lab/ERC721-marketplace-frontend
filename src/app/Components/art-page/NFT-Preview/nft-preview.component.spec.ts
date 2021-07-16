import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NFTPreviewComponent } from './nft-preview.component';

describe('NFTPreviewComponent', () => {
  let component: NFTPreviewComponent;
  let fixture: ComponentFixture<NFTPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NFTPreviewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NFTPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
