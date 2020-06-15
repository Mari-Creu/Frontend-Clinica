import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Medico } from 'src/app/models/medico.model';
import { Dia } from 'src/app/models/dia.model';
import { UsuarioService } from '../service.index';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Usuario } from 'src/app/models/usuario.model';
import { Cita } from 'src/app/models/cita.model';
import { EspecialidadService } from './especialidad.service';
import { Especialidad } from 'src/app/models/especialidad.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  public medico: Medico;
  constructor(public http: HttpClient, public usuarioService: UsuarioService) {
  }


  relacionarMedicoHorario(idMedico: string, idHorario: any, dias: number[]) {

    dias.forEach(dia => {
      let relMedicoHorario = new Dia(dia, idMedico, idHorario);
      let url = URL_SERVICIOS + '/createDia';
      let headers = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', this.usuarioService.token);
      this.http.post(url, relMedicoHorario, { headers: headers }).subscribe((resp: any) => {

        console.log(resp);

      });
    })


  }
  actualizarDatosMedico(medico?) {
    this.medico = medico;
    const url = URL_SERVICIOS + '/updateMedico';

    let headers = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Authorization', this.usuarioService.token);
    this.http.post(url, this.medico, { headers: headers }).subscribe((resp: any) => {

      console.log(resp);

    });
  }
  registrarMedico(usuario: Usuario) {
    this.medico = new Medico(usuario);
    console.log(this.medico);

  }
  consultarCitasDisponibles(dia, medico) {

    const url = URL_SERVICIOS + '/consultaCitasMedico';

    let params = { 'dia': dia, 'medico': medico };

    // let params = 'rol=' + rol.toString();
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', this.usuarioService.token);
    return this.http.post(url, params, { headers: headers });
  }

  buscarMedicosPorEspecialidad(especialidad: Especialidad) {
    const url = URL_SERVICIOS + '/buscarMedicosEspecialidad';
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', this.usuarioService.token);
    return this.http.post(url, especialidad, { headers: headers });
  }
}
