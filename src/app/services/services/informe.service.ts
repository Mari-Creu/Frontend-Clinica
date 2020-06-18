import { Injectable } from '@angular/core';
import { Informe } from 'src/app/models/informe.model';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class InformeService {
  public newInforme;
  constructor(public http: HttpClient, public usuarioService: UsuarioService) {
    this.newInforme = false;
  }

  registrarInforme(informe: Informe, token: string) {
    const url = URL_SERVICIOS + '/createInforme';

    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', token);
    this.newInforme = false;
    return this.http.post(url, informe, { headers: headers });

  }
  nuevoInforme() {
    this.newInforme = true;
  }
  getInformes(paciente: any) {

    const url = URL_SERVICIOS + '/getInformes/' + paciente.id.id;

    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', this.usuarioService.token);

    return this.http.get(url, { headers: headers });
  }


  getInformesPorMedico(id: any) {
    const url = URL_SERVICIOS + '/getInformesPorMedico/' + id;

    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', this.usuarioService.token);

    return this.http.get(url, { headers: headers });

  }
  buscarInformes(term) {
    
    // console.log(term);
    // const url = URL_SERVICIOS + '/buscarInformes';
    // let params = { 'idMedico': this.usuarioService.usuario.id, 'term': term };
    // let headers = new HttpHeaders().set('Content-Type', 'application/json')
      // .set('Authorization', this.usuarioService.token);

    // return this.http.post(url, params, { headers: headers });
  }
}
