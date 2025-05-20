import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { HabitacionRestService } from 'src/app/services/habitacion-rest.service';
import { HotelRestService } from 'src/app/services/hotel-rest.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-habitaciones',
  templateUrl: './admin-habitaciones.component.html',
  styleUrls: ['./admin-habitaciones.component.css']
})
export class AdminHabitacionesComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  habitacionesData:any[] = [];
  hotelesData:any[] = [];
  form!: FormGroup
  formUpdate!: FormGroup;
  //habitacion
  idhotel:any;
  numero_habitacion:any;
  tipo:any;
  precio:any;
  estado:any;
  dimensiones:any;
  cantidad_camas:any;
  cantidad_banios:any;
  wifi:any;
  tv:any;
  aireacondicionado:any;
  vistas:any;
  capacidad:any;
  imagen:any;
  idHabitacion:any;
  idhabitacion:any;
  filesToUpload:any;
  //PARA LAS COLUMNAS
  displayedColumnsArticulos: string[] = [
    'idhabitacion', 'idhotel', 'numero_habitacion', 'tipo', 'precio','opc'
  ];
  dataSource = new MatTableDataSource();

  //TABLA
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private habitacionRest:HabitacionRestService,
    private hotelRest:HotelRestService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      idhotel: ['', Validators.required],
      numero_habitacion: ['', Validators.required],
      tipo: ['', Validators.required],
      precio: ['', Validators.required],
      estado: ['', Validators.required],
      dimensiones: ['', Validators.required],
      cantidad_camas: ['', Validators.required],
      cantidad_banios: ['', Validators.required],
      wifi: ['', Validators.required],
      tv: ['', Validators.required],
      aireacondicionado: ['', Validators.required],
      vistas: ['', Validators.required],
      capacidad: ['', Validators.required]
    });
    this.formUpdate = this.fb.group({
      idhotel: ['', Validators.required],
      numero_habitacion: ['', Validators.required],
      tipo: ['', Validators.required],
      precio: ['', Validators.required],
      estado: ['', Validators.required],
      dimensiones: ['', Validators.required],
      cantidad_camas: ['', Validators.required],
      cantidad_banios: ['', Validators.required],
      wifi: ['', Validators.required],
      tv: ['', Validators.required],
      aireacondicionado: ['', Validators.required],
      vistas: ['', Validators.required],
      capacidad: ['', Validators.required]
    });
    this.getHabitaciones();
    this.getHoteles();
  }

  getHoteles(){
    this.hotelRest.getHoteles().subscribe({
      next: (res:any)=>{
        this.hotelesData = res.data;
      }
    })
  }

  getHabitaciones(){
    this.habitacionRest.getHabitaciones().subscribe({
      next: (res:any)=>{
        const datosTable = res.data.map((habitacion: any) => ({
          idhabitacion: habitacion.idhabitacion,
          idhotel: habitacion.idhotel,
          numero_habitacion: habitacion.numero_habitacion,
          tipo: habitacion.tipo,
          precio: habitacion.precio
        }));
        this.dataSource.data = datosTable;
      }
    })
  }

  abrirModal(templateRef: any) {
    let dialogRef = this.dialog.open(templateRef, {
      width: '500px'
    });
  }

  abrirModalDetalles(templateRef:any, id:string){
    this.habitacionRest.getHabitacion(id).subscribe({
      next: (res:any)=>{
        //console.log(res);
        this.idhabitacion = res.data.idhabitacion;
        this.idhotel = res.data.idhotel;
        this.numero_habitacion = res.data.numero_habitacion;
        this.tipo = res.data.tipo;
        this.precio = res.data.precio;
        this.estado = res.data.estado;
        this.dimensiones = res.data.dimensiones;
        this.cantidad_camas = res.data.cantidad_camas;
        this.cantidad_banios = res.data.cantidad_banios;
        this.wifi = res.data.wifi;
        this.tv = res.data.tv;
        this.aireacondicionado = res.data.aireacondicionado;
        this.vistas = res.data.vistas;
        this.capacidad = res.data.capacidad;
        this.imagen = environment.baseUrl + 'habitacion/getImage/' + res.data.imagen;
      }
    })
    let dialogRef = this.dialog.open(templateRef, {
      width: '1000px'
    });
  }

  addHabitacion(){
    if(this.form.invalid){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Completa el formulario correctamente",
      });
    }else{
      this.habitacionRest.addHabitacion(this.form.value).subscribe({
        next: (res:any)=>{
          Swal.fire({
            title: '¡Éxito!',
            text: res.message,
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.getHabitaciones();
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
  }

  abrirModalUpdate(templateRef:any, id:string){
    this.idHabitacion = id;
    console.log("id ", id);
    this.habitacionRest.getHabitacion(id).subscribe({
      next: (res:any)=>{
        this.formUpdate.setValue({
          idhotel :res.data.idhotel,
          numero_habitacion : res.data.numero_habitacion,
          tipo : res.data.tipo,
          precio : res.data.precio,
          estado : res.data.estado,
          dimensiones : res.data.dimensiones,
          cantidad_camas : res.data.cantidad_camas,
          cantidad_banios : res.data.cantidad_banios,
          wifi : res.data.wifi,
          tv : res.data.tv,
          aireacondicionado : res.data.aireacondicionado,
          vistas : res.data.vistas,
          capacidad : res.data.capacidad
        });
      }
    })
    let dialogRef = this.dialog.open(templateRef, {
      width: '500px'
    });
  }

  updateHabitacion(){
    if(this.formUpdate.invalid){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Completa el formulario correctamente",
      });
    }else{
      this.habitacionRest.updateHabitacion(this.idHabitacion,this.formUpdate.value).subscribe({
        next: (res:any)=>{
          Swal.fire({
            title: '¡Éxito!',
            text: res.message,
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.getHabitaciones();
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
  }

  abrirModalUpdateImage(templateRef:any, id:string){
    this.idHabitacion = id;
    let dialogRef = this.dialog.open(templateRef, {
      width: '500px'
    });
  }

  filesChange(inputFile:any){
    this.filesToUpload = <Array<File>>inputFile.target.files;
    //console.log(this.filesToUpload);
  }
  uploadImage(){
    const id = this.idHabitacion;
    //console.log("id ",id);
    this.habitacionRest.requestFiles(id, this.filesToUpload, 'imagen')
    .then((res:any)=>{
      //console.log("id ",id);
      //console.log("this.filesToUpload ",this.filesToUpload);
      let resClear = JSON.parse(res);
      //console.log("resClear ",resClear);
      if(!resClear.error){
        Swal.fire({
          title: 'Éxito',
          icon: 'success',
          text: resClear.message,
          confirmButtonText: 'OK'
        }).then(confirm=>{
          this.getHabitaciones();
        });
        
      }else{
        console.log(res);
        this.getHabitaciones();
      }
    })
  }
}
