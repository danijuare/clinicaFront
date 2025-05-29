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
    'idtipo_consulta', 'nombre', 'descripcion', 'condicion', 'opc'
  ];
  dataSource = new MatTableDataSource();
  //TABLA
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  form!: FormGroup;
  formUpdate!: FormGroup;
  idtipo_consulta:any;
  nombre:any;
  descripcion:any;
  condicion:any;
  imagen:any;
  filesToUpload:any;
  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private servicioRest:ServicioRestService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
    this.formUpdate = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      condicion: ['', Validators.required]
    });
    this.getTipoConsultas();
  }

  getTipoConsultas(){
    this.servicioRest.getTipoConsultas().subscribe({
      next: (res:any)=>{
        const datosTable = res.data.map((tipo_consulta: any) => ({
          idtipo_consulta: tipo_consulta.idtipo_consulta,
          nombre: tipo_consulta.nombre,
          descripcion: tipo_consulta.descripcion,
          condicion: tipo_consulta.condicion
        }));
        this.dataSource.data = datosTable;
      }
    })
  }

  abrirModal(templateRef: any) {
    this.form.reset();
    let dialogRef = this.dialog.open(templateRef, {
      width: '500px'
    });
  }

  addTipoConsulta(){
    if(this.form.invalid){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Completa el formulario correctamente",
      });
    }else{
      this.servicioRest.addTipoConsulta(this.form.value).subscribe({
        next: (res:any)=>{
          Swal.fire({
            title: '¡Éxito!',
            text: res.message,
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.getTipoConsultas();
          this.form.reset();
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
    this.servicioRest.getTipoConsulta(id).subscribe({
      next: (res:any)=>{
        this.idtipo_consulta = res.data.idtipo_consulta;
        this.nombre = res.data.nombre;
        this.descripcion = res.data.descripcion;
        this.condicion = res.data.condicion;
        this.imagen = "";
      }
    })
    let dialogRef = this.dialog.open(templateRef, {
      width: '600px'
    });
  }

  abrirModalUpdate(templateRef:any, id:string){
    this.idtipo_consulta = id;
    //console.log("id ", id);
    this.servicioRest.getTipoConsulta(this.idtipo_consulta).subscribe({
      next: (res:any)=>{
        this.formUpdate.setValue({
          nombre :res.data.nombre,
          descripcion :res.data.descripcion,
          condicion :res.data.condicion,
          
        });
      }
    })
    let dialogRef = this.dialog.open(templateRef, {
      width: '500px'
    });
  }
  

  updateTipoConsulta(){
    if(this.formUpdate.invalid){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Completa el formulario correctamente",
      });
    }else{
      this.servicioRest.updateTipoConsulta(this.idtipo_consulta, this.formUpdate.value).subscribe({
        next: (res:any)=>{
          Swal.fire({
            title: '¡Éxito!',
            text: res.message,
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.getTipoConsultas();
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

  /*
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
          this.getTipoConsultas();
        });
        
      }else{
        console.log(res);
        this.getTipoConsultas();
      }
    })
  }
  */

}
