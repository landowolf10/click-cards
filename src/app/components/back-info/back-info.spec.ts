import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackInfo } from './back-info';

describe('BackInfo', () => {
  let component: BackInfo;
  let fixture: ComponentFixture<BackInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
