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
    'idventanillas', 'nombre_ventanilla', 'descripcion', 'condicion', 'nombre_tipo_consulta', 'opc'
  ];
  dataSource = new MatTableDataSource();
  form!: FormGroup;
  formUpdate!: FormGroup;
  idventanillas: any;
  nombre_ventanilla: any;
  descripcion: any;
  condicion: any;
  idtipo_consulta: any;
  nombre_tipo_consulta: any;
  imagen: any;
  tiposConsulta: any[] = [];


  constructor(
    private dialog: MatDialog,
    private hotelRest: HotelRestService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.getTipoConsultas();
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      idtipo_consulta: ['', Validators.required]
    });
    this.formUpdate = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      idtipo_consulta: ['', Validators.required],
      condicion: ['', Validators.required]
    });
    this.getVentanillas();
  }


  getTipoConsultas() {
    this.hotelRest.getTipoConsultas().subscribe({
      next: (res: any) => {
        this.tiposConsulta = res.data;
      },
      error: (err) => {
        console.error('Error al obtener tipos de consulta', err);
      }
    });
  }


  getVentanillas() {
    this.hotelRest.getVentanillas().subscribe({
      next: (res: any) => {
        const datosTable = res.data.map((ventanillas: any) => ({
          idventanillas: ventanillas.idventanillas,
          nombre_ventanilla: ventanillas.nombre_ventanilla,
          descripcion: ventanillas.descripcion,
          condicion: ventanillas.condicion,
          nombre_tipo_consulta: ventanillas.nombre_tipo_consulta
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
    this.form.reset();
    let dialogRef = this.dialog.open(templateRef, {
      width: '500px'
    });
  }

  addVentanilla() {
    if (this.form.invalid) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Completa el formulario correctamente",
      });
    } else {
      this.hotelRest.addVentanilla(this.form.value).subscribe({
        next: (res: any) => {
          Swal.fire({
            title: '¡Éxito!',
            text: res.message,
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.form.reset();
          this.getVentanillas();
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

  idventanillaDetalles: any;
  abrirModalDetalles(templateRef: any, id: string) {
    this.idventanillas = id;
    this.hotelRest.getVentanilla(this.idventanillas).subscribe({
      next: (res: any) => {
        this.idventanillas = res.data.idventanillas;
        this.nombre_ventanilla = res.data.nombre_ventanilla;
        this.descripcion = res.data.descripcion;
        this.condicion = res.data.condicion;
        this.nombre_tipo_consulta = res.data.nombre_tipo_consulta;
        this.imagen = "";
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

  abrirModalUpdate(templateRef: any, id: string) {
    this.idventanillas = id;
    this.hotelRest.getVentanilla(this.idventanillas).subscribe({
      next: (res: any) => {
        console.log("Res", res);
        this.formUpdate.setValue({
          nombre: res.data.nombre_ventanilla,
          descripcion: res.data.descripcion,
          condicion: res.data.condicion,
          idtipo_consulta: res.data.idtipo_consulta
        });
      }
    })
    this.dialog.open(templateRef, { width: '500px' });
  }

  updateVentanilla() {
    if (this.formUpdate.invalid) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Completa el formulario correctamente",
      });
    } else {
      //console.log(this.idventanillas);
      this.hotelRest.updateVentanilla(this.idventanillas, this.formUpdate.value).subscribe({
        next: (res: any) => {
          Swal.fire({
            title: '¡Éxito!',
            text: res.message,
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.getVentanillas();
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
