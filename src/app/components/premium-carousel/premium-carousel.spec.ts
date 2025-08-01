import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumCarousel } from './premium-carousel';

describe('PremiumCarousel', () => {
  let component: PremiumCarousel;
  let fixture: ComponentFixture<PremiumCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PremiumCarousel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PremiumCarousel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
