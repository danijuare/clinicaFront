import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { UserRestService } from 'src/app/services/user-rest.service';

@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.component.html',
  styleUrls: ['./admin-usuarios.component.css']
})
export class AdminUsuariosComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  displayedColumnsArticulos: string[] = [
    'idusuario', 'nombre', 'email', 'password', 'rol','opc'
  ];
  dataSource = new MatTableDataSource();
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private userRest:UserRestService
  ) { }
  form!: FormGroup;
  idusuario:any;
  formUpdate!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      rol: ['', Validators.required]
    });
    this.formUpdate = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      rol: ['', Validators.required]
    });
    this.getUsuarios();
  }

  getUsuarios(){
    this.userRest.getUsuarios().subscribe({
      next: (res:any)=>{
        const datosTable = res.data.map((user: any) => ({
          idusuario: user.idusuario,
          nombre: user.nombre,
          email: user.email,
          password: user.password,
          rol: user.rol
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

  addUser(){
    if(this.form.invalid){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Completa el formulario correctamente",
      });
    }else{
      this.userRest.addUser(this.form.value).subscribe({
        next: (res:any)=>{
          Swal.fire({
            title: '¡Éxito!',
            text: res.message,
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.getUsuarios();
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
    this.idusuario = id;
    this.userRest.getUser(this.idusuario).subscribe({
      next: (res:any)=>{
        this.formUpdate.setValue({
          nombre :res.data.nombre,
          email :res.data.email,
          password :res.data.password,
          rol :res.data.rol,
        });
      }
    })
    let dialogRef = this.dialog.open(templateRef, {
      width: '500px'
    });
  }

  updateUser(){
    if(this.formUpdate.invalid){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Completa el formulario correctamente",
      });
    }else{
      this.userRest.updateUser(this.idusuario,this.formUpdate.value).subscribe({
        next: (res:any)=>{
          Swal.fire({
            title: '¡Éxito!',
            text: res.message,
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.getUsuarios();
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

}
