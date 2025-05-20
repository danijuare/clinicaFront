import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserRestService {

  constructor(
    private http: HttpClient
  ) { }

  //login
  login(params: {}) {
    let body = JSON.stringify(params);
    return this.http.post(environment.baseUrl + 'user/login', params);
  }

  //obtener las usuarios
  getUsuarios() {
    return this.http.get(environment.baseUrl + 'user/getUsuarios');
  }

  //obtener solo un user
  getUser(id: string) {
    return this.http.get(environment.baseUrl + 'user/getUser/' + id);
  }

  //agregar un user
  addUser(params: {}) {
    let body = JSON.stringify(params);
    return this.http.post(environment.baseUrl + 'user/addUser', params);
  }

  //actualizar un user
  updateUser(id: string, params: {}) {
    let body = JSON.stringify(params);
    return this.http.put(environment.baseUrl + 'user/updateUser/' + id, params);
  }
}
