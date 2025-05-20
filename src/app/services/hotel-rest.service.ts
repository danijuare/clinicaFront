import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HotelRestService {

  constructor(
    private http: HttpClient
  ) { }

  //obtener las getHoteles
  getHoteles() {
    return this.http.get(environment.baseUrl + 'hotel/getHoteles');
  }

  //obtener solo una getHotel
  getHotel(id: string) {
    return this.http.get(environment.baseUrl + 'hotel/getHotel/' + id);
  }

  //agregar una hotel
  addHotel(params: {}) {
    let body = JSON.stringify(params);
    return this.http.post(environment.baseUrl + 'hotel/addHotel', params);
  }

  //actualizar un hotel
  updateHotel(id: string, params: {}) {
    let body = JSON.stringify(params);
    return this.http.put(environment.baseUrl + 'hotel/updateHotel/' + id, params);
  }

  //agregar imagen a la habitacion
  requestFiles(
    hotelid: string,
    files: Array<File>,
    name: string) {
    return new Promise((resolve, reject) => {
      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      let uri = environment.baseUrl + 'hotel/addImage/' + hotelid;

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
