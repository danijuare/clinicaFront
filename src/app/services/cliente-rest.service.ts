import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteRestService {

  constructor(
    private http: HttpClient
  ) { }

  //obtener los clientes
  getClientes() {
    return this.http.get(environment.baseUrl + 'cliente/getClientes');
  }

  //obtener solo un cliente
  getCliente(id: string) {
    return this.http.get(environment.baseUrl + 'cliente/getCliente/' + id);
  }

  //agregar cliente
  addCliente(params: {}) {
    let body = JSON.stringify(params);
    return this.http.post(environment.baseUrl + 'cliente/addCliente', params);
  }
}
