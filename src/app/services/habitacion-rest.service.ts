import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HabitacionRestService {

  constructor(private http: HttpClient) { }

  //test
  test() {
    return this.http.get(environment.baseUrl + 'habitacion/test');
  }

  //obtener las habitaciones
  getHabitaciones() {
    return this.http.get(environment.baseUrl + 'habitacion/getHabitaciones');
  }

  //obtener solo una habitacion
  getHabitacion(id: string) {
    return this.http.get(environment.baseUrl + 'habitacion/getHabitacion/' + id);
  }

  //agregar una habitacion
  addHabitacion(params: {}) {
    let body = JSON.stringify(params);
    return this.http.post(environment.baseUrl + 'habitacion/addHabitacion', params);
  }

  //actualizar una habitacion
  updateHabitacion(id: string, params: {}) {
    let body = JSON.stringify(params);
    return this.http.put(environment.baseUrl + 'habitacion/updateHabitacion/' + id, params);
  }

  //agregar imagen a la habitacion
  requestFiles(
    habitacionID: string,
    files: Array<File>,
    name: string) {
    return new Promise((resolve, reject) => {
      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      let uri = environment.baseUrl + 'habitacion/addImage/' + habitacionID;

      for (var x = 0; x < files.length; x++) {
        formData.append(name, files[x], files[x].name);
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) { //AJAX status 4 = ok/done
          if (xhr.status == 200) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      }
      xhr.open('POST', uri, true);
      //xhr.setRequestHeader('Authorization', this.userRest.getToken());
      xhr.send(formData)
    })
  }
}
