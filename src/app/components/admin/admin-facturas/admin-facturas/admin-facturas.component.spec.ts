import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFacturasComponent } from './admin-facturas.component';

describe('AdminFacturasComponent', () => {
  let component: AdminFacturasComponent;
  let fixture: ComponentFixture<AdminFacturasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFacturasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFacturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
