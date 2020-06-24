import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Cita } from 'src/app/models/cita.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  constructor(public usuarioService: UsuarioService, public http: HttpClient) { }

  crearCita(cita: Cita) {

    const url = URL_SERVICIOS + '/createCita';

    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', this.usuarioService.token);
    return this.http.post(url, cita, { headers: headers });
  }
  buscarCitas(){
    const url = URL_SERVICIOS + '/buscarCitas/' + this.usuarioService.usuario.id;
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', this.usuarioService.token);
    return this.http.get(url,  { headers: headers });
  }
  borrarCita(cita:any){
    const url = URL_SERVICIOS + '/deleteCita';

    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', this.usuarioService.token);
    return this.http.post(url, cita, { headers: headers });
  }
  buscarCitasMedico(){
    const url = URL_SERVICIOS + '/buscarCitasMedico/' + this.usuarioService.usuario.id;
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', this.usuarioService.token);
    return this.http.get(url,  { headers: headers });
  }
}
