import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtDetailPageComponent } from './art-detail-page.component';

describe('ArtDetailPageComponent', () => {
  let component: ArtDetailPageComponent;
  let fixture: ComponentFixture<ArtDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArtDetailPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
