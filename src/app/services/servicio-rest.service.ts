import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicioRestService {

  constructor(
    private http: HttpClient
  ) { }

  //test
  test() {
    return this.http.get(environment.baseUrl + 'servicio/test');
  }

  //obtener las servicioes
  getServicios() {
    return this.http.get(environment.baseUrl + 'servicio/getServicios');
  }

  //obtener solo una servicio
  getServicio(id: string) {
    return this.http.get(environment.baseUrl + 'servicio/getServicio/' + id);
  }

  //agregar una servicio
  addServicio(params: {}) {
    let body = JSON.stringify(params);
    return this.http.post(environment.baseUrl + 'servicio/addServicio', params);
  }

  //agregar detalle habitacion
  addDetalleHabitacion(params: {}) {
    let body = JSON.stringify(params);
    return this.http.post(environment.baseUrl + 'detallehabitacion/addDetalleHabitacion', params);
  }

  //actualizar una servicio
  updateServicio(id: string, params: {}) {
    let body = JSON.stringify(params);
    return this.http.put(environment.baseUrl + 'servicio/updateServicio/' + id, params);
  }

  //agregar imagen a la servicio
  requestFiles(
    serviID: string,
    files: Array<File>,
    name: string) {
    return new Promise((resolve, reject) => {
      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      let uri = environment.baseUrl + 'servicio/addImage/' + serviID;

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

  getTipoConsultas() {
    return this.http.get(environment.baseUrl + 'tipoConsulta/getTipoConsultas');
  }
  addTipoConsulta(params: {}) {
    let body = JSON.stringify(params);
    return this.http.post(environment.baseUrl + 'tipoConsulta/addTipoConsulta', params);
  }
  updateTipoConsulta(id: string, params: {}) {
    let body = JSON.stringify(params);
    return this.http.put(environment.baseUrl + 'tipoConsulta/updateTipoConsulta/' + id, params);
  }
  getTipoConsulta(id: string) {
    return this.http.get(environment.baseUrl + 'tipoConsulta/getTipoConsulta/' + id);
  }
  getVentanilla(id: string) {
    return this.http.get(environment.baseUrl + 'tipoConsulta/getVentanilla/' + id);
  }

  //REPORTES
  //PDF
  generatePDFConsultasAtendidas(params: {}) {
    return this.http.post(environment.baseUrl + 'asignacion/generatePDFConsultasAtendidas/', params, {
      responseType: 'blob' as 'json'
    });
  }
  //NORMAL
  generateConsultasAtendidas(params: {}) {
    return this.http.post<any[]>(environment.baseUrl + 'asignacion/generateConsultasAtendidas', params);
  }

  //REPORTE //2
  //PDF
  generatePDFConsultasRevisadasNoAtendidas(params: {}) {
    return this.http.post(environment.baseUrl + 'asignacion/generatePDFConsultasRevisadasNoAtendidas/', params, {
      responseType: 'blob' as 'json'
    });
  }
  //NORMAL
  generateConsultasRevisadasNoAtendidas(params: {}) {
    return this.http.post<any[]>(environment.baseUrl + 'asignacion/generateConsultasRevisadasNoAtendidas', params);
  }

  //REPORTE 3
  //PDF
  generatePDFConsultasTotalPorVentanilla(params: {}) {
    return this.http.post(environment.baseUrl + 'asignacion/generatePDFConsultasTotalPorVentanilla/', params, {
      responseType: 'blob' as 'json'
    });
  }
  //NORMAL
  generateConsultasTotalPorVentanilla(params: {}) {
    return this.http.post<any[]>(environment.baseUrl + 'asignacion/generateConsultasTotalPorVentanilla', params);
  }

  //REPORTE 4
  //PDF
  generatePDFConsultasGeneral(params: {}) {
    return this.http.post(environment.baseUrl + 'asignacion/generatePDFConsultasGeneral/', params, {
      responseType: 'blob' as 'json'
    });
  }
  //NORMAL
  generateConsultasGeneral(params: {}) {
    return this.http.post<any[]>(environment.baseUrl + 'asignacion/generateConsultasGeneral', params);
  }


}
