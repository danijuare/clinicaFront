import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReservacionesComponent } from './admin-reservaciones.component';

describe('AdminReservacionesComponent', () => {
  let component: AdminReservacionesComponent;
  let fixture: ComponentFixture<AdminReservacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminReservacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminReservacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
