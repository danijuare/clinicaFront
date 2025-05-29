import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { HabitacionRestService } from 'src/app/services/habitacion-rest.service';
import { HotelRestService } from 'src/app/services/hotel-rest.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-admin-habitaciones',
  templateUrl: './admin-habitaciones.component.html',
  styleUrls: ['./admin-habitaciones.component.css']
})
export class AdminHabitacionesComponent {

  ventanillas: any[] = [];
  asignaciones: any[] = [];
  selectedVentanillaId: string = '';
  asignacionesRevisadas: any[] = [];

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private habitacionRest: HabitacionRestService,
    private hotelRest: HotelRestService
  ) { }

  ngOnInit(): void {
    this.habitacionRest.getVentanillasActivas().subscribe((res: any) => {
      this.ventanillas = res.data;
      if (this.ventanillas.length > 0) {
        this.cargarAsignaciones(this.ventanillas[0].idventanillas);
      }
    });
  }

  cargarAsignaciones(id: string) {
    this.selectedVentanillaId = id;

    this.habitacionRest.getAsignacionesPorVentanilla(id).subscribe((res: any) => {
      this.asignaciones = res.data || [];
    });

    this.habitacionRest.getAsignacionesPorVentanillaRevisadas(id).subscribe((res: any) => {
      this.asignacionesRevisadas = res.data || [];
    });
  }

  onTabChange(event: MatTabChangeEvent) {
    const id = this.ventanillas[event.index].idventanillas;
    this.cargarAsignaciones(id);
  }

  atender(asignacion: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción marcará el ticket como "Atendido" y "Revisado".',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, marcar como Atendido y Revisado',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.habitacionRest.updateAtendido(asignacion).subscribe({
          next: (res: any) => {
            Swal.fire({
              title: '¡Éxito!',
              text: res.message,
              icon: 'success',
              confirmButtonText: 'Aceptar'
            }).then(() => {
              this.habitacionRest.updateRevisado(asignacion).subscribe({
                next: (res: any) => {
                  Swal.fire({
                    title: '¡Éxito!',
                    text: res.message,
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                  }).then(() => {
                    this.cargarAsignaciones(this.selectedVentanillaId);
                  });
                },
                error: (err) => {
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: err.error.message || err.error,
                  });
                }
              });
            });
          },
          error: (err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: err.error.message || err.error,
            });
          }
        });
      }
    });
  }

  revisado(asignacion: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción marcará el ticket como "Revisado".',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, marcar como Revisado',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.habitacionRest.updateRevisado(asignacion).subscribe({
          next: (res: any) => {
            Swal.fire({
              title: '¡Éxito!',
              text: res.message,
              icon: 'success',
              confirmButtonText: 'Aceptar'
            }).then(() => {
              this.cargarAsignaciones(this.selectedVentanillaId);
            });
          },
          error: (err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: err.error.message || err.error,
            });
          }
        });
      }
    });
  }

}
