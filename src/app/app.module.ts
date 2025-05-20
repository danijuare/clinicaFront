import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutUsComponent } from './components/pages/about-us/about-us.component';
import { ContactUsComponent } from './components/pages/contact-us/contact-us.component';
import { LandingPageComponent } from './components/pages/landing-page/landing-page.component';
import { ViewHabitationComponent } from './components/pages/view-habitation/view-habitation.component';
import { FooterComponent } from './components/main-components/footer/footer.component';
import { NavbarComponent } from './components/main-components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


//IMPORTACIONES DE ANGULAR V13
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRippleModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LoginComponent } from './components/pages/login/login.component';
import { HabitationCardComponent } from './components/another-components/habitation-card/habitation-card.component';
import { ServicesCardComponent } from './components/another-components/services-card/services-card.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { ServicesComponent } from './components/pages/services/services.component';
import { ReservacionesComponent } from './components/pages/reservaciones/reservaciones.component';
import { AdminHotelesComponent } from './components/admin/admin-hoteles/admin-hoteles/admin-hoteles.component';
import { AdminServiciosComponent } from './components/admin/admin-servicios/admin-servicios/admin-servicios.component';
import { AdminHabitacionesComponent } from './components/admin/admin-habitaciones/admin-habitaciones/admin-habitaciones.component';
import { AdminReservacionesComponent } from './components/admin/admin-reservaciones/admin-reservaciones/admin-reservaciones.component';
import { AdminClientesComponent } from './components/admin/admin-clientes/admin-clientes/admin-clientes.component';
import { AdminUsuariosComponent } from './components/admin/admin-usuarios/admin-usuarios/admin-usuarios.component';
import { AdminFacturasComponent } from './components/admin/admin-facturas/admin-facturas/admin-facturas.component';
import { NavigationComponent } from './components/admin/navigation/navigation.component';


@NgModule({
  declarations: [
    AppComponent,
    AboutUsComponent,
    ContactUsComponent,
    LandingPageComponent,
    ViewHabitationComponent,
    FooterComponent,
    NavbarComponent,
    LoginComponent,
    HabitationCardComponent,
    ServicesCardComponent,
    RegisterComponent,
    ServicesComponent,
    ReservacionesComponent,
    AdminHotelesComponent,
    AdminServiciosComponent,
    AdminHabitacionesComponent,
    AdminReservacionesComponent,
    AdminClientesComponent,
    AdminUsuariosComponent,
    AdminFacturasComponent,
    NavigationComponent


  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    MatRippleModule,
    MatSliderModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatGridListModule,
    MatCheckboxModule,
    MatTooltipModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
