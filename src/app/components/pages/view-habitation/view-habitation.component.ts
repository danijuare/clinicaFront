import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HabitacionRestService } from 'src/app/services/habitacion-rest.service';
import { environment } from 'src/environments/environment';
import {MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClienteRestService } from 'src/app/services/cliente-rest.service';
import { ReservacionRestService } from 'src/app/services/reservacion-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-habitation',
  templateUrl: './view-habitation.component.html',
  styleUrls: ['./view-habitation.component.css']
})
export class ViewHabitationComponent implements OnInit {
  idProduct:any;
  //variables de componente
  idhabitacion:any;
  idhotel:any;
  numero_habitacion:any;
  tipo:any;
  precio:any;
  estado:any;
  imagen:any;
  dimensiones:any;
  cantidad_camas:any;
  cantidad_banios:any;
  wifi:any;
  tv:any;
  aireacondicionado:any;
  vistas:any;
  capacidad:any;
  hotel:any;
  clientesData: any[] = [];

  //para reservar
  formReservacion!: FormGroup;
  formReservacion2!: FormGroup;

  constructor(
    public activatedRoute: ActivatedRoute,
    private habitacionRest: HabitacionRestService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private clienteRest: ClienteRestService,
    private reservacionRest:ReservacionRestService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( ruta => {
      this.idProduct = ruta.get('idP');
    });
    this.getHabitacion();
    this.getClientes();
    this.formReservacion = this.fb.group({
      idcliente: ['', Validators.required],
      idhabitacion: [{ value: '', disabled: true }, Validators.required],
      fecha_inicio: ['', Validators.required],
      fecha_fin: ['', Validators.required],
      estado: [''],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      documento_identidad: ['', Validators.required],
    });
    this.formReservacion2 = this.fb.group({
      idcliente: ['', Validators.required],
      idhabitacion: [{ value: '', disabled: true }, Validators.required],
      fecha_inicio: ['', Validators.required],
      fecha_fin: ['', Validators.required],
      estado: [''],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      documento_identidad: ['', Validators.required],
    });
  }

  //obtener la habitacion seleccionada
  getHabitacion(){
    this.habitacionRest.getHabitacion(this.idProduct).subscribe({
      next: (res:any)=>{
        //console.log("res de unoi ", res);
        this.idhabitacion = res.data.idhabitacion;
        this.idhotel = res.data.idhotel;
        this.numero_habitacion = res.data.numero_habitacion;
        this.tipo = res.data.tipo;
        this.precio = res.data.precio;
        this.estado = res.data.estado;
        //imagen
        this.imagen = environment.baseUrl + 'habitacion/getImage/' + res.data.imagen;
        this.dimensiones = res.data.dimensiones;
        this.cantidad_camas = res.data.cantidad_camas;
        this.cantidad_banios = res.data.cantidad_banios;
        this.wifi = res.data.wifi;
        this.tv = res.data.tv;
        this.aireacondicionado = res.data.aireacondicionado;
        this.vistas = res.data.vistas;
        this.capacidad = res.data.capacidad;
        this.hotel = res.data.nombre_hotel;
        let estado = "PENDIENTE"
        this.formReservacion.patchValue({
          idhabitacion: this.idhabitacion,
          estado: estado
        });
      },
      error: (err)=>{console.log("Error ",err)}
    })
  }

  getClientes(){
    this.clienteRest.getClientes().subscribe({
      next: (res:any)=>{
        this.clientesData = res.data;
      },
      error: (err)=>{console.log("Error en los clientes ",err)}
    })
  } 

  abrirModalUpdate(templateRef:any){
    let dialogRef = this.dialog.open(templateRef, {
      width: '500px'
    });
    /*
    if(this.estado == "NO DISPONIBLE"){
      Swal.fire({
        title: 'Opps..',
        text: 'La Habitación ya ha sido reservada, intenta con otra.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }else{
      let dialogRef = this.dialog.open(templateRef, {
        width: '500px'
      });
    }
      */
  }

  addReservacion() {
    //insertar el cliente primero
    let body = this.formReservacion.value;
    const dataCliente = {
      nombre: body.nombre,
      apellido: body.apellido,
      email: body.email,
      telefono: body.telefono,
      documento_identidad: body.documento_identidad
    }
    
    this.clienteRest.addCliente(dataCliente).subscribe({
      next: (res:any)=>{
        let dataReservacion = {
          "idcliente": res.data.idcliente,
          "idhabitacion": this.idhabitacion,
          "fecha_inicio": body.fecha_inicio,
          "fecha_fin": body.fecha_fin,
          "estado": "PENDIENTE"
        }
        this.reservacionRest.addReservacion(dataReservacion).subscribe({
          next: (res:any)=>{
            console.log("res de la primera reservacuib ",res);
            Swal.fire({
              title: '¡Éxito!',
              text: 'La reservación ha sido guardada correctamente.',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });
            this.generatePDFByReservacion(res.idreservacion);
            this.getHabitacion();
          },
          error: (err)=>{Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.error.message || err.error,
          });}
        })
      },
      error: (err)=>{console.log("Error al agregar cliente", err)}
    })
  }

  generatePDFByReservacion(idreservacion:any){
    this.reservacionRest.generatePDFByReservacion(idreservacion).subscribe({
      next: (res:any)=>{
        //console.log("res para el pdf ",res);
        const blob = new Blob([res], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `reservacion_${idreservacion}.pdf`;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err)=>{console.log(err)}
    });
  }

  abrirModalUpdate2(templateRef:any){
    let dialogRef = this.dialog.open(templateRef, {
      width: '500px'
    });
    /*
    if(this.estado == "NO DISPONIBLE"){
      Swal.fire({
        title: 'Opps..',
        text: 'La Habitación ya ha sido reservada, intenta con otra.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }else{
      let dialogRef = this.dialog.open(templateRef, {
        width: '500px'
      });
    }
      */
  }
  addReservacion2() {
    let body = this.formReservacion2.value;
    let dataReservacion = {
      "idcliente": body.idcliente,
      "idhabitacion": this.idhabitacion,
      "fecha_inicio": body.fecha_inicio,
      "fecha_fin": body.fecha_fin,
      "estado": "PENDIENTE"
    }
    this.reservacionRest.addReservacion(dataReservacion).subscribe({
      next: (res:any)=>{
        console.log("res de la primera reservacuib ",res);
        Swal.fire({
          title: '¡Éxito!',
          text: 'La reservación ha sido guardada correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
        this.generatePDFByReservacion(res.idreservacion);
        this.getHabitacion();
      },
      error: (err)=>{Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.error.message || err.error,
      });}
    })
  }
}
