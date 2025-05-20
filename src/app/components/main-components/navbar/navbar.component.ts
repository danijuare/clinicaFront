import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterEvent} from '@angular/router';
import { filter } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isHomePage: Boolean = false;
  session:any;
  mostrarLog = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.session = sessionStorage.getItem('userRole');
    if(this.session){
      this.mostrarLog = true;
    }else{
      this.mostrarLog = false;
    }
    this.setNavbarStyle(this.router.url);
    this.router.events
    .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      this.isHomePage = event.url === '/';
      //console.log('Navegación terminada a:', event.urlAfterRedirects);
    });
  }
  setNavbarStyle(url: string){
    if(url === "/"){
      this.isHomePage = true
    }else{
      this.isHomePage = false
    }
  }

  salir(){
    Swal.fire({
      title: "¿Esta seguro de Cerrar Session?",
      //text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si"
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.removeItem('userRole');
        this.router.navigate(['/']);
      }
    })
    
  }
}
