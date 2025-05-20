import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ReservacionRestService } from 'src/app/services/reservacion-rest.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FacturaRestService } from 'src/app/services/factura-rest.service';
import { ServicioRestService } from 'src/app/services/servicio-rest.service';

@Component({
  selector: 'app-reservaciones',
  templateUrl: './reservaciones.component.html',
  styleUrls: ['./reservaciones.component.css'],
  providers: [DatePipe]
})
export class ReservacionesComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  formReservacionFactura!: FormGroup;
  formReservacionServicios!: FormGroup;
  idReservacion: any;
  servicios: any[] = [];
  idReservacionServicio:any;
  idHabitacionServicio:any;
  //PARA LAS COLUMNAS
  displayedColumnsArticulos: string[] = [
    'idreservaciones', 'idhabitacion', 'nombre_cliente', 'fecha_inicio', 'fecha_fin', 'estado','precio','otros', 'opc'
  ];
  dataSource = new MatTableDataSource();
  constructor(
    private reservacionRest: ReservacionRestService,
    private datePipe: DatePipe,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private facturaRest: FacturaRestService,
    private servicioRest: ServicioRestService
  ) { }

  ngOnInit(): void {
    this.getReservaciones();
    this.getServicios();
    this.formReservacionFactura = this.fb.group({
      idreservacion: [{ value: '', disabled: true }, Validators.required],
      descripcion: ['', Validators.required],
    });
    this.formReservacionServicios = this.fb.group({
      idservicios: ['', Validators.required]
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //obtener las reservaciones
  getReservaciones() {
    this.reservacionRest.getReservaciones().subscribe({
      next: (res: any) => {
        //console.log("reservaciones ", res);
        const datosTable = res.data.map((reservacion: any) => ({
          idreservaciones: reservacion.idreservaciones,
          idhabitacion: reservacion.idhabitacion,
          nombre_cliente: reservacion.nombre_cliente,
          fecha_inicio: this.datePipe.transform(reservacion.fecha_inicio, 'yyyy-MM-dd'),
          fecha_fin: this.datePipe.transform(reservacion.fecha_fin, 'yyyy-MM-dd'),
          estado: reservacion.estado,
          precio: reservacion.precio,
          otros: reservacion.total_servicios
        }));
        this.dataSource.data = datosTable;
        //console.log(this.dataSource.data);
      },
      error: (err) => { console.log("Error al obtener reservaciones ", err) }
    })
  }

  //cancelar reservacion
  cancelarReservacion(id: any) {
    Swal.fire({
      title: "¿Esta seguro de Cancelar la Reservación?",
      //text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si"
    }).then((result) => {
      if (result.isConfirmed) {
        this.reservacionRest.cancelarReservacion(id).subscribe({
          next: (res: any) => {
            Swal.fire({
              title: "Cancelado!",
              text: res.message,
              icon: "success"
            });
          },
          error: (err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: err.error.message || err.error,
            });

          }
        })
      }
    });
  }


  abrirModal(templateRef: any, id: any) {
    this.idReservacion = id;
    let dialogRef = this.dialog.open(templateRef, {
      width: '500px'
    });
  }

  facturarReservacion() {
    if (this.formReservacionFactura.valid) {
      let body = {
        idreservacion: this.idReservacion,
        descripcion: this.formReservacionFactura.value.descripcion
      }
      this.facturaRest.addFactura(body).subscribe({
        next: (res: any) => {
          console.log("res de la factura ", res);
          Swal.fire({
            title: '¡Éxito!',
            text: res.message,
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.getReservaciones();
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

  getServicios(){
    this.servicioRest.getServicios().subscribe({
      next: (res:any)=>{
        this.servicios = res.data;
      }
    })
  }
  abrirModalAddServicio(templateRef: any, idReservacion: any,idHabita:any) {
    //this.idReservacion = id;
    this.idReservacionServicio = idReservacion;
    this.idHabitacionServicio = idHabita;
    let dialogRef = this.dialog.open(templateRef, {
      width: '500px'
    });
  }
  agregarServicios(){
    let dataServicios = {
      idreservaciones: this.idReservacionServicio,
      idhabitacion: this.idHabitacionServicio,
      idservicios: this.formReservacionServicios.value.idservicios
    }
    console.log("dataServicios ",dataServicios);
    this.servicioRest.addDetalleHabitacion(dataServicios).subscribe({
      next: (res:any)=>{
        Swal.fire({
          title: '¡Éxito!',
          text: res.message,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        this.getReservaciones();
      },
      error: (err)=>{console.log("Error al agregar detalle ",err)}
    })
  }

}
