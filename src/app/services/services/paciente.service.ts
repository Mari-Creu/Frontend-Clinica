import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { Paciente } from 'src/app/models/paciente.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(public http: HttpClient, public usuarioService: UsuarioService) { }

  // crearPaciente(usuario: Usuario) {
  // let paciente = new Paciente(usuario);
  // let url = URL_SERVICIOS + '/registro';

  // return this.http.post(url, paciente);
  // }
  actualizarPaciente(paciente: Paciente) {
    const url = URL_SERVICIOS + '/putPaciente';
  

    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', this.usuarioService.token);
    return this.http.put(url, paciente, { headers: headers });
   
  }
 
}
