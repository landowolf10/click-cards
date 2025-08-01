import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacesCarousel } from './places-carousel';

describe('PlacesCarousel', () => {
  let component: PlacesCarousel;
  let fixture: ComponentFixture<PlacesCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlacesCarousel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlacesCarousel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
