import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AsignacionService {

  constructor(
    private http: HttpClient
  ) { }

  getAsignaciones() {
    return this.http.get(environment.baseUrl + 'asignacion/getAsignaciones');
  }

  getVentanillas() {
    return this.http.get(environment.baseUrl + 'asignacion/getVentanillas');
  }
}
