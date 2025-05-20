import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservacionRestService {

  constructor(
    private http: HttpClient
  ) { }

  //obtener las reservaciones
  getReservaciones() {
    return this.http.get(environment.baseUrl + 'reservacion/getReservaciones');
  }

  //obtener solo una reservacion
  getReservacion(id: string) {
    return this.http.get(environment.baseUrl + 'reservacion/getReservacion/' + id);
  }
  //agregar reservacion
  addReservacion(params: {}) {
    let body = JSON.stringify(params);
    return this.http.post(environment.baseUrl + 'reservacion/addReservacion', params);
  }

  //cancelar reservacion
  cancelarReservacion(id: string) {
    return this.http.delete(environment.baseUrl + 'reservacion/cancelarReservacion/' + id);
  }

  //actualizar reservacion
  updateReservacion(params: {}, id: string) {
    let body = JSON.stringify(params);
    return this.http.post(environment.baseUrl + 'reservacion/updateReservacion/' + id, params);
  }

  //generarPDF
  generatePDFByReservacion(id: string) {
    return this.http.get(environment.baseUrl + 'reservacion/generatePDFByReservacion/' + id, {
      responseType: 'blob' as 'json'
    });
  }
}
