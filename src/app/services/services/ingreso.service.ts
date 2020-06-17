import { Injectable } from '@angular/core';
import { Paciente } from 'src/app/models/paciente.model';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UsuarioService } from './usuario.service';
import { Ingreso } from 'src/app/models/ingreso.model';

@Injectable({
  providedIn: 'root'
})
export class IngresoService {
  ingreso: any;
  constructor(public usuarioService: UsuarioService, public http: HttpClient) { }

  buscarHabitacion() {
    const url = URL_SERVICIOS + '/getHabitacion';

    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', this.usuarioService.token);
    return this.http.get(url, { headers: headers });
  }

  ingresar(ingreso: Ingreso) {
    const url = URL_SERVICIOS + '/createIngreso';

    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', this.usuarioService.token);
    return this.http.post(url, ingreso, { headers: headers });
  }
  comprobarIngreso(paciente: any) {

    const url = URL_SERVICIOS + '/findIngreso/' + paciente.id.id;

    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', this.usuarioService.token);
    return this.http.get(url, { headers: headers });
  }
  darAltaIngreso(ingreso:any) {
    const url = URL_SERVICIOS + '/putIngreso';

    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', this.usuarioService.token);
    return this.http.put(url, ingreso, { headers: headers });
  }

  liberarHabitacion(ingreso:any){
    const url = URL_SERVICIOS + '/putHabitacion';

    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', this.usuarioService.token);
    return this.http.put(url, ingreso.habitacion, { headers: headers });
  }
}
