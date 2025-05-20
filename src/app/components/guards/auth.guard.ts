import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    
    // Obtener el rol del usuario desde sessionStorage
    const userRole = sessionStorage.getItem('userRole');
    // Verificar si el rol es "Vendedor"
    if (userRole === "vendedor" || userRole === "administrador") {
      return true; // Permitir acceso
    } else {
      this.router.navigate(['/login']); // Redirigir a login si no tiene acceso
      return false; // Denegar acceso
    }
  }
}