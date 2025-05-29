import { Component, OnInit } from '@angular/core';
import { UserRestService } from 'src/app/services/user-rest.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute   } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin!: FormGroup;
  constructor(
    private userRest: UserRestService,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      nombre: ['', Validators.required],
      clave: ['', Validators.required],
    });
  }

  login(){
    if(this.formLogin.valid){
      let body = this.formLogin.value;
      this.userRest.login(body).subscribe({
        next: (res:any)=>{
          Swal.fire({
            title: '¡Éxito!',
            text: 'Inicio de sesión correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then((result)=>{
            console.log("res ",res);
            sessionStorage.setItem('userRole', res.data.rol);
            if(res.data.rol == "vendedor"){
              this.router.navigate(['/caja']);
            }
            if(res.data.rol == "administrador"){
              this.router.navigate(['/admin']);
            }
          });
        },
        error: (err)=>{
          Swal.fire({
            title: 'Opps..',
            text: err.error.message || err.error,
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      })
    }else{
      Swal.fire({
        title: 'Opps..',
        text: 'Completa el formulario correctamente.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  }

}
