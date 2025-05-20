import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHabitacionesComponent } from './admin-habitaciones.component';

describe('AdminHabitacionesComponent', () => {
  let component: AdminHabitacionesComponent;
  let fixture: ComponentFixture<AdminHabitacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminHabitacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHabitacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
