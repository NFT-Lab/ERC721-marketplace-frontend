import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgePageComponent } from './forge-page.component';

describe('ForgePageComponent', () => {
  let component: ForgePageComponent;
  let fixture: ComponentFixture<ForgePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
