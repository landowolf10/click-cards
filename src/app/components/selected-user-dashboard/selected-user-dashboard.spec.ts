import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedUserDashboard } from './selected-user-dashboard';

describe('SelectedUserDashboard', () => {
  let component: SelectedUserDashboard;
  let fixture: ComponentFixture<SelectedUserDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectedUserDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedUserDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
