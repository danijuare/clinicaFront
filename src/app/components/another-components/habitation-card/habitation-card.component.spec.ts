import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitationCardComponent } from './habitation-card.component';

describe('HabitationCardComponent', () => {
  let component: HabitationCardComponent;
  let fixture: ComponentFixture<HabitationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HabitationCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HabitationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
