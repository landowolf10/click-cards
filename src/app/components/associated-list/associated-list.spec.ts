import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociatedList } from './associated-list';

describe('AssociatedList', () => {
  let component: AssociatedList;
  let fixture: ComponentFixture<AssociatedList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssociatedList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociatedList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
