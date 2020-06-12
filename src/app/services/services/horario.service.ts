import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Horario } from 'src/app/models/horario.model';
import { URL_SERVICIOS } from 'src/app/config/config';
import { UploadService } from '../upload/upload.service';
import { UsuarioService } from './usuario.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  public idHorario ;

  constructor(public http: HttpClient, public usuarioService: UsuarioService) { }

  crearHorario(horario: Horario) {
    console.log('entro en crearservicehorario');
    let url = URL_SERVICIOS + '/createHorario';
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', this.usuarioService.token);
    this.http.post(url, horario, { headers: headers }).subscribe((resp: any) => {
      
      this.idHorario = resp.horario.id;
    });



    return this.idHorario;
  }
}




