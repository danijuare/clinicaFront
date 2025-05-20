import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { HotelRestService } from 'src/app/services/hotel-rest.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-hoteles',
  templateUrl: './admin-hoteles.component.html',
  styleUrls: ['./admin-hoteles.component.css']
})
export class AdminHotelesComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  //PARA LAS COLUMNAS
  displayedColumnsArticulos: string[] = [
    'idhotel', 'nombre', 'direccion', 'telefono', 'email', 'opc'
  ];
  dataSource = new MatTableDataSource();
  form!: FormGroup;
  formUpdate!: FormGroup;
  idhotel:any;
  nombre:any;
  direccion:any;
  telefono:any;
  email:any;
  ciudad:any;
  pais:any;
  condicion:any;
  imagen:any;
  filesToUpload:any;

  constructor(
    private dialog: MatDialog,
    private hotelRest:HotelRestService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', Validators.required],
      ciudad: ['', Validators.required],
      pais: ['', Validators.required],
      condicion: ['1', Validators.required],
    });
    this.formUpdate = this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', Validators.required],
      ciudad: ['', Validators.required],
      pais: ['', Validators.required],
      condicion: ['1', Validators.required],
    });
    this.getHoteles();
  }
  

  
  getHoteles(){
    this.hotelRest.getHoteles().subscribe({
      next: (res:any)=>{
        const datosTable = res.data.map((hotel: any) => ({
          idhotel: hotel.idhotel,
          nombre: hotel.nombre,
          direccion: hotel.direccion,
          telefono: hotel.telefono,
          email: hotel.email
        }));
        this.dataSource.data = datosTable;
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  abrirModal(templateRef: any) {
    let dialogRef = this.dialog.open(templateRef, {
      width: '500px'
    });
  }

  addHotel(){
    if(this.form.invalid){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Completa el formulario correctamente",
      });
    }else{
      this.hotelRest.addHotel(this.form.value).subscribe({
        next: (res:any)=>{
          Swal.fire({
            title: '¡Éxito!',
            text: res.message,
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.getHoteles();
        },
        error: (err) => {
          console.log(err)
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.error.message || err.error,
          });
        }
      })
    }
  }

  idhotelDetalles:any;
  abrirModalDetalles(templateRef:any, id:string){
    this.idhotelDetalles = id;
    console.log("idhotelDetalles ", this.idhotelDetalles);
    this.hotelRest.getHotel(this.idhotelDetalles).subscribe({
      next: (res:any)=>{
        this.idhotel = res.data.idhotel;
        this.nombre = res.data.nombre;
        this.direccion = res.data.direccion;
        this.telefono = res.data.telefono;
        this.email = res.data.email;
        this.ciudad = res.data.ciudad;
        this.pais = res.data.pais;
        this.condicion = res.data.condicion;
        this.imagen = environment.baseUrl + 'hotel/getImage/' + res.data.imagen;
      }
    })
    let dialogRef = this.dialog.open(templateRef, {
      width: '600px'
    });
    /*
    dialogRef.afterClosed().subscribe(() => {
      this.idhotelDetalles = null; 
      console.log("Modal cerrado, idhotelDetalles reiniciado");
    });
    */
  }

  abrirModalUpdate(templateRef:any, id:string){
    this.idhotel = id;
    this.hotelRest.getHotel(this.idhotel).subscribe({
      next: (res:any)=>{
        this.formUpdate.setValue({
          nombre : res.data.nombre,
          direccion : res.data.direccion,
          telefono : res.data.telefono,
          email : res.data.email,
          ciudad : res.data.ciudad,
          pais : res.data.pais,
          condicion : res.data.condicion
        });
      }
    })
    let dialogRef = this.dialog.open(templateRef, {
      width: '500px'
    });
  }

  updateHotel(){
    if(this.formUpdate.invalid){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Completa el formulario correctamente",
      });
    }else{
      this.hotelRest.updateHotel(this.idhotel,this.formUpdate.value).subscribe({
        next: (res:any)=>{
          Swal.fire({
            title: '¡Éxito!',
            text: res.message,
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.getHoteles();
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
    this.idhotel = id;
    let dialogRef = this.dialog.open(templateRef, {
      width: '500px'
    });
  }

  filesChange(inputFile:any){
    this.filesToUpload = <Array<File>>inputFile.target.files;
    //console.log(this.filesToUpload);
  }
  uploadImage(){
    const id = this.idhotel;
    //console.log("id ",id);
    this.hotelRest.requestFiles(id, this.filesToUpload, 'imagen')
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
          this.getHoteles();
        });
        
      }else{
        console.log(res);
        this.getHoteles();
      }
    })
  }

}
