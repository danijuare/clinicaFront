import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacturaRestService {

  constructor(
    private http: HttpClient
  ) { }

  //obtener las facturas
  getFacturas() {
    return this.http.get(environment.baseUrl + 'factura/getFacturas');
  }

  //obtener solo una factura
  getFactura(id: string) {
    return this.http.get(environment.baseUrl + 'factura/getFactura/' + id);
  }
  //agregar factura
  addFactura(params: {}) {
    let body = JSON.stringify(params);
    return this.http.post(environment.baseUrl + 'factura/addFactura', params);
  }

  //generarPDF
  generatePDFByVenta(id: string) {
    return this.http.get(environment.baseUrl + 'factura/pdfFactura/' + id, {
      responseType: 'blob' as 'json'
    });
  }
}
