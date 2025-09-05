import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacesByCategory } from './places-by-category';

describe('PlacesByCategory', () => {
  let component: PlacesByCategory;
  let fixture: ComponentFixture<PlacesByCategory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlacesByCategory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlacesByCategory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
