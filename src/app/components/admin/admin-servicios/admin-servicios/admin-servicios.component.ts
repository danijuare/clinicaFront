import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ServicioRestService } from 'src/app/services/servicio-rest.service';

@Component({
  selector: 'app-admin-servicios',
  templateUrl: './admin-servicios.component.html',
  styleUrls: ['./admin-servicios.component.css']
})
export class AdminServiciosComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  displayedColumnsArticulos: string[] = [
    'idservicios', 'servicio', 'descripcion', 'precio', 'opc'
  ];
  dataSource = new MatTableDataSource();
  //TABLA
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  form!: FormGroup;
  formUpdate!: FormGroup;
  idservicios:any;
  servicio:any;
  descripcion:any;
  precio:any;
  imagen:any;
  filesToUpload:any;
  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private servicioRest:ServicioRestService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      servicio: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
    });
    this.formUpdate = this.fb.group({
      servicio: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
    });
    this.getServicios();
  }

  getServicios(){
    this.servicioRest.getServicios().subscribe({
      next: (res:any)=>{
        const datosTable = res.data.map((servicio: any) => ({
          idservicios: servicio.idservicios,
          servicio: servicio.servicio,
          descripcion: servicio.descripcion,
          precio: servicio.precio
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

  addServicio(){
    if(this.form.invalid){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Completa el formulario correctamente",
      });
    }else{
      this.servicioRest.addServicio(this.form.value).subscribe({
        next: (res:any)=>{
          Swal.fire({
            title: '¡Éxito!',
            text: res.message,
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.getServicios();
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

  abrirModalDetalles(templateRef:any, id:string){
    this.servicioRest.getServicio(id).subscribe({
      next: (res:any)=>{
        this.idservicios = res.data.idservicios;
        this.servicio = res.data.servicio;
        this.descripcion = res.data.descripcion;
        this.precio = res.data.precio;
        this.imagen = environment.baseUrl + 'servicio/getImage/' + res.data.imagen;
      }
    })
    let dialogRef = this.dialog.open(templateRef, {
      width: '600px'
    });
  }

  abrirModalUpdate(templateRef:any, id:string){
    this.idservicios = id;
    console.log("id ", id);
    this.servicioRest.getServicio(this.idservicios).subscribe({
      next: (res:any)=>{
        this.formUpdate.setValue({
          servicio :res.data.servicio,
          descripcion :res.data.descripcion,
          precio :res.data.precio,
          
        });
      }
    })
    let dialogRef = this.dialog.open(templateRef, {
      width: '500px'
    });
  }

  updateServicio(){
    if(this.formUpdate.invalid){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Completa el formulario correctamente",
      });
    }else{
      this.servicioRest.updateServicio(this.idservicios, this.formUpdate.value).subscribe({
        next: (res:any)=>{
          Swal.fire({
            title: '¡Éxito!',
            text: res.message,
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.getServicios();
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
    this.idservicios = id;
    let dialogRef = this.dialog.open(templateRef, {
      width: '500px'
    });
  }

  filesChange(inputFile:any){
    this.filesToUpload = <Array<File>>inputFile.target.files;
    //console.log(this.filesToUpload);
  }
  uploadImage(){
    const id = this.idservicios;
    //console.log("id ",id);
    this.servicioRest.requestFiles(id, this.filesToUpload, 'imagen')
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
          this.getServicios();
        });
        
      }else{
        console.log(res);
        this.getServicios();
      }
    })
  }

}
