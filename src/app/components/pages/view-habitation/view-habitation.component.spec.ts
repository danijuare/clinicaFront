import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHabitationComponent } from './view-habitation.component';

describe('ViewHabitationComponent', () => {
  let component: ViewHabitationComponent;
  let fixture: ComponentFixture<ViewHabitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewHabitationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewHabitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
