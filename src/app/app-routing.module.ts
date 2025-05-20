import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//RUTAS PUBLICAS
import { AboutUsComponent } from './components/pages/about-us/about-us.component';
import { ContactUsComponent } from './components/pages/contact-us/contact-us.component';
import { LandingPageComponent } from './components/pages/landing-page/landing-page.component';
import { ViewHabitationComponent } from './components/pages/view-habitation/view-habitation.component';
import { NavbarComponent } from './components/main-components/navbar/navbar.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { ServicesComponent } from './components/pages/services/services.component';
import { ReservacionesComponent } from './components/pages/reservaciones/reservaciones.component';
import { AuthGuard } from './components/guards/auth.guard';
import { NavigationComponent } from './components/admin/navigation/navigation.component';
import { AdminClientesComponent } from './components/admin/admin-clientes/admin-clientes/admin-clientes.component';
import { AdminFacturasComponent } from './components/admin/admin-facturas/admin-facturas/admin-facturas.component';
import { AdminHabitacionesComponent } from './components/admin/admin-habitaciones/admin-habitaciones/admin-habitaciones.component';
import { AdminHotelesComponent } from './components/admin/admin-hoteles/admin-hoteles/admin-hoteles.component';
import { AdminReservacionesComponent } from './components/admin/admin-reservaciones/admin-reservaciones/admin-reservaciones.component';
import { AdminServiciosComponent } from './components/admin/admin-servicios/admin-servicios/admin-servicios.component';
import { AdminUsuariosComponent } from './components/admin/admin-usuarios/admin-usuarios/admin-usuarios.component';

const routes: Routes = [
  {
    path: '', component: NavbarComponent, children:[
      {path: '', component: LandingPageComponent},
      {path: 'verHabitacion/:idP', component: ViewHabitationComponent},
      {path: 'contacto', component: ContactUsComponent},
      {path: 'nosotros', component: AboutUsComponent},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'services', component: ServicesComponent }
    ]
  },
  {
    path: 'caja', component: NavbarComponent, canActivate:[AuthGuard], children:[
      {path: '', component: ReservacionesComponent},
    ]
  },
  {
    path: 'admin', component: NavigationComponent, canActivate:[AuthGuard], children:[
      {path: 'clientes', component: AdminClientesComponent},
      {path: 'facturas', component: AdminFacturasComponent},
      {path: 'habitaciones', component: AdminHabitacionesComponent},
      {path: 'hoteles', component: AdminHotelesComponent},
      {path: 'reservaciones', component: AdminReservacionesComponent},
      {path: 'servicios', component: AdminServiciosComponent},
      {path: 'usuarios', component: AdminUsuariosComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
