import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyArtPageComponent } from './my-art-page.component';

describe('MyArtPageComponent', () => {
  let component: MyArtPageComponent;
  let fixture: ComponentFixture<MyArtPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyArtPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyArtPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
