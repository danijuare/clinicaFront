import { Component, OnInit } from '@angular/core';
import { HabitacionRestService } from 'src/app/services/habitacion-rest.service';
import { environment } from 'src/environments/environment';
import { ServicioRestService } from 'src/app/services/servicio-rest.service';
import { HotelRestService } from 'src/app/services/hotel-rest.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  //variables de componentes
  allHabitaciones: any[] = [];
  allServicios: any[] = [];
  allHoteles: any[] = [];
  idhabitacion: any;
  idhotel: any;
  numero_habitacion: any;
  tipo: any;
  precio: any;
  estado: any;
  imagen: any;


  constructor(
    private habitacionRest: HabitacionRestService,
    private servicioRest: ServicioRestService,
    private hotelRest: HotelRestService
  ) { }

  ngOnInit(): void {
    this.getHabitaciones();
    this.getServicios();
    this.getHoteles();
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

}
