import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { Paciente } from 'src/app/models/paciente.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(public http: HttpClient) { }

  // crearPaciente(usuario: Usuario) {
    // let paciente = new Paciente(usuario);
    // let url = URL_SERVICIOS + '/registro';

    // return this.http.post(url, paciente);
  // }

}
