import { Component, OnInit } from '@angular/core';
import { HabitacionRestService } from 'src/app/services/habitacion-rest.service';
import { environment } from 'src/environments/environment';
import { ServicioRestService } from 'src/app/services/servicio-rest.service';
import { HotelRestService } from 'src/app/services/hotel-rest.service';
import { AsignacionService } from 'src/app/services/asignacion.service';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  //variables de componentes
  allHabitaciones: any[] = [];
  allVentanillas: any[] = [];
  allServicios: any[] = [];
  allHoteles: any[] = [];
  idhabitacion: any;
  idhotel: any;
  numero_habitacion: any;
  tipo: any;
  precio: any;
  estado: any;
  imagen: any;
  form!: FormGroup;
  idtipo_consulta: any;


  constructor(
    private habitacionRest: HabitacionRestService,
    private servicioRest: ServicioRestService,
    private hotelRest: HotelRestService,
    private asignacionRest: AsignacionService,
    private dialog: MatDialog,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.getVentanillas();
    this.form = this.fb.group({
      descripcion: ['', Validators.required],
      nombre_cliente: ['', Validators.required],
      telefono_cliente: ['', Validators.required],
    });
  }

  test() {
    this.habitacionRest.test().subscribe({
      next: (res: any) => {

      }
    })
  }

  testServicio() {
    this.servicioRest.test().subscribe({
      next: (res: any) => {
        //console.log("tes servicio ", res);
      },
      error: (err) => { console.log("Errpr ", err); }
    })
  }

  //OBTENER TODAS LAS HABITACIONES
  getHabitaciones() {
    this.habitacionRest.getHabitaciones().subscribe({
      next: (res: any) => {
        //onsole.log("todas las habitaciones ", res);
        //this.allHabitaciones = res.data;
        //this.imagen = environment.baseUrl + 'habitacion/getImage/' + res.data.imagen;

        this.allHabitaciones = res.data.map((habitacion: any) => {
          this.idhabitacion = habitacion.idhabitacion;
          this.idhotel = habitacion.idhotel;
          this.numero_habitacion = habitacion.numero_habitacion;
          this.tipo = habitacion.tipo;
          this.precio = habitacion.precio;
          this.estado = habitacion.estado;
          habitacion.imagen = environment.baseUrl + 'habitacion/getImage/' + habitacion.imagen;
          return habitacion;
        });
      },
      error: (err) => { console.log("Error ", err) }
    })
  }

  //obtener los servicios
  getServicios() {
    this.servicioRest.getServicios().subscribe({
      next: (res: any) => {
        this.allServicios = res.data.map((servicio: any) => {
          servicio.imagen = environment.baseUrl + 'servicio/getImage/' + servicio.imagen;
          return servicio;
        });
      }
    })
  }

  //obtener los hoteles
  getHoteles() {
    this.hotelRest.getHoteles().subscribe({
      next: (res: any) => {
        this.allHoteles = res.data.map((hotel: any) => {
          hotel.imagen = environment.baseUrl + 'hotel/getImage/' + hotel.imagen;
          return hotel;
        });
      }
    })
  }

  getAsignaciones() {
    this.asignacionRest.getAsignaciones().subscribe({
      next: (res: any) => {
        console.log("res ", res);
      },
      error: (err) => { console.log("Error ", err) }
    });
  }

  getVentanillas() {
    this.asignacionRest.getVentanillas().subscribe({
      next: (res: any) => {
        this.allVentanillas = res.data;
        //console.log("this.allVentanillas ", this.allVentanillas);
      },
      error: (err) => { console.log("Error ", err) }
    });
  }


  abrirModal(templateRef: any, idtipo_consulta:any) {
    this.form.reset();
    this.idtipo_consulta = idtipo_consulta;
    //console.log("idtipo_consulta ", idtipo_consulta);
    let dialogRef = this.dialog.open(templateRef, {
      width: '500px'
    });
  }

  getFechaHoraActual(): string {
    const now = new Date();
    const fecha = now.toISOString().split('T')[0]; // YYYY-MM-DD
    const hora = now.toTimeString().split(' ')[0]; // HH:mm:ss
    return `${fecha} ${hora}`;
  }
  addAsignacionTicket() {
    if (this.form.invalid) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Completa el formulario correctamente",
      });
    } else {
      const datosFormulario = this.form.value;
      const ticket = {
        ...datosFormulario,
        fecha_hora_creacion: this.getFechaHoraActual(),
        idtipo_consulta: this.idtipo_consulta
      };
      //console.log("ticket ",ticket);
      this.asignacionRest.addAsignacionConsulta(ticket).subscribe({
        next: (res: any) => {
          Swal.fire({
            title: '¡Éxito!',
            text: res.message,
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.form.reset();
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
  }

}
